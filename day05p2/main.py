#!/usr/bin/env python3

import sys

fname = sys.argv[1] if len(sys.argv[1:]) == 1 else "input.txt"

rules_str, page_sets_str = open("input.txt").read().split("\n\n")
rules = [tuple(map(int, pair.split("|"))) for pair in rules_str.splitlines()]
page_sets = [tuple(map(int, line.split(","))) for line in page_sets_str.splitlines()]

total = 0
for page_set in page_sets:
    valid_rules = [rule for rule in rules if all(part in set(page_set) for part in rule)]
    print(len(valid_rules))

    befores = {page: set() for page in page_set}
    afters = {page: set() for page in page_set}
    for before, after in valid_rules:
        if before not in afters:
            afters[before] = set()
        if after not in befores:
            befores[after] = set()
        afters[before].add(after)
        befores[after].add(before)

    sorted_pages = sorted(page_set, key=lambda page: len(befores[page]))

    if all(left == right for left, right in zip(sorted_pages, page_set)):
        print("GOOD")
    else:
        print("BAD")
        total += sorted_pages[len(sorted_pages) // 2]

print(total)
