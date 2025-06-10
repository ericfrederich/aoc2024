package part2

import (
	"testing"

	"github.com/ericfrederich/aoc2024/common"
)

func TestPart2(t *testing.T) {
	data, err := common.ReadInts2d("../../input.txt", false)
	if err != nil {
		t.Error("Error reading input file:", err)
	}

	tests := []struct {
		name string
		data [][]int
		want int
	}{
		{
			name: "example",
			data: [][]int{
				{7, 6, 4, 2, 1}, // Safe without removing any level.
				{1, 2, 7, 8, 9}, // Unsafe regardless of which level is removed.
				{9, 7, 6, 2, 1}, // Unsafe regardless of which level is removed.
				{1, 3, 2, 4, 5}, // Safe by removing the second level, 3.
				{8, 6, 4, 4, 1}, // Safe by removing the third level, 4.
				{1, 3, 6, 7, 9}, // Safe without removing any level.
			},
			want: 4,
		}, {
			name: "input",
			data: data,
			want: 428, // Replace with the expected result for the input data
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := AnalyzeData(tt.data)
			if got != tt.want {
				t.Errorf("Part2() = %v, want %v", got, tt.want)
			}
		})
	}
}
