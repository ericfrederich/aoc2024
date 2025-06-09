package part2

import (
	"testing"
)

func TestPart2(t *testing.T) {
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
