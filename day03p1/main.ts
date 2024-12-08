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
  const bytes = await Deno.readFile("input.txt");
  const fileStr = new TextDecoder().decode(bytes);
  console.log(mullItOver(fileStr));
}
