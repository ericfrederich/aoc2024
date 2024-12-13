import { assertEquals } from "@std/assert";
import { exampleInput, printQueue } from "./main.ts";

Deno.test(function addTest() {
  const { rules, pageSets } = exampleInput;
  assertEquals(printQueue(rules, pageSets), 123);
});
