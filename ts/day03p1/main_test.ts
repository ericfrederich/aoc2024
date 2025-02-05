import { assertEquals } from "@std/assert";
import { mullItOver } from "./main.ts";

Deno.test(function addTest() {
  assertEquals(
    mullItOver(
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
    ),
    161,
  );
});
