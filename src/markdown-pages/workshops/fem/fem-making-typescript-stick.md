---
title: Making Typescript Stick
date: 2022-03-23
tags:
- workshop
- front-end-masters
---

# Making Typescript Stick

Make it stick book --> using to write onboarding

<https://www.typescript-training.com/course/making-typescript-stick>

```tsx
// @errors: 2322 2320
let first: string & number
let second: String & Number

first = "abc"
second = "abc"
second = new String("abc")
```

[Playground Link](https://www.typescriptlang.org/play?#code/PTAEAEFMCdoe2gZwFygEwGY1vVgDAFAA2kALqAGYCWSpqip0VAdgOagBkozArgLYAjGMTKhEkAMZxmAE1QBlRi3ZcAcvyHQCBarVABeUACIAhgIlGC4qbIPGzFq5Oky7zSAHdQipmwAUpuZGAJRAA)

- When using the primitive types string and number we can see that the union of these two types results in a never. In other words, there is no string that can be also regarded as a number, and no number that can also be regarded as a `string

- When using the interface types String and Number, we can see that the union does not result in a never

Use the lowercase types as much as possible. They are primitives.

## What order do logs print?

```tsx
function getData() {
  console.log("elephant")
  const p = new Promise((resolve) => {
    console.log("giraffe")
    resolve("lion")
    console.log("zebra")
  })
  console.log("koala")
  return p
}
a...
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAcwKZQCIEMpYBQCUiA3gFCKIQIDOcANqgHR1zJ4BEqDADgBZZgo7AuUo0oibogC8iMKgDuiAAoAnOAFsY1VHjyrUtOgDdURaQD4SoilTBGmLNu2QxVWYMFTCbiA0dMOOngwHwpbGnpHVg4AL1QAI3cwxABfEQj7KOYY9gBrOCw6LBSDKBBVJG5SVNIsagBPSERQSFgERA0sGDBCa0yHHOcIHBS7agl-EDoJWSwFbok0TBx8DLEshiH9Q2moEVrx7KcOABNWHy6ewkYoXlRevst+jcGT9g04OB0fdKA)

`dog, cat, elephant, giraffe, zebra, koala, lion, moose`

## Variadic Tuple Types

```tsx
enum Sandwich {
  Hamburger,
  VeggieBurger,
  GrilledCheese,
  BLT
}
type SandwichOrder = [
  number, // order total
  Sandwich, // sandwich
  ...string[] // toppings
]


// ---cut---
/**
 * return a...
```

[Playground Link](https://www.typescriptlang.org/play?#code/KYOwrgtgBAyghiAJgdwJYGMAWUDeAoKKACTggCMwAnAc2EoBoCoA1Ya61YAIStoaYDilVABsRwRAGFMwYAGdgjQlwAyAFTwBfPABcAngAdgsBCgyYA8pUR0oAXigBtJuHJ16UAPSeoAe2u2Or46cCJM8EhoWB7eUHKmUZhMAHSpcjrCINSOALpePkEGBqhZcng5eJWxALS16GA6tdV4ngBUrQStUJTAOlQgUAiDlJRwelDoviAhJSXUUMAAbnR6OphzCwAe6MAGOlBrxgBmqJTpC+IQoDqdnnhHYCDoOqhTB3CiADxqWzqgiHJBiA9LkAHwACiYcBoAC5usA4IgpiJxo5XGR3FBUsk1BUAJS4JiTEDnRwAfVQ1BA-gkHmxPXSeQc0OoTB6fUoAwZN20xPO-hslAAjHCImYsFZBfYnEKAEzJACcCo8YsSyRI5F4mIAROIdH0dtqKng+fsGWARPsHDMROCBXQhXiWj5CIQAHoAfiAA)

Example of cleaning types: <https://github.com/ReactiveX/rxjs/pull/5859/files>

## Error type unknown

```tsx
function somethingRisky() {}
// ---cut---
try {
  somethingRisky()
} catch (err: unknown) {
  if (err instanceof Error) throw err
  else throw new Error(`${err}`)
}
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAZzgWwKZQBYzAcwCUZkBrATwAoBKRAbwF8AoAehcQFouIQouOmUAE7l6TRCnRZcBYmSrUmDRBACGUCNkSUMQoQC5E4UmDgB3MLTrjEMYNt1DbYZFFWQMcewFE9cIbQ4QuaIjjYYADbIGIhBIWAYZoi+wUKUAAYAJHSODOmKDEA)

## interface vs. type

```tsx
// @errors: 2300
type Color = {
  red: number
  green: number
  blue: number
}

interface Color {
  alpha: number
}
```

[Playground Link](https://www.typescriptlang.org/play?#code/PTAEAEFMCdoe2gZwFygEwGYAMWBQAXATwAdJQBhOAGwVAF5QBvXUUaSAE1QDsBXAWwBGMFqADm7SNx4Dh0UYKq9IMoSIC+uXAEtu+GADMAhgGMylGtCaijVYgAsjqubnVA)

Interfaces are open, types are not. Two interfaces would compile.

## Learning

<https://github.com/type-challenges/type-challenges>

```tsx
// @errors: 2344
type Expect<T extends true> = T
type Equal<X, Y> =
(<T>() => T extends X ? 1 : 2) extends
(<T>() => T extends Y ? 1 : 2) ? true : false

type NotEqual<X, Y> = true extends Equal<X, Y>...
```

[Playground Link](https://www.typescriptlang.org/play?#code/PTAEAEFMCdoe2gZwFygEwGYAsWBQAXATwAdJQBRAD1IGN8AeAFVEkv0gDsATRUfaAK6QAfKAC8oRgRJlyARwEBDADb0AGgBpQATVFjcACibCDASnGjmrdt15rQAflABGUKjTnrnHoeNmLkixs3rzaji5u6OZO-EKRAGYqiJC40qSgAHJw+PJKqpo6enyCZF62FAoq6lq64YnKyZGxKbggoAC0nTQC+J3tqW0AkgC2xMqQw5z4fAAWAJa8RKRpZABKkPgC0BwA8vH0AGJFB0E2PKAA3gYAdLeK0ADmqIochADaALqmqHMc8TCgVbMAC+4SBkQ4kAAbjAANwDMCMSCIfCIVI0OAcFGgeLKObEADCcF+4lA-jEwlwoFAAFlFPgZtdoC8uHBhv5RAAGa4AVnCACIZpBFDx+ZF+fhFHMGvzcBisdN4DQANYABUUpGgAGUaAtEAheBIDPcnhEAD7oUAWjDmCmXKmgaAbLYcUAm8RiCTOB3UpwGflK5VixS8eUo0w+yLuz0SNCRv384gamDB0OY8OR1D+xC6xD6pCp0Bh-AR4GpJZkGgh5Gkt4OtqIOajcYuB1UWgMXJVABGcDg4xeWnWm22e3o5NEvf7wo4wjnGnrYEbzbIcep7cgdHoXdUzkwQ+do-2E5cmDnwgX6+om4YkZ39CJK8oO27ACsbweR7tj7bRI+xqwL7vnQc4OhebbXlud6VKokbUqq8DDAskD0FOA6zpe1JYcOLpjieCFsshqF9uhoFYaAlLUuBV4dtuMHjr+oD8vEfb8p+uE-gEJ7Max56YRuUHkfegrCqKVpMZK0qIGxgKHt+9AVnA8Q4nihLErOlEUfxkG3kJ9FwUxgZihaibJtAxlMTmeoGmxBk4UeCkyEpjpwCq6qajq1lIJpVFgbgHzljIoD-uMz5vjepIXA6iioG8e5aDxcD8gF1LdvcqAicoyhJQ6xBOlCZioBwAjDN2MC4MCQA)
