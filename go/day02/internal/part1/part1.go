package part1

import (
	"github.com/ericfrederich/aoc2024/common"
)

func AnalyzeRow(row []int) bool {
	direction := 0
	for i := 1; i < len(row); i++ {
		v1 := row[i-1]
		v2 := row[i]
		diff := v2 - v1
		if diff == 0 {
			return false // not strictly increasing or decreasing
		}
		if common.AbsInt(diff) > 3 {
			return false // difference is too large
		}
		if direction == 0 {
			direction = diff / common.AbsInt(diff) // set initial direction
		}
		if (diff / common.AbsInt(diff)) != direction {
			return false // direction changed
		}
	}
	return true
}

func AnalyzeData(data [][]int) int {
	result := 0
	for _, row := range data {
		if AnalyzeRow(row) {
			result++
		}
	}
	return result
}
