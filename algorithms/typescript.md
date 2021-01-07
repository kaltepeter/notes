# Typescript References

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