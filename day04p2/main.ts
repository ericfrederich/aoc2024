export function xmasSearch(data: string[]): number {
  let ret = 0;
  const height = data.length;
  const width = data[0].length;
  /*
    lefts         rights
    (-1,-1)       (-1, 1)   tops
          ( 0, 0)
    ( 1,-1)       ( 1, 1)   bottoms
  */
  const [tops, bottoms, lefts, rights] = [
    [[-1, -1], [-1, 1]],
    [[1, -1], [1, 1]],
    [[-1, -1], [1, -1]],
    [[-1, 1], [1, 1]],
  ].map(
    ([[r0, c0], [r1, c1]]) => (r: number, c: number) => [
      data[r + r0][c + c0],
      data[r + r1][c + c1],
    ],
  );
  for (let row = 1; row < height - 1; row++) {
    for (let col = 1; col < width - 1; col++) {
      if (
        data[row][col] != "A" ||
        row + 1 >= height ||
        col + 1 >= width
      ) {
        continue;
      }
      for (
        const [firstHalf, secondHalf] of [[tops, bottoms], [lefts, rights]]
      ) {
        for (const [letterA, letterB] of ["MS", "SM"]) {
          if (
            firstHalf(row, col).every((v) => v === letterA) &&
            secondHalf(row, col).every((v) => v === letterB)
          ) {
            ret += 1;
          }
        }
      }
    }
  }
  return ret;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const bytes = await Deno.readFile("input.txt");
  const fileStr = new TextDecoder().decode(bytes).trimEnd();
  const lines = fileStr.split("\n");
  console.log(xmasSearch(lines));
}
