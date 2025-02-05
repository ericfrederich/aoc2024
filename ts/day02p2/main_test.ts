import { assertEquals } from "@std/assert";
import { numSafe } from "./main.ts";

const exampleData = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

Deno.test(function addTest() {
  assertEquals(numSafe(exampleData), 4);
});
