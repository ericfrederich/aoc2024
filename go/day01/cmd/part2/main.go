package main

import (
	"fmt"
	"os"

	"github.com/ericfrederich/aoc2024/common"
	"github.com/ericfrederich/aoc2024/day01/internal/part2"
)

func main() {
	filename := "input.txt"
	if len(os.Args) > 1 {
		filename = os.Args[1]
	}
	data, err := common.ReadInts2dFromFile(filename)
	if err != nil {
		fmt.Printf("Error reading input file: %v\n", err)
		return
	}
	// flip it
	cols := common.Columns(data)
	if len(cols) != 2 {
		fmt.Println("Expected 2 columns in input file, got:", len(cols))
		return
	}
	left := cols[0]
	right := cols[1]

	result, err := part2.Part2(left, right)
	if err != nil {
		fmt.Println("Error in Part2:", err)
		return
	}
	fmt.Println("result:", *result)
}
