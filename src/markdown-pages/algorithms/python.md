---
title: Python
date: 2021-04-11
tags:
---

## Cartesian Product, Permutations

<https://www.geeksforgeeks.org/python-construct-cartesian-product-tuple-list/>

example: get all permutations of coords x,y,z for {0,1,2} +- 1

```python
res = [(x, y, z) for x in range(-1,1) for y in range(0,2) for z in range(1,3)]
print(res)
```

## Neighbors

```python
minX = max(0, x - 1)
maxX = min(len(line) - 1, x + 1)
minY = max(0, y - 1)
maxY = min(len(lines) - 1, y + 1)
neighbors = [
    (x, y) for x in range(minX, maxX) for y in range(minY, maxY)
]
```

get the min/max of coords (tuple)

```python
all_vals = list(graph.weights.keys()) + [graph.start_pos, graph.end_pos]
xs = list(map(lambda val: val[0], all_vals))
ys = list(map(lambda val: val[1], all_vals))
min_xy = (min(xs), min(ys))
max_xy = (max(xs), max(ys))

```

## Manhattan Distance

<https://docs.scipy.org/doc/scipy/tutorial/index.html>

```python
from scipy.spatial import distance
distance.cityblock([1, 0, 0], [0, 1, 0]) # 2

def manhattan_distance(a: GridLocation, b: GridLocation) -> int:
    return sum(abs(point1 - point2) for point1, point2 in zip(a, b))

manhattan_distance((2,18),(-2, 15)) # 7
```

```

## Umeyama algorithm

https://zpl.fi/aligning-point-patterns-with-kabsch-umeyama-algorithm/

```python
def kabsch_umeyama(A, B):
    assert A.shape == B.shape
    n, m = A.shape

    EA = np.mean(A, axis=0)
    EB = np.mean(B, axis=0)
    VarA = np.mean(np.linalg.norm(A - EA, axis=1) ** 2)

    H = ((A - EA).T @ (B - EB)) / n
    U, D, VT = np.linalg.svd(H)
    d = np.sign(np.linalg.det(U) * np.linalg.det(VT))
    S = np.diag([1] * (m - 1) + [d])

    R = U @ S @ VT
    c = VarA / np.trace(np.diag(D) @ S)
    t = EA - c * R @ EB

    return R, c, t

A = np.array([[ 23, 178],
              [ 66, 173],
              [ 88, 187],
              [119, 202],
              [122, 229],
              [170, 232],
              [179, 199]])
B = np.array([[232, 38],
              [208, 32],
              [181, 31],
              [155, 45],
              [142, 33],
              [121, 59],
              [139, 69]])

R, c, t = kabsch_umeyama(A, B)
# R = [[-0.81034281,  0.58595608]
#      [-0.58595608, -0.81034281]]
# c = 1.46166131
# t = [271.3345951, 396.07800317]

B = np.array([t + c * R @ b for b in B])
# B = [[ 29.08878779, 152.36814188]
#      [ 52.37669337, 180.03008629]
#      [ 83.50028582, 204.33920503]
#      [126.28647155, 210.02515345]
#      [131.40664707, 235.37261559]
#      [178.54823113, 222.56285654]
#      [165.79288328, 195.30194121]]
```

[Colab preview](https://colab.research.google.com/drive/1QmLL-0_FofDoJgtbCVlGdSZUxZA-K6ho?usp=sharing)

## Linear Algebra, Machine Learning

### NumPy

https://numpy.org/doc/stable/user/absolute_beginners.html - getting started

https://www.educba.com/matrix-multiplication-in-numpy/ - detailed explanations of functions

https://www.tutorialexample.com/understand-numpy-np-multiply-np-dot-and-operation-a-beginner-guide-numpy-tutorial/ - explains diff between dot, multiply and *

## Manhattan Distance

<https://docs.scipy.org/doc/scipy/tutorial/index.html>

```python
from scipy.spatial import distance
distance.cityblock([1, 0, 0], [0, 1, 0]) # 2

def manhattan_distance(a: GridLocation, b: GridLocation) -> int:
    return sum(abs(point1 - point2) for point1, point2 in zip(a, b))

manhattan_distance((2,18),(-2, 15)) # 7
```

## Umeyama algorithm

https://zpl.fi/aligning-point-patterns-with-kabsch-umeyama-algorithm/

```python
def kabsch_umeyama(A, B):
    assert A.shape == B.shape
    n, m = A.shape

    EA = np.mean(A, axis=0)
    EB = np.mean(B, axis=0)
    VarA = np.mean(np.linalg.norm(A - EA, axis=1) ** 2)

    H = ((A - EA).T @ (B - EB)) / n
    U, D, VT = np.linalg.svd(H)
    d = np.sign(np.linalg.det(U) * np.linalg.det(VT))
    S = np.diag([1] * (m - 1) + [d])

    R = U @ S @ VT
    c = VarA / np.trace(np.diag(D) @ S)
    t = EA - c * R @ EB

    return R, c, t

A = np.array([[ 23, 178],
              [ 66, 173],
              [ 88, 187],
              [119, 202],
              [122, 229],
              [170, 232],
              [179, 199]])
B = np.array([[232, 38],
              [208, 32],
              [181, 31],
              [155, 45],
              [142, 33],
              [121, 59],
              [139, 69]])

R, c, t = kabsch_umeyama(A, B)
# R = [[-0.81034281,  0.58595608]
#      [-0.58595608, -0.81034281]]
# c = 1.46166131
# t = [271.3345951, 396.07800317]

B = np.array([t + c * R @ b for b in B])
# B = [[ 29.08878779, 152.36814188]
#      [ 52.37669337, 180.03008629]
#      [ 83.50028582, 204.33920503]
#      [126.28647155, 210.02515345]
#      [131.40664707, 235.37261559]
#      [178.54823113, 222.56285654]
#      [165.79288328, 195.30194121]]
```

[Colab preview](https://colab.research.google.com/drive/1QmLL-0_FofDoJgtbCVlGdSZUxZA-K6ho?usp=sharing)

## Linear Algebra, Machine Learning

### NumPy

https://numpy.org/doc/stable/user/absolute_beginners.html - getting started

https://www.educba.com/matrix-multiplication-in-numpy/ - detailed explanations of functions

https://www.tutorialexample.com/understand-numpy-np-multiply-np-dot-and-operation-a-beginner-guide-numpy-tutorial/ - explains diff between dot, multiply and *
