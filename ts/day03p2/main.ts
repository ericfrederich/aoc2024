#!/usr/bin/env -S deno -A

export function mullItOver(memory: string): number {
  let total = 0;
  const matches = memory.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
  let enabled = true;
  for (const match of matches) {
    // console.log(match);
    if (match[0] === "do()") {
      enabled = true;
    } else if (match[0] === "don't()") {
      enabled = false;
    } else if (match[0].startsWith("mul(") && enabled) {
      const [_, a, b] = match;
      total += Number(a) * Number(b);
    }
  }
  return total;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  console.log(mullItOver(text));
}
