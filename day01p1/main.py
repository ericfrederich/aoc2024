#!/usr/bin/env python3

import sys

fname = sys.argv[1] if len(sys.argv[1:]) == 1 else "input.txt"

# # stupid single expression
# print(
#     sum(
#         abs(a - b)
#         for a, b in zip(
#             *map(
#                 sorted,
#                 zip(*[map(int, line.strip().split()) for line in open(fname)]),
#             )
#         )
#     )
# )

left = []
right = []
for line in open(fname):
    a, b = map(int, line.strip().split())
    left.append(a)
    right.append(b)

left.sort()
right.sort()

delta = sum(abs(a - b) for a, b in zip(left, right))

print(delta)
