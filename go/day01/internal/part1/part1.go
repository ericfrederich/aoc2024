package part1

import (
	"fmt"
	"slices"

	"github.com/ericfrederich/aoc2024/common"
)

func Part1(left, right []int) (*int, error) {
	if len(left) != len(right) {
		return nil, fmt.Errorf("error: left and right slices are not of the same length")
	}

	slices.Sort(left)
	slices.Sort(right)

	result := 0
	for i := 0; i < len(left); i++ {
		result += common.AbsInt(left[i] - right[i])
	}
	return &result, nil
}
