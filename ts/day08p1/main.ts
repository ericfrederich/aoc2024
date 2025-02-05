#!/usr/bin/env -S deno -A

import { single } from "npm:itertools-ts";

function getAnteneaLocations(grid: string[]): Map<string, [number, number][]> {
  const anteneaLocations = new Map<string, [number, number][]>();
  // find all antenea frequencies
  for (const [y, row] of single.enumerate(grid)) {
    for (const [x, cell] of single.enumerate(row)) {
      if (cell === ".") {
        continue;
      }
      if (!anteneaLocations.has(cell)) {
        anteneaLocations.set(cell, []);
      }
      anteneaLocations.get(cell)!.push([y, x]);
    }
  }
  return anteneaLocations;
}

export function resonantCollinearity(grid: string[]): number {
  const locationsWithAntiNodes = new Set<string>();
  const anteneaLocations = getAnteneaLocations(grid);
  for (const [_freq, locations] of anteneaLocations) {
    for (const [i, [r1, c1]] of single.enumerate(locations)) {
      for (const [j, [r2, c2]] of single.enumerate(locations)) {
        if (i === j) {
          continue;
        }

        // calculate dr and dc (delta row and col) from l1 to l2
        const dr = r2 - r1;
        const dc = c2 - c1;
        // apply same dx and dy to 2nd location
        const [aR, aC] = [r2 + dr, c2 + dc];
        // if it's in bounds add it to locationsWithAntiNodes
        if (aR < grid.length && aR >= 0 && aC < grid[0].length && aC >= 0) {
          locationsWithAntiNodes.add(`${aR}|${aC}`);
        }
      }
    }
  }
  return locationsWithAntiNodes.size;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  console.log(resonantCollinearity(text.split("\n")));
}
