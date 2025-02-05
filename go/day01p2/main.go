package main

import (
	"bufio"
	"fmt"
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
	file := Perr(os.Open(filename))
	defer file.Close()

	var left, right []int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var a, b int
		fmt.Println(scanner.Text())
		Perr(fmt.Sscanf(scanner.Text(), "%d %d", &a, &b))
		left = append(left, a)
		right = append(right, b)
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
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
