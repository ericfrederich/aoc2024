import { assertEquals } from "@std/assert";
import { similarityScore } from "./main.ts";

const left = [3, 4, 2, 1, 3, 3];

const right = [4, 3, 5, 3, 9, 3];

Deno.test(function addTest() {
  assertEquals(similarityScore(left, right), 31);
});
