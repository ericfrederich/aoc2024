package main

import (
	"fmt"
	"os"

	"github.com/ericfrederich/aoc2024/common"
	"github.com/ericfrederich/aoc2024/day02/internal/part1"
)

func main() {
	filename := "input.txt"
	if len(os.Args) > 1 {
		filename = os.Args[1]
	}
	data, err := common.ReadInts2d(filename, false)
	if err != nil {
		fmt.Println("Error reading input file:", err)
		return
	}
	result := 0
	for _, row := range data {
		if part1.AnalyzeRow(row) {
			result++
		}
	}
	fmt.Println("result:", result)
}
