---
title: go
date: 2023-03-11
tags:
- language
---

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