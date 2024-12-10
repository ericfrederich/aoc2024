function occurrences(bigString: string, subString: string): number {
  return (bigString.match(new RegExp(subString, "g")) || []).length;
}

export function xmasSearch(data: string[]): number {
  const xmas = "XMAS";
  const height = data.length;
  const width = data[0].length;
  let ret = 0;

  const searchPatterns = [xmas, xmas.split("").reverse().join("")];

  const searchInDirection = (getChars: (i: number, j: number) => string, limit: number, innerLimit: number) => {
    for (const searchWord of searchPatterns) {
      for (let i = 0; i < limit; i++) {
        let chars = "";
        for (let j = 0; j < innerLimit; j++) {
          chars += getChars(i, j);
        }
        ret += occurrences(chars, searchWord);
      }
    }
  };

  // Horizontal and vertical searches
  searchInDirection((i, j) => data[i][j], height, width); // Horizontal
  searchInDirection((i, j) => data[j][i], width, height); // Vertical

  // Diagonal searches
  const searchDiagonals = (startRow: number, startCol: number, rowInc: number, colInc: number) => {
    for (let i = 0; i < height; i++) {
      let chars = "";
      for (let j = 0; j < width; j++) {
        const row = startRow + i * rowInc;
        const col = startCol + j * colInc;
        if (row >= 0 && row < height && col >= 0 && col < width) {
          chars += data[row][col];
        } else {
          break;
        }
      }
      ret += occurrences(chars, xmas);
      ret += occurrences(chars, xmas.split("").reverse().join(""));
    }
  };

  // Diagonal (\) and (/)
  for (let i = 0; i <= height - xmas.length; i++) {
    searchDiagonals(i, 0, 1, 1); // Diagonal (\) from left side
    searchDiagonals(i, 0, -1, 1); // Diagonal (/) from left side
  }
  for (let j = 1; j <= width - xmas.length; j++) {
    searchDiagonals(0, j, 1, 1); // Diagonal (\) from top side
    searchDiagonals(height - 1, j, -1, 1); // Diagonal (/) from bottom side
  }

  return ret;
}

if (import.meta.main) {
  const bytes = await Deno.readFile("input.txt");
  const fileStr = new TextDecoder().decode(bytes).trimEnd();
  const lines = fileStr.split("\n");
  console.log(xmasSearch(lines));
}
