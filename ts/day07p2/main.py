#!/usr/bin/env python3

import itertools
import sys
from dataclasses import dataclass

fname = sys.argv[1] if len(sys.argv[1:]) == 1 else "input.txt"


@dataclass
class Equation:
    result: int
    operands: list[int]

    @classmethod
    def fromLine(cls, line):
        resultStr, operandsStr = line.split(": ")
        return cls(int(resultStr), [int(o) for o in operandsStr.split(" ")])


lines = open(fname).read().splitlines()
equations = [Equation.fromLine(line) for line in lines]

ret = 0
for i, eq in enumerate(equations, start=1):
    print(f"{i} / {len(equations)}")
    for operatorOptions in itertools.product(*itertools.repeat("+*|", len(eq.operands) - 1)):
        operandStack = eq.operands[::-1]
        operatorStack = list(operatorOptions)
        while operatorStack:
            left, right = operandStack.pop(), operandStack.pop()
            operator = operatorStack.pop()
            if operator == "+":
                computed = left + right
            elif operator == "*":
                computed = left * right
            elif operator == "|":
                computed = int(str(left) + str(right))
            operandStack.append(computed)
            if computed > eq.result:
                break
        final = operandStack.pop()
        if final == eq.result:
            ret += final
            break
print(ret)
