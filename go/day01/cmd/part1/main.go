package main

import (
	"fmt"

	"github.com/ericfrederich/aoc2024/day01/internal/part1"
	"github.com/ericfrederich/aoc2024/day01/internal/utils"
)

func main() {
	left, right, err := utils.ReadInputFile("input.txt")
	result, err := part1.Part1(left, right)
	if err != nil {
		fmt.Println("Error in Part1:", err)
		return
	}
	fmt.Println("result:", *result)
}
