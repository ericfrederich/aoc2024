import { assertEquals } from "@std/assert";
import { xmasSearch } from "./main.ts";

Deno.test(function addTest() {
  const example = [
    "MMMSXXMASM",
    "MSAMXMSMSA",
    "AMXSXMAAMM",
    "MSAMASMSMX",
    "XMASAMXAMM",
    "XXAMMXXAMA",
    "SMSMSASXSS",
    "SAXAMASAAA",
    "MAMMMXMMMM",
    "MXMXAXMASX",
  ];
  assertEquals(xmasSearch(example), 18);
});
