import { assertEquals } from "@std/assert";
import { exampleData, guardGallivantPart2 } from "./main.ts";

Deno.test(function addTest() {
  assertEquals(guardGallivantPart2(exampleData), 6);
});
