#!/usr/bin/env -S deno -A

export function mullItOver(memory: string): number {
  let total = 0;
  const matches = memory.matchAll(/mul\((\d+),(\d+)\)/g);
  for (const match of matches) {
    const [_, a, b] = match;
    total += Number(a) * Number(b);
  }
  return total;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  console.log(mullItOver(text));
}
