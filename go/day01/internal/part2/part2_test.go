package part2

import (
	"testing"
)

func TestPart2(t *testing.T) {
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
			want:  intPtr(31),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Part2(tt.left, tt.right)
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
				t.Errorf("Part1() = %v, want %v", got, tt.want)
			}
		})
	}
}

func intPtr(i int) *int {
	return &i
}
