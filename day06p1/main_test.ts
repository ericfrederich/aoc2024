import { assertEquals } from "@std/assert";
import { exampleData, guardGallivant } from "./main.ts";

Deno.test(function addTest() {
  assertEquals(guardGallivant(exampleData), 41);
});
