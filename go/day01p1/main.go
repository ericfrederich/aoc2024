package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
	"slices"
)

// Panic on err
// A generic form of text/template's Must function
func Perr[T any](value T, err error) T {
	if err != nil {
		panic(err)
	}
	return value
}

func readInputFile(filename string) ([]int, []int) {
	f := Perr(os.Open(filename))
	bf := bufio.NewReader(f)
	left := []int{}
	right := []int{}
	for {
		line, err := bf.ReadString('\n')
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		var a int
		var b int
		Perr(fmt.Sscanf(line, "%d %d", &a, &b))
		left = append(left, a)
		right = append(right, b)
	}
	return left, right
}

func main() {
	left, right := readInputFile("input.txt")
	slices.Sort(left)
	slices.Sort(right)
	diff := 0
	for i := 0; i < len(left); i++ {
		a := left[i]
		b := right[i]
		if a >= b {
			diff += a - b
		} else {
			diff += b - a
		}
	}
	fmt.Println(diff)
}
