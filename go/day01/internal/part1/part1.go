package part1

import (
	"fmt"
	"slices"

	"github.com/ericfrederich/aoc2024/day01/internal/utils"
)

func Part1(left, right []int) (*int, error) {
	if len(left) != len(right) {
		return nil, fmt.Errorf("error: left and right slices are not of the same length")
	}

	slices.Sort(left)
	slices.Sort(right)

	result := 0
	for i := 0; i < len(left); i++ {
		result += utils.AbsInt(left[i] - right[i])
	}
	return &result, nil
}
