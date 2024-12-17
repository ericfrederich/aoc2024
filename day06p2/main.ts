import { single } from "npm:itertools-ts";

type Coords = { row: number; col: number };
type Direction = "up" | "down" | "left" | "right";
function getCoords(grid: string[][], char: "^"): Coords {
  for (const [rowNum, row] of single.enumerate(grid)) {
    if (row.includes(char)) {
      return { row: rowNum, col: row.indexOf(char) };
    }
  }
  throw Error("grid does not contain caret (^)");
}

function guardGallivantLoops(grid: string[][]): boolean {
  const guardCoords = getCoords(grid, "^");
  let guardDir = "up" as Direction;
  const history = new Set<string>();

  while (true) {
    if (history.has(`${guardCoords.row},${guardCoords.col},${guardDir}`)) {
      return true;
    }
    // log the history
    history.add(`${guardCoords.row},${guardCoords.col},${guardDir}`);

    let [newRow, newCol] = [guardCoords.row, guardCoords.col];
    if (guardDir === "up") {
      newRow -= 1;
    } else if (guardDir === "down") {
      newRow += 1;
    } else if (guardDir === "left") {
      newCol -= 1;
    } else if (guardDir === "right") {
      newCol += 1;
    }
    // if we're out of bounds we dont' loop
    if (
      newRow < 0 || newRow >= grid.length || newCol < 0 ||
      newCol >= grid[0].length
    ) {
      return false;
    }
    if (grid[newRow][newCol] === "#") {
      // stay in place, turn right
      if (guardDir === "up") {
        guardDir = "right";
      } else if (guardDir === "down") {
        guardDir = "left";
      } else if (guardDir === "left") {
        guardDir = "up";
      } else if (guardDir === "right") {
        guardDir = "down";
      }
      continue;
    }
    // move
    guardCoords.row = newRow;
    guardCoords.col = newCol;
  }
}

export function guardGallivantPart2(grid: string[][]): number {
  let ret = 0;
  for (const [i, row] of single.enumerate(grid)) {
    console.log(`Working on row ${i + 1}/${grid.length}`);
    for (const [j, val] of single.enumerate(row)) {
      if (val !== ".") {
        continue;
      }
      // set it
      row[j] = "#";
      // try it
      if (guardGallivantLoops(grid)) {
        ret += 1;
      }
      // unset it
      row[j] = ".";
    }
  }
  return ret;
}

export const exampleData: string[][] = [
  "....#.....",
  ".........#",
  "..........",
  "..#.......",
  ".......#..",
  "..........",
  ".#..^.....",
  "........#.",
  "#.........",
  "......#...",
].map((line) => Array.of(...line));

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  const grid = text.split("\n").map((line) => Array.of(...line));
  console.log(guardGallivantPart2(grid));
}
