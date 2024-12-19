import { assertEquals } from "@std/assert";
import { hoofIt, readMap } from "./main.ts";

const exampleData = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`.trim();

const _blah = `
9990999
9991999
9992999
6543456
7154117
8161198
9871119
`.trim();

Deno.test(function hoofItTest() {
  assertEquals(hoofIt(readMap(exampleData)), 36);
});
