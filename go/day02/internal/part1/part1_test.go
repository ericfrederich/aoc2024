package part1

import (
	"testing"

	"github.com/ericfrederich/aoc2024/common"
)

func TestPart1(t *testing.T) {
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
				{7, 6, 4, 2, 1},
				{1, 2, 7, 8, 9},
				{9, 7, 6, 2, 1},
				{1, 3, 2, 4, 5},
				{8, 6, 4, 4, 1},
				{1, 3, 6, 7, 9},
			},
			want: 2,
		}, {
			name: "input",
			data: data,
			want: 369, // Replace with the expected result for the input data
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := AnalyzeData(tt.data)
			if got != tt.want {
				t.Errorf("Part1() = %v, want %v", got, tt.want)
			}
		})
	}
}
