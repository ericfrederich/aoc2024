import { set, single } from "npm:itertools-ts";
type Equation = { result: number; operands: readonly number[] };

export function parseEquations(input: string): Equation[] {
  const lines = input.split("\n").filter((line) => line.trim());
  return lines.map((line) => line.split(": ")).map((
    [resultStr, operandsStr],
  ) => ({
    result: Number(resultStr),
    operands: operandsStr.split(" ").map(Number),
  }));
}

const opFuncs: { [key: string]: (l: number, r: number) => number } = {
  "*": (left: number, right: number) => left * right,
  "+": (left: number, right: number) => left + right,
  "|": (left: number, right: number) => Number(String(left) + String(right)),
};

export function bridgeRepair(equations: Equation[]): number {
  let ret = 0;
  for (const [i, { result, operands }] of single.enumerate(equations)) {
    console.log(i, "/", equations.length);
    const operatorOptions = set.cartesianProduct(
      ...single.repeat("+*|", operands.length - 1),
    );
    const operandsReversed = operands.toReversed();
    for (const operators of operatorOptions) {
      const operandStack = Array.from(operandsReversed);
      const operatorStack = Array.from(operators);
      while (operatorStack.length > 0) {
        const [left, right] = [operandStack.pop()!, operandStack.pop()!];
        const operator = operatorStack.pop()!;
        const computed = opFuncs[operator](left, right);
        operandStack.push(computed);
      }
      const final = operandStack.pop();
      if (final === result) {
        ret += final;
        break;
      }
    }
  }
  return ret;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  console.log(bridgeRepair(parseEquations(text)));
}
