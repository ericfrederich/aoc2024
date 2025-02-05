#!/usr/bin/env -S deno -A

export function plutonianPebbles(stones: number[], blinks: number): number {
  function blink(stones: number[]) {
    for (let i = 0; i < stones.length; i++) {
      const value = stones[i];
      // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
      if (value === 0) {
        stones[i] = 1;
      } // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
      else if (String(value).length % 2 === 0) {
        const sval = String(value);
        stones.splice(i, 1, Number(sval.slice(0, sval.length / 2)), Number(sval.slice(sval.length / 2)));
        i += 1;
      } // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
      else {
        stones[i] *= 2024;
      }
    }
  }
  while (blinks-- > 0) {
    blink(stones);
  }
  return stones.length;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  const stones = text.split(" ").map(Number);
  console.log(plutonianPebbles(stones, 25));
}
