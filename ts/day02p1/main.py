#!/usr/bin/env python3

import sys
from itertools import pairwise

fname = sys.argv[1] if len(sys.argv[1:]) == 1 else "input.txt"

reports = [map(int, line.strip().split()) for line in open(fname)]
print(f"Got {len(reports)=}")


def isSafe(report: list[int]):
    direction = None
    for a, b in pairwise(report):
        delta = a - b
        if delta == 0:
            return False
        if abs(delta) > 3:
            return False
        new_direction = delta // abs(delta)
        if direction is None:
            direction = new_direction
        if new_direction != direction:
            return False
    return True


print(sum(1 for report in reports if isSafe(report)))
