import { single } from "npm:itertools-ts";

const enumerate = single.enumerate;

type Coord = { row: number; col: number };

function findPeaks(data: number[][], trailHead: Coord) {
  const ret: Coord[] = [];
  const val = data[trailHead.row][trailHead.col];
  for (const [deltaRow, deltaCol] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    const [nextRow, nextCol] = [trailHead.row + deltaRow, trailHead.col + deltaCol];
    if (nextRow < 0 || nextRow >= data.length || nextCol < 0 || nextCol >= data[0].length) {
      continue;
    }
    const nextVal = data[nextRow][nextCol];
    if (nextVal !== val + 1) {
      continue;
    }
    if (nextVal === 9) {
      ret.push({ row: nextRow, col: nextCol });
      continue;
    }
    for (const peak of findPeaks(data, { row: nextRow, col: nextCol })) {
      ret.push(peak);
    }
  }
  return ret;
}

export function hoofIt(data: number[][]): number {
  let score = 0;
  for (const [y, row] of enumerate(data)) {
    for (const [x, value] of enumerate(row)) {
      if (value === 0) {
        const peaks = new Set<string>();
        for (const coord of findPeaks(data, { row: y, col: x })) {
          peaks.add(`${coord.row}|${coord.col}`);
        }
        console.log(`At head ${y},${x} got to ${Array.from(peaks)}`);
        score += peaks.size;
      }
    }
  }
  return score;
}

export function readMap(text: string): number[][] {
  return text.split("\n").map((line) => line.split("").map(Number));
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  console.log(hoofIt(readMap(text)));
}
