export function similarityScore(left: number[], right: number[]): number {
  const lookup: { [k: number]: number } = {};
  right.map((n) => {lookup[n] = (lookup[n] || 0) + 1;})
  const score = left.reduce((acc, cur) => (acc + cur * (lookup[cur] || 0)), 0);
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
