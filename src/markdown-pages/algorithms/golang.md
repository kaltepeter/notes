---
title: Golang
date: 2021-12-01
tags:
---

## Depth First

- <https://iq.opengenus.org/depth-first-search/>

- <https://codetree.dev/golang-graph-traversal/>

```go
func DFS(g *graph.Graph, startVertex *graph.Vertex, visitCb func(int)) {
 // we maintain a map of visited nodes to prevent visiting the same
 // node more than once
 visited := map[int]bool{}

 if startVertex == nil {
  return
 }
 visited[startVertex.Key] = true
 visitCb(startVertex.Key)

 // for each of the adjacent vertices, call the function recursively
 // if it hasn't yet been visited
 for _, v := range startVertex.Vertices {
  if visited[v.Key] {
   continue
  }
  DFS(g, v, visitCb)
 }
}
```

## Binary Search Tree

<https://hackthedeveloper.com/golang-binary-search-tree/>

## Stack

<https://codeburst.io/slice-based-stack-implementation-in-golang-8140603a1dc2> Simple implementation

## Find all rotations of a point

```go
type IntAdjList struct {
 Pos     int
 AdjList [][]int
}

type Coord struct {
 X int
 Y int
 Z int
}

func NewIntAdjList(coord int, other [][]int) (c IntAdjList) {
    c.Pos = coord
    c.AdjList = append(c.AdjList, other...)
    return
}

func calcCombos(g *IntAdjList) (cList []Coord) {
    coord := &Coord{
    X: g.Pos,
    }
    p1 := g.AdjList[0]
    p2 := g.AdjList[1]
    coord.Y = p1[0]
    coord.Z = p2[0]
    cList = append(cList, *coord)
    coord.Y = p1[1]
    coord.Z = p2[1]
    cList = append(cList, *coord)
    coord.Y = p1[0]
    coord.Z = p2[1]
    cList = append(cList, *coord)
    coord.Y = p1[1]
    coord.Z = p2[0]
    cList = append(cList, *coord)
    return
}

## All rotations of a coord

func (c *Coord) GetAllRotations() map[Coord]bool {
    coords := map[Coord]bool{}
    pairs := [][]int{{c.X, c.X * -1}, {c.Y, c.Y * -1}, {c.Z, c.Z * -1}}
    for i, c := range pairs {
        pList := [][]int{}
        
        if i > 0 {
            pList = append(pList, pairs[:i]...)
        }

        if i < len(pairs)-1 {
            pList = append(pList, pairs[i+1:]...)
        }

        cListL := NewIntAdjList(c[0], pList)
        cListR := NewIntAdjList(c[1], pList)
        adjList := calcCombos(&cListL)
        adjList = append(adjList, calcCombos(&cListR)...)
        
        for _, c := range adjList {
            coords[c] = true
        }
    }

    return coords
}
```

[Playground Link](https://play.golang.com/p/7GT97c-qX6H)

## Linear Algebra, Machine learning

### gonum

<https://medium.com/wireless-registry-engineering/gonum-tutorial-linear-algebra-in-go-21ef136fc2d7> - good basic walkthrough

<https://pkg.go.dev/gonum.org/v1/gonum@v0.9.3> - Documentation

### Matrix

Get teh neighbors of a point

```go
package main

import (
 "fmt"
 "gonum.org/v1/gonum/mat"
)

func matPrint(X mat.Matrix) {
 fa := mat.Formatted(X, mat.Prefix(""), mat.Squeeze())
 fmt.Printf("%v\n\n", fa)
}

func main() {
 m := mat.NewDense(4, 4, []float64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15})
 rows, cols := m.Dims()
 matPrint(m)

 startI := 0
 startJ := 0
 endI := rows
 endJ := cols
 for i := 0; i < rows; i++ {
  for j := 0; j < cols; j++ {
   fmt.Println("for num: ", m.At(i, j), " ", i, ",", j)
   if i > 0 {
    startI = i - 1
   } else if i == 0 {
    startI = i
   }
   if i < rows-1 {
    endI = i + 2
   }
   if j > 0 {
    startJ = j - 1
   } else if j == 0 {
    startJ = j
   }
   if j < cols-1 {
    endJ = j + 2
   }
   s := m.Slice(startI, endI, startJ, endJ)
   matPrint(s)
  }
 }
}
```

[Playground Link](https://play.golang.com/p/adPKV0EBdD4)

## Sorting

<https://medium.com/@kdnotes/how-to-sort-golang-maps-by-value-and-key-eedc1199d944>

## Enums

<https://blog.learngoprogramming.com/golang-const-type-enums-iota-bc4befd096d3>

```go
type Weekday int

const (
    Sunday    Weekday = iota + 1 // value: 1, type: Weekday
    Monday                       // value: 2, type: Weekday
    Tuesday                      // value: 3, type: Weekday
    Wednesday                    // value: 4, type: Weekday
    Thursday                     // value: 5, type: Weekday
    Friday                       // value: 6, type: Weekday
    Saturday                     // value: 7, type: Weekday
)
```

[Playground Link](https://go.dev/play/p/NEpyw07ts9)
