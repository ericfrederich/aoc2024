#!/usr/bin/env python3

import sys
from collections import Counter

fname = sys.argv[1] if len(sys.argv[1:]) == 1 else "input.txt"

data = open(fname).read().splitlines()
height = len(data)
width = len(data[0])

total = 0


def chunker(data):
    for i in range(height - 2):
        for j in range(width - 2):
            yield [data[i + k][j : j + 3] for k in range(3)]


tops = lambda chunk: chunk[0][0] + chunk[0][2]
bottoms = lambda chunk: chunk[2][0] + chunk[2][2]
lefts = lambda chunk: chunk[0][0] + chunk[2][0]
rights = lambda chunk: chunk[0][2] + chunk[2][2]

for chunk in chunker(data):
    if chunk[1][1] != "A":
        continue
    for getter1, getter2 in [(tops, bottoms), (lefts, rights)]:
        for l1, l2 in ["MS", "SM"]:
            if all(c == l1 for c in getter1(chunk)) and all(c == l2 for c in getter2(chunk)):
                total += 1

print(total)
