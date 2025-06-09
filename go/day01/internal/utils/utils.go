package utils

import (
	"bufio"
	"fmt"
	"os"
)

func AbsInt(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func ReadInputFile(filename string) ([]int, []int, error) {
	left := make([]int, 0)
	rigth := make([]int, 0)
	file, err := os.Open(filename)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to open file %s: %w", filename, err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		// Process the line and populate left and right slices
		var l, r int
		_, err := fmt.Sscanf(line, "%d %d", &l, &r)
		if err != nil {
			return nil, nil, fmt.Errorf("failed to parse line %s: %w", line, err)
		}
		left = append(left, l)
		rigth = append(rigth, r)
	}

	if err := scanner.Err(); err != nil {
		return nil, nil, fmt.Errorf("failed to read file %s: %w", filename, err)
	}
	return left, rigth, nil
}
