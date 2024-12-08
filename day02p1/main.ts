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
  const bytes = await Deno.readFile("input.txt");
  const fileStr = new TextDecoder().decode(bytes);
  const lines = fileStr.split("\n");
  console.log(`Read in ${lines.length} lines`);
  const reports: number[][] = [];
  for (let line of lines) {
    line = line.trim();
    if (line.length == 0) {
      continue;
    }
    reports.push(line.split(/\s+/).map(Number));
  }
  console.log(numSafe(reports));
}
