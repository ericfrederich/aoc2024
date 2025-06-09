package part2

import (
	"github.com/ericfrederich/aoc2024/common"
)

func AnalyzeRow(row []int, allowedRemovals int) bool {
	direction := 0
	problem := -1
	for i := 0; i < len(row)-1; i++ {
		v1 := row[i]
		v2 := row[i+1]
		diff := v2 - v1
		if diff == 0 {
			problem = i // not strictly increasing or decreasing
			break
		}
		if common.AbsInt(diff) > 3 {
			problem = i // difference is too large
			break
		}
		if direction == 0 {
			direction = diff / common.AbsInt(diff) // set initial direction
		}
		if (diff / common.AbsInt(diff)) != direction {
			problem = i // direction changed
			break
		}
	}
	if problem == -1 {
		return true // no problems found
	}
	// no more removals allowed
	if allowedRemovals == 0 {
		return problem == -1
	}
	if problem == 1 || problem == 0 {
		x0 := row[1:]
		x1 := make([]int, 0, len(row)-1)
		x1 = append(x1, row[:1]...)
		x1 = append(x1, row[2:]...)
		return AnalyzeRow(x0, 0) || AnalyzeRow(x1, 0)
	} else {
		return AnalyzeRow(append(row[:problem+1], row[problem+2:]...), allowedRemovals-1)
	}
}

func AnalyzeData(data [][]int) int {
	result := 0
	for _, row := range data {
		if AnalyzeRow(row, 1) {
			result++
		}
	}
	return result
}
