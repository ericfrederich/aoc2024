function occurrences(bigString: string, subString: string): number {
  return (bigString.match(new RegExp(subString, "g")) || []).length;
}

export function xmasSearch(data: string[]): number {
  const xmas = "XMAS";
  const height = data.length;
  const width = data[0].length;
  let ret = 0;

  const searchPatterns = [xmas, xmas.split("").reverse().join("")];

  const searchInDirection = (getChars: (i: number, j: number) => string) => {
    for (const searchWord of searchPatterns) {
      for (let i = 0; i < height; i++) {
        let chars = "";
        for (let j = 0; j < width; j++) {
          chars += getChars(i, j);
        }
        ret += occurrences(chars, searchWord);
      }
    }
  };

  // Horizontal and vertical searches
  searchInDirection((i, j) => data[i][j]); // Horizontal
  searchInDirection((i, j) => data[j][i]); // Vertical

  // Diagonal searches
  const searchDiagonals = (startRow: number, startCol: number, rowInc: number, colInc: number) => {
    for (let i = 0; i < height; i++) {
      let chars = "";
      for (let j = 0; j < width; j++) {
        const row = startRow + i * rowInc;
        const col = startCol + j * colInc;
        if (row >= 0 && row < height && col >= 0 && col < width) {
          chars += data[row][col];
        }
      }
      ret += occurrences(chars, xmas);
      ret += occurrences(chars, xmas.split("").reverse().join(""));
    }
  };

  // Diagonal (\) and (/)
  searchDiagonals(0, 0, 1, 1); // Diagonal (\) from top-left
  searchDiagonals(height - 1, 0, -1, 1); // Diagonal (/) from bottom-left

  return ret;
}

if (import.meta.main) {
  const bytes = await Deno.readFile("input.txt");
  const fileStr = new TextDecoder().decode(bytes).trimEnd();
  const lines = fileStr.split("\n");
  console.log(xmasSearch(lines));
}