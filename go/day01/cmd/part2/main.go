package main

import (
	"fmt"
	"os"

	"github.com/ericfrederich/aoc2024/day01/internal/part2"
	"github.com/ericfrederich/aoc2024/day01/internal/utils"
)

func main() {
	filename := "input.txt"
	if len(os.Args) > 1 {
		filename = os.Args[1]
	}
	left, right, err := utils.ReadInputFile(filename)
	if err != nil {
		fmt.Printf("Error reading input file: %v\n", err)
		return
	}
	result, err := part2.Part2(left, right)
	if err != nil {
		fmt.Println("Error in Part2:", err)
		return
	}
	fmt.Println("result:", *result)
}
