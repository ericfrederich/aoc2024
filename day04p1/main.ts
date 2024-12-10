function occurrences(bigString: string, subString: string): number {
  return (bigString.match(new RegExp(subString, "g")) || []).length;
}

export function xmasSearch(data: string[]): number {
  const xmas = "XMAS";
  const height = data.length;
  const width = data[0].length;
  let ret = 0;

  const searchPatterns = [xmas, xmas.split("").reverse().join("")];

  // Horizontal and vertical searches
  for (const searchWord of searchPatterns) {
    for (let i = 0; i < height; i++) {
      ret += occurrences(data[i], searchWord); // Horizontal
    }
    for (let j = 0; j < width; j++) {
      let vertical = "";
      for (let i = 0; i < height; i++) {
        vertical += data[i][j];
      }
      ret += occurrences(vertical, searchWord); // Vertical
    }
  }

  // Diagonal searches
  const searchDiagonals = (startRow: number, startCol: number, rowInc: number, colInc: number) => {
    let chars = "";
    let row = startRow;
    let col = startCol;
    while (row >= 0 && row < height && col >= 0 && col < width) {
      chars += data[row][col];
      row += rowInc;
      col += colInc;
    }
    return chars;
  };

  for (const searchWord of searchPatterns) {
    // Diagonal (\)
    for (let i = 0; i <= height - xmas.length; i++) {
      ret += occurrences(searchDiagonals(i, 0, 1, 1), searchWord); // From left side
    }
    for (let j = 1; j <= width - xmas.length; j++) {
      ret += occurrences(searchDiagonals(0, j, 1, 1), searchWord); // From top side
    }

    // Diagonal (/)
    for (let i = 0; i <= height - xmas.length; i++) {
      ret += occurrences(searchDiagonals(i, 0, -1, 1), searchWord); // From left side
    }
    for (let j = 1; j <= width - xmas.length; j++) {
      ret += occurrences(searchDiagonals(height - 1, j, -1, 1), searchWord); // From bottom side
    }
  }

  return ret;
}

if (import.meta.main) {
  const bytes = await Deno.readFile("input.txt");
  const fileStr = new TextDecoder().decode(bytes).trimEnd();
  const lines = fileStr.split("\n");
  console.log(xmasSearch(lines));
}
