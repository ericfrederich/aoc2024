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

export function bridgeRepair(equations: Equation[]): number {
  let ret = 0;
  for (const { result, operands } of equations) {
    const operatorOptions = set.cartesianProduct(...single.repeat("+*|", operands.length - 1));
    const operandsReversed = operands.toReversed();
    for (const operators of operatorOptions) {
      const operandStack = Array.from(operandsReversed);
      const operatorStack = Array.from(operators);
      while (operatorStack.length > 0) {
        const [left, right] = [operandStack.pop()!, operandStack.pop()!];
        const operator = operatorStack.pop();
        let computed: number = 0;
        if (operator === "*") {
          computed = left * right;
        } else if (operator === "+") {
          computed = left + right;
        } else if (operator === "|") {
          computed = Number(String(left) + String(right));
        }
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
  const bytes = await Deno.readFile("input.txt");
  const fileStr = new TextDecoder().decode(bytes).trimEnd();
  console.log(bridgeRepair(parseEquations(fileStr)));
}
