package part1

import (
	"testing"

	"github.com/ericfrederich/aoc2024/common"
)

func TestPart1(t *testing.T) {

	actual, err := common.ReadInts2dFromFile("../../input.txt")
	if err != nil {
		t.Errorf("Error reading input file: %v\n", err)
	}
	// flip it
	cols := common.Columns(actual)
	if len(cols) != 2 {
		t.Error("Expected 2 columns in input file, got:", len(cols))
	}

	left := cols[0]
	right := cols[1]

	tests := []struct {
		name    string
		left    []int
		right   []int
		want    *int
		wantErr bool
	}{
		{
			name:  "example",
			left:  []int{3, 4, 2, 1, 3, 3},
			right: []int{4, 3, 5, 3, 9, 3},
			want:  intPtr(11),
		},
		{
			name:    "errors when left and right are not the same length",
			left:    []int{1, 2, 3},
			right:   []int{4, 5},
			wantErr: true,
		},
		{
			name:  "errors when left and right are not the same length",
			left:  []int{0, 10},
			right: []int{10, 0},
			want:  intPtr(0),
		},
		{
			name:  "actual",
			left:  left,
			right: right,
			want:  intPtr(1660292),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Part1(tt.left, tt.right)
			if tt.wantErr {
				if tt.want != nil {
					t.Errorf("Bad test case, if there's an error the want value should be nil; got %v", *tt.want)
				}
				if err == nil {
					t.Errorf("Expected error, got nil")
				}
				if got != nil {
					t.Errorf("Expected nil for value, got %v", got)
				}
				return
			}
			if *got != *tt.want {
				t.Errorf("Part1() = %v, want %v", *got, *tt.want)
			}
		})
	}
}

func intPtr(i int) *int {
	return &i
}
