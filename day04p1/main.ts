function occurences(bigString: string, subString: string): number {
  return (bigString.match(RegExp(subString, "g")) || []).length;
}

export function xmasSearch(data: string[]): number {
  let ret = 0;
  const xmas = "XMAS";
  const height = data.length;
  const width = data[0].length;
  // search forwards and backwards
  for (const searchWord of [xmas, xmas.split("").reverse().join("")]) {
    // horizontals
    for (const line of data) {
      const tmp = occurences(line, searchWord);
      ret += tmp;
    }
    // verticals
    for (let col = 0; col < width; col++) {
      const vert = data.map((line) => line[col]).join("");
      ret += occurences(vert, searchWord);
    }
    // diagonal (\)
    // starting in col 0
    for (let startRow = 0; startRow <= height - searchWord.length; startRow++) {
      const chars: string[] = [];
      for (let col = 0; col < width; col++) {
        if (startRow + col >= height) {
          break;
        }
        chars.push(data[startRow + col][col]);
      }
      const diag = chars.join("");
      ret += occurences(diag, searchWord);
    }
    // starting in row 0
    for (let startCol = 1; startCol <= width - searchWord.length; startCol++) {
      const chars: string[] = [];
      for (let row = 0; row < height; row++) {
        if (startCol + row >= width) {
          break;
        }
        chars.push(data[row][startCol + row]);
      }
      const diag = chars.join("");
      ret += occurences(diag, searchWord);
    }

    // diagonal (/)
    // starting in col 0
    for (
      let startRow = height - 1;
      startRow >= searchWord.length - 1;
      startRow--
    ) {
      const chars: string[] = [];
      for (let col = 0; col < width; col++) {
        if (startRow - col < 0) {
          break;
        }
        chars.push(data[startRow - col][col]);
      }
      const diag = chars.join("");
      ret += occurences(diag, searchWord);
    }
    // starting in row (height - 1)
    for (let startCol = 1; startCol <= width - searchWord.length; startCol++) {
      const chars: string[] = [];
      for (let row = height - 1; row >= 0; row--) {
        if ((startCol + (height - row) - 1) >= width) {
          break;
        }
        chars.push(data[row][startCol + (height - row) - 1]);
      }
      const diag = chars.join("");
      ret += occurences(diag, searchWord);
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
