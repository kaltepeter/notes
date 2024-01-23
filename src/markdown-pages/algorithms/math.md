---
title: Math Concepts
date: 2021-04-11
tags:
---

- <https://byjus.com/maths> - great basic math explanations

## Cartesian Product

Multiply two sets to get set of all ordered pairs.

<https://www.mathstopia.net/sets/cartesian-product>

## Combinations and Permutations

<https://www.mathsisfun.com/combinatorics/combinations-permutations.html>

### How many ways can you choose k items from n items without repetition and without order?

<https://www.hackmath.net/en/calculator/n-choose-k?n=12&k=2&order=0&repeat=0>

`n choose k`

## Triangle Numbers

<https://en.wikipedia.org/wiki/Triangular_number>

1,3,6,10...

`n * n-1 / 2`

![Triangle Numbers](../../images/triangle-numbers.jpg)

## Pascal's Triangle

<https://www.mathsisfun.com/pascals-triangle.html>

## Kabsch-Umeyama Algorithm

<https://zpl.fi/aligning-point-patterns-with-kabsch-umeyama-algorithm/>

Used to find optimal translations, rotation and scaling. Example used is aligning the big dipper and little dipper. This works amazingly well. Very easy python example, golang required gonum.

## Manhattan Distance

> he distance between two points is the sum of the absolute differences of their Cartesian coordinates
> -- <https://en.wikipedia.org/wiki/Taxicab_geometry>

Used to quantify distance between points. In 3d it would be:

```md
pointA = [1105,-1205,1229]
pointB = [-92,-2380,-20]
|(1105 + -92)| + |(-1205 + -2380)| + |(1229 + -20)| = 3621
```

## Lagrange Interpolation

> The Lagrange interpolation formula is a way to find a polynomial, called Lagrange polynomial, that takes on certain values at arbitrary points. Lagrange’s interpolation is an Nth degree polynomial approximation to f(x). Let us understand Lagrange interpolation formula using solved examples in the upcoming sections.

> Given n distinct real values $x_1, x_2,...,x_n$ and n real values $y_1, y_2,...,y_n$ (not necessarily distinct), there is a unique polynomial P with real coefficients satisfying $P \left(x_i\right) = Y_i$ for $i \in \{1, 2, …, n\}$, such that $deg\left(P\right) < n$. Lagrange interpolation formula for different order of polynomials is given as,

$f\left(x\right)=f\left(x_0\right) + \left(x - x_0\right)\left(\frac{f\left(x_0\right)-f\left(x_1\right)}{x_0-x_1}\right)$

simplified:

$f\left(x\right) = \frac{\left(x - x_1\right)}{\left(x_0 - x_1\right)}f_0 + \frac{\left(x - x_0\right)}{\left(x_1 - x_0\right)}f_1$

-- <https://www.cuemath.com/lagrange-interpolation-formula/>
