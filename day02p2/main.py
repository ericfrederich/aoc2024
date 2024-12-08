#!/usr/bin/env python3

import sys
from itertools import pairwise

fname = sys.argv[1] if len(sys.argv[1:]) == 1 else "input.txt"

reports = [[int(x) for x in line.strip().split()] for line in open(fname)]
print(f"Got {len(reports)=}")


def isSafe(report: list[int]):
    direction = None
    for i, (a, b) in enumerate(pairwise(report)):
        delta = a - b
        if delta == 0:
            return False, i
        if abs(delta) > 3:
            return False, i
        new_direction = delta // abs(delta)
        if direction is None:
            direction = new_direction
        if new_direction != direction:
            return False, i
    return True, i


safe = 0
for report in reports:
    s, bad_idx = isSafe(report)
    if s:
        safe += 1
    else:
        to_try_and_skip = [bad_idx, bad_idx + 1]
        if bad_idx == 1:
            to_try_and_skip.append(0)
        if any(isSafe([item for i, item in enumerate(report) if i != idx])[0] for idx in to_try_and_skip):
            safe += 1

print(safe)