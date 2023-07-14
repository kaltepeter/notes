---
title: Golang
date: 2023-03-11
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
- [Go 101](https://go101.org/article/101.html) - Details about the language, online book

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

An iota is an auto incrementing number that can only be used with constants. See <https://golangbyexample.com/iota-in-golang/> for full details

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

## Functions

Go does not have default values. See <https://joneisen.me/programming/2013/06/23/golang-and-default-values.html> for options.

Optional arguments: <https://petomalina.medium.com/dealing-with-optional-parameters-in-go-9780f9bfbd1d>

## Maps

Maps are unordered. See <https://yourbasic.org/golang/how-to-sort-in-go/#bonus-sort-a-map-by-key-or-value> for sorting. If you need a sorted list use arrays and slices

## int vs inv64

`int` is machine dependent, 32 bit is int32, 64 bit is int64

Recommendation is to use int for signed values whenever possible, few exceptions

## Slice to Array

This will give you compile time range checks and possibly improve performance if you know the array size.

<https://stackoverflow.com/questions/19073769/how-do-you-convert-a-slice-into-an-array>

Go 1.17

```go
slice := []int{1,2,3,4,5,6}
arr := [6]int{}
arrPtr := (*[6]int)(slice)
arr = *arrPtr
```

Go 1.18+ will provide more

## Data Conversions

### string to int

- <https://golangdocs.com/converting-string-to-integer-in-golang>

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

<https://golangcode.com/check-if-element-exists-in-slice/>

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

<https://zetcode.com/golang/filter-slice/>

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

## Comparing Slices

<https://yourbasic.org/golang/compare-slices/>

```Go
input := "7,4,9,5,11,17"
got := StringToListOfInt(input)
want := []int{7, 4, 9, 5, 11, 17}
reflect.DeepEqual(got, want)
```

## Switch Statement

<https://golangdocs.com/switch-statement-in-golang>

## Graphs

<https://codetree.dev/golang-graph-traversal/> - super easy walk through of basics

## Stack

<https://flaviocopes.com/golang-data-structure-stack/> - example stack implementation

List or slice is possible. Slice seems more idiomatic

## Types

Go currently does not have generics. It does have duck typing and interfaces.

## Printing type info

```go
func Println2(x interface{}) {
    fmt.Printf("type is '%T', value: %v\n", x, x)
}
```

### Using an Interface

- <https://musse.dev/stringer-golang/> Most used interface, great example

```go
package main

import "fmt"

type Dog struct {
    name string
    breed string
}

func (d *Dog) String() string {
    return fmt.Sprintf("My name is %s, I'm a %s! Woof!", d.name, d.breed)
}

func main() {
    d := Dog{"Rex", "poodle"}
    fmt.Print(d) // {Rex poodle}
    fmt.Print(&d) // My name is Rex, I'm a poodle! Woof!
}
```

More complex custom example:

```go
func (p *Packet) String() string {
 return fmt.Sprintf("[Packet] Version: %v TypeId: %v Value: %v \nSubPacket: %v", p.Version, p.TypeId, p.Value, p.SubPacket)
}
```

Output:

```bash
[Packet] Version: 3 TypeId: 0 Value: 10000000001000000000000000000101100001000101010110001011001000100000000010000100011000111000110100
SubPacket: [Packet] Version: 0 TypeId: 0 Value: 00000000000101100001000101010110001011001000100000000010000100011000111000110100
SubPacket: [Packet] Version: 0 TypeId: 4 Value: 01010101100010111010
SubPacket: [Packet] Version: 5 TypeId: 4 Value: 010111011
SubPacket: [Packet] Version: 0 TypeId: 0 Value:
SubPacket: <nil>
```

### Embedding a type in a type (Alternate to extension)

- <https://medium.com/swlh/what-is-the-extension-interface-pattern-in-golang-ce852dcecaec>
- <https://golangbyexample.com/embedding-interfaces-go/>

Called the extension interface pattern

```go
type Packet struct {
 Version   int64
 TypeId    int64
 Value     string
 SubPacket *Packet
}

type Bits struct {
 Packet
}
```

This pattern allows recursion of the fields. All Packet fields are contained in Bits and each packet can reference a sub packet. Note, this is an anonymous inclusion and can be referenced by either direct value or `Packet.<value>` Name

```go
bits := Bits{
    Value: "Yo"
    TypeId: 1,
    Version: 2
}

fmt.Println(bits.Value) // "Yo"
fmt.Println(bits.Packet.Value) // "Yo"
```

## Type Switching

<https://golangdocs.com/reflection-type-switching-in-golang>

```go
func Println2(x interface{}) {
    switch x.(type) {
    case bool:
        fmt.Print("This is a boolean value: ", x.(bool))
    case int:
        fmt.Print("This is my nice int value: ", x.(int))
    case float64:
        fmt.Print(x.(float64))
    case complex128:
        fmt.Print(x.(complex128))
    case string:
        fmt.Print(x.(string))
    case Person:
        fmt.Print(x.(Person))
    case chan int:
        fmt.Print(x.(chan int))
    default:
        fmt.Print("Unknown type")
    }

    fmt.Print("\n")
}
```

Another example from AOC 2021 Day 16. This sets the var `p` to the valid type as well.

```go
 switch p := packet.(type) {
 case Literal:
  decoded += int(p.Value)
 case Operator:
  switch p.TypeId {
  case 0:
   // sum of subpackets
   for _, p2 := range p.Packets {
    decoded += DecodePacket(p2)
   }
  }
```

## Recursion

<https://golangdocs.com/recursion-in-golang>

Regular recusion:

```go
package main

import (
    "fmt"
)

func fib(n int) int {
    if (n == 0) {
        return 0
    } else if(n == 1) {
        return 1
    } else {
        return fib(n-1) + fib(n-2)
    }
}

func main() {
    fmt.Println(fib(10))  // 55
}
```

Tail recursion:

```go
package main

import (
    "fmt"
)

func f(v int) {
    if(v == 0) {
        fmt.Println("Zero")
        return
    } else {
        fmt.Println(v)
        f(v-1)               // tail-recursive call
    }
}

func main() {
    f(5)

    // output:
    // 5
    // 4
    // 3
    // 2
    // 1
    // Zero
}
```

## Error Handling

- If returning error, use pointers for value. makes returning nil possible and easier to handle. If value you would have to construct and empty Foo.

```go
func CreateFoo(fail bool) (*Foo, error) {
 if fail {
  return nil, fmt.Errorf("this is an error with value ")
 }
 return &Foo{}, nil
}

func main() {
 foo, err := CreateFoo(false)
}
```

## File Handling

- [embed](https://blog.carlmjohnson.net/post/2021/how-to-use-go-embed/)

## Values vs Pointer receiver

- default to pointer unless you know you need a value
- value receivers receive a copy, pointers don't.
- value receivers may have perf wins

```go
type Foo struct {
    thing int
}

// value receiver
func (f Foo) fA() {
    ...
    f.thing = 5; // DOESNT DO ANYTHING
}

// pointer receiver
func (f *Foo) fB() {
    ...
    f.thing = 5; // CHANGES
}
```

## Structs

```go
type GoLangStruct struct {
    y int
    x int
}

func NewStruct(x, y int) GoLangStruct {
    return GoLangStruct{x, y} // x will equal y, it goes by order not name
}

func main() {
    fmt.Printf("%+v\n", NewStruct(9, 6));
}
```
