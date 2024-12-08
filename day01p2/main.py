#!/usr/bin/env python3

import sys
from collections import Counter

fname = sys.argv[1] if len(sys.argv[1:]) == 1 else "input.txt"

left, right = zip(*[map(int, line.strip().split()) for line in open(fname)])
lookup = Counter(right)
score = sum(n * lookup.get(n, 0) for n in left)
print(score)
