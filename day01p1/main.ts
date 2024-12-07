const bytes = await Deno.readFile("input.txt");
const fileStr = new TextDecoder().decode(bytes);
console.log(`Read in ${fileStr.length} bytes`);
const lines = fileStr.split("\n");
console.log(`Read in ${lines.length} lines`);
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
console.log(`Solution: ${runningDelta}`);
