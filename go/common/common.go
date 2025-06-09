package common

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func AbsInt(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func ReadInts2dFromFile(filename string) ([][]int, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, fmt.Errorf("failed to open file %s: %w", filename, err)
	}
	defer file.Close()
	var matrix [][]int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // skip empty lines
		}
		var row []int
		for _, numStr := range strings.Fields(line) {
			var num int
			if _, err := fmt.Sscanf(numStr, "%d", &num); err != nil {
				return nil, fmt.Errorf("failed to parse number %s: %w", numStr, err)
			}
			row = append(row, num)
		}
		matrix = append(matrix, row)
	}
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("error reading file %s: %w", filename, err)
	}
	if len(matrix) == 0 {
		return nil, fmt.Errorf("no data found in file %s", filename)
	}
	if len(matrix[0]) == 0 {
		return nil, fmt.Errorf("no columns found in file %s", filename)
	}
	for _, row := range matrix {
		if len(row) != len(matrix[0]) {
			return nil, fmt.Errorf("inconsistent row lengths in file %s", filename)
		}
	}
	return matrix, nil
}

func Columns(matrix [][]int) [][]int {
	if len(matrix) == 0 {
		return make([][]int, 0)
	}
	numCols := len(matrix[0])
	result := make([][]int, numCols)
	for i := range result {
		result[i] = make([]int, len(matrix))
	}
	for i, row := range matrix {
		for j, val := range row {
			result[j][i] = val
		}
	}
	return result
}
