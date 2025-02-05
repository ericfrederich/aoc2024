package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
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
	lookup := make(map[int]int)
	for _, value := range right {
		lookup[value] += 1
	}
	similarity := 0
	for _, value := range left {
		occurances, ok := lookup[value]
		if !ok {
			continue
		}
		similarity += value * occurances
	}
	fmt.Println(similarity)
}
