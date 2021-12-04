---
title: GO
date: 2021-12-4
tags: 
- language
---

## Getting Started

- [Getting Started](https://go.dev/doc/)
- [Creating a Module Tutorial](https://go.dev/doc/tutorial/create-module) - Full walk-through of creating a module
- [Interactive Walkthrough](https://go.dev/tour/list) - Online code REPL with instructions and detailed dive through the language
- [Standard Library Docs](https://pkg.go.dev/std)
- [Writing Unit Tests](https://blog.alexellis.io/golang-writing-unit-tests/) - Basic guide on writing unit tests
- [Playground](https://go.dev/play/)
- [Effective GO](https://go.dev/doc/effective_go) - Guide on writing clear idiomatic code
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=golang.go)
- [Go By Example](https://gobyexample.com/) - Really simple example code broken down by concept
- [Example Reduce Function](https://medium.com/@BastianRob/implementing-reduce-in-go-4a3e6e3affc) - Blog on an example reduce function with reflection
- [Advanced Tutorial](https://golangbyexample.com/golang-comprehensive-tutorial/) - More advanced comprehensive tutorial
- [All Data Types](https://golangbyexample.com/all-basic-data-types-golang/) - Full list of data types, examples and when to use
- [Go Lang Docs](https://golangdocs.com/) - Detailed posts and walk-through's on many topics
- [Awesome Go Libaries](https://awesome-go.com/) - Curated list of libraries

## Installing

### Mac

```bash
brew install golang
```

## Enums

Go does not have enums. There are patterns that can be used. Mostly IOTA with Constants


## Constants

Immutable values. Can be typed. Can't be declard with `:=`

```Go
const (
    x int = 42
    myString string = "Hi"
)

const MY_CONST int = 3 * 7
```

### IOTA

An iota is an auto incrementing number that can only be used with constants. See https://golangbyexample.com/iota-in-golang/ for full details

```Go
const (
    a = iota // 0
    b // 1
    c // 2
)

type ByteSize float64

// implicitly apply a function to get correct values
const (
    _           = iota // ignore first value by assigning to blank identifier
    KB ByteSize = 1 << (10 * iota) 
    MB
    GB
    TB
    PB
    EB
    ZB
    YB
)
```

## Maps

Maps are unordered. See https://yourbasic.org/golang/how-to-sort-in-go/#bonus-sort-a-map-by-key-or-value for sorting. If you need a sorted list use arrays and slices

## int vs inv64

`int` is machine dependent, 32 bit is int32, 64 bit is int64

Recommendation is to use int for signed values whenever possible, few exceptions

## Data Conversions

### string to int

- https://golangdocs.com/converting-string-to-integer-in-golang

```Go
import (
    "strconv"
)

v := "100"
i, _ := strconv.Atoi(v) // 100
n, _ := strconv.ParseInt(v, 10, 0) // 100, equivalent to Atoi
```

## Bit Manipulation

- [Bit Hacks](https://graphics.stanford.edu/~seander/bithacks.html) - Large set of example bit manipulation
- [Binary Operators Cheat Sheet](https://yourbasic.org/golang/bitwise-operator-cheat-sheet/) - Overview of binary operators

### String to Decimal

```Go

```

## Find in Array or Slice

https://golangcode.com/check-if-element-exists-in-slice/

```Go
package main

import (
    "fmt"
)

func main() {

    items := []string{"A", "1", "B", "2", "C", "3"}

    // Missing Example
    _, found := Find(items, "golangcode.com")
    if !found {
        fmt.Println("Value not found in slice")
    }

    // Found example
    k, found := Find(items, "B")
    if !found {
        fmt.Println("Value not found in slice")
    }
    fmt.Printf("B found at key: %d\n", k)
}

// Find takes a slice and looks for an element in it. If found it will
// return it's key, otherwise it will return -1 and a bool of false.
func Find(slice []string, val string) (int, bool) {
    for i, item := range slice {
        if item == val {
            return i, true
        }
    }
    return -1, false
}
```

## Filter slices

https://zetcode.com/golang/filter-slice/


## Functional Go

[7 Basics of Functional Go](https://deepu.tech/functional-programming-in-go/)
[gofp](https://github.com/rbrahul/gofp/blob/master/collections.go) - Inspired by lodash functional library

## Testing

[Table Driven Tests](https://ieftimov.com/post/testing-in-go-table-driven-tests/) - Examples of table driven tests

## Debugging

[Runtime Debugging](https://chetan177.medium.com/runtime-debugging-in-golang-b8a065d0fb5e) - Walkthorugh of delve

```bash
go install github.com/go-delve/delve/cmd/dlv@latest
```

IDE's are easier to run.