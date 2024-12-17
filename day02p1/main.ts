function* pairwise(data: number[]) {
  for (let i = 1; i < data.length; i++) {
    yield [data[i - 1], data[i]];
  }
}

function isSafe(report: number[]): boolean {
  // figure out if we're increasing or decreasing
  if (report[0] == report[1]) {
    // bad; duplicate value
    return false;
  }
  let direction: number | null = null;
  for (const [a, b] of pairwise(report)) {
    const delta = a - b;
    if (delta === 0) {
      return false;
    }
    if (Math.abs(delta) > 3) {
      return false;
    }

    const newDirection = delta / Math.abs(delta);
    if (direction === null) {
      direction = newDirection;
    }
    if (newDirection !== direction) {
      return false;
    }
  }
  return true;
}

export function numSafe(reports: number[][]): number {
  let numSafe = 0;
  for (const report of reports) {
    if (isSafe(report)) {
      numSafe += 1;
    }
  }
  return numSafe;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  const reports: number[][] = [];
  for (let line of text.split("\n")) {
    line = line.trim();
    if (line.length == 0) {
      continue;
    }
    reports.push(line.split(/\s+/).map(Number));
  }
  console.log(numSafe(reports));
}
