#!/usr/bin/env -S deno -A

export function historianHysteria(lines: string[]): number {
  let runningDelta = 0;
  const left: number[] = [];
  const right: number[] = [];

  for (let line of lines) {
    line = line.trim();
    if (line.length == 0) {
      console.log("SKIPPING");
      continue;
    }
    const [a, b] = line.split(/\s+/).map(Number);
    left.push(a);
    right.push(b);
  }

  left.sort();
  right.sort();

  for (let i = 0; i < left.length; i++) {
    const a = left[i];
    const b = right[i];
    const delta = Math.abs(a - b);
    console.log(a, b, delta);
    runningDelta += delta;
  }
  return runningDelta;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  console.log(historianHysteria(text.split("\n")));
}
