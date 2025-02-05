import { assertEquals } from "@std/assert";
import { diskFragmenter } from "./main.ts";

const exampleData = "2333133121414131402";

Deno.test(function diskFragmenterTest() {
  assertEquals(diskFragmenter(exampleData), 1928);
});
