import { assertEquals } from "@std/assert";
import { plutonianPebbles } from "./main.ts";
const exampleData = `
125 17
`.trim().split(" ").map(Number);

Deno.test(function plutonianPebblesTest() {
  assertEquals(plutonianPebbles(exampleData, 25), 55312);
});
