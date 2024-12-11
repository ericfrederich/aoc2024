import { assertEquals } from "@std/assert";
import { xmasSearch } from "./main.ts";

Deno.test(function addTest() {
  const example = [
    ".M.S......",
    "..A..MSMS.",
    ".M.S.MAA..",
    "..A.ASMSM.",
    ".M.S.M....",
    "..........",
    "S.S.S.S.S.",
    ".A.A.A.A..",
    "M.M.M.M.M.",
    "..........",
  ];
  assertEquals(xmasSearch(example), 9);
});
