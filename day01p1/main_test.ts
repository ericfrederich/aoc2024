import { assertEquals } from "@std/assert";
import { historianHysteria } from "./main.ts";

const exampleLines = `
3   4
4   3
2   5
1   3
3   9
3   3
`.trimEnd().split("\n");

Deno.test(function addTest() {
  assertEquals(historianHysteria(exampleLines), 11);
});
