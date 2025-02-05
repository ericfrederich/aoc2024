#!/usr/bin/env -S deno -A

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

export function guardGallivant(grid: string[][]): number {
  const guardCoords = getCoords(grid, "^");
  let guardDir = "up" as Direction;
  let visited = 1;
  grid[guardCoords.row][guardCoords.col] = "X";

  while (true) {
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
    // if we're out of bounds we're done
    if (
      newRow < 0 || newRow >= grid.length || newCol < 0 ||
      newCol >= grid[0].length
    ) {
      break;
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
    // if it hasn't been visited before; mark it and count it
    if (grid[guardCoords.row][guardCoords.col] !== "X") {
      grid[guardCoords.row][guardCoords.col] = "X";
      visited += 1;
    }
  }
  return visited;
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
  console.log(guardGallivant(grid));
}
