import { single } from "npm:itertools-ts";

console.log(typeof single)

function isSafe(report: number[]): [boolean, number] {
  let direction: number | null = null;

  for (const [i, [a, b]] of single.enumerate(single.pairwise(report))) {
    const delta = a - b;
    if (delta === 0) {
      return [false, i];
    }
    if (Math.abs(delta) > 3) {
      return [false, i];
    }

    const newDirection = delta / Math.abs(delta);
    if (direction === null) {
      direction = newDirection;
    }
    if (newDirection !== direction) {
      return [false, i];
    }
  }
  return [true, 0];
}

export function numSafe(reports: number[][]): number {
  let numSafe = 0;
  for (const report of reports) {
    const [safe, badPairIdx] = isSafe(report);
    if (safe) {
      numSafe += 1;
    } else {
      // try without each number of the bad pair
      const tryWithouts = [badPairIdx, badPairIdx + 1];

      // if it switches directions immediately (i.e. [5, 7, 5, 4, 3])
      // the bad idx will be 1 (corresponding to 7 and 5)
      // but we actually need to try without the first item as well
      if (badPairIdx === 1) {
        tryWithouts.push(0);
      }
      for (const idx of tryWithouts) {
        const copy: number[] = [];
        for (const [i, item] of single.enumerate(report)) {
          if (i == idx) {
            continue;
          }
          copy.push(item);
        }
        if (isSafe(copy)[0]) {
          numSafe += 1;
          break;
        }
      }
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
