#!/usr/bin/env -S deno -A

export function similarityScore(left: number[], right: number[]): number {
  const lookup: { [k: number]: number } = {};
  right.map((n) => {
    lookup[n] = (lookup[n] || 0) + 1;
  });
  const score = left.reduce((acc, cur) => (acc + cur * (lookup[cur] || 0)), 0);
  return score;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  const left: number[] = [];
  const right: number[] = [];

  for (let line of text.split("\n")) {
    line = line.trim();
    if (line.length == 0) {
      console.log("SKIPPING");
      continue;
    }
    const [a, b] = line.split(/\s+/).map(Number);
    left.push(a);
    right.push(b);
  }
  console.log(
    `similarityScore is ${similarityScore(left, right)}`,
  );
}
