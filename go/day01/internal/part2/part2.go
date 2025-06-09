package part2

import (
	"fmt"
	"slices"
)

func Part2(left, right []int) (*int, error) {
	if len(left) != len(right) {
		return nil, fmt.Errorf("error: left and right slices are not of the same length")
	}

	slices.Sort(left)
	slices.Sort(right)

	// scan the right side just once
	counts := make(map[int]int)
	for _, value := range right {
		counts[value]++
	}
	result := 0
	for i := 0; i < len(left); i++ {
		needle := left[i]
		result += needle * counts[needle]
	}
	return &result, nil
}
