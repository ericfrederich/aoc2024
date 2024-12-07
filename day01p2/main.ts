export function similarityScore(left: number[], right: number[]): number {
  let score = 0;
  const counter = new Map();
  for (const n of right) {
    if (!counter.has(n)) {
      counter.set(n, 0);
    }
    counter.set(n, counter.get(n) + 1);
  }
  for (const n of left) {
    if (!counter.has(n)) {
      continue;
    }
    score += n * counter.get(n);
  }
  return score;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const bytes = await Deno.readFile("input.txt");
  const fileStr = new TextDecoder().decode(bytes);
  console.log(`Read in ${fileStr.length} bytes`);
  const lines = fileStr.split("\n");
  console.log(`Read in ${lines.length} lines`);
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
  console.log(
    `similarityScore is ${similarityScore(left, right)}`,
  );
}
