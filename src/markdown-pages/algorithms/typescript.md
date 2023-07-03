---
title: Typescript References
date: 2021-04-11
tags:
---

https://itnext.io/permutations-combinations-algorithms-cheat-sheet-68c14879aba5

https://github.com/trekhleb/javascript-algorithms

## Cartesian Product, Permutations

example: get all permutations of coords x,y,z for {0,1,2} +- 1

```typescript
const xRange = [-1,0,1];
const yRange = [0,1,2];
const zRange = [1,2,3];

for (const x of xRange) {
    for (const y of yRange) {
        for (const z of zRange) {
            console.log([x, y, z]);
        }
    }
}
```

## Manhatten Distance

```tsx
let pointA = [1105,-1205,1229]
let pointB = [-92,-2380,-20]

function manhattenDist(p1: number[], p2: number[]) {
    return p1.reduce((acc, v, idx) => {
        return acc += Math.abs(v - pointB[idx])
    }, 0)
}
// ...
```

[Playground Link](https://www.typescriptlang.org/play?#code/DYUwLgBADg9glgOzAQQgXggbQIzYAwCsANALTYBMhRF5AnALoBQoksiYAQulibeaeQDMADjwC8TRgDMArggDGYODAQQAtgEMEACw1gwIBABE4AZzAAKKNgBcEBDLUAjEACdM9ItHJ2Hztx4AlBAA3owQERCu4DKuqtYAdNEAJjLyIBYWGvLyXgBuXnDJAB7BaAB8oeGRNdFgsarZ8hAA1BgAsnraCRpOphZ5ECTQ8EgcmEXF9IHVEQC+Xngzc4zM4OrJ3Jo6egbGZpZsSMhER5wzjPIqpjCgPaambpZqm2hvEIIAbOTYXgBEnR2+kMEGSBy06Qgpm0MBkwE2IAAjjINMAPt9sH8ZlcEDc7sAYABzCwArS6YGqMHmCB2P5eF6BIA)
