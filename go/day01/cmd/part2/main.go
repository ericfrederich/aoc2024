package main

import (
	"fmt"

	"github.com/ericfrederich/aoc2024/day01/internal/part2"
	"github.com/ericfrederich/aoc2024/day01/internal/utils"
)

func main() {
	left, right, err := utils.ReadInputFile("input.txt")
	result, err := part2.Part2(left, right)
	if err != nil {
		fmt.Println("Error in Part2:", err)
		return
	}
	fmt.Println("result:", *result)
}
