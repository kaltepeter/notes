# Python

## Cartesian Product, Permutations

https://www.geeksforgeeks.org/python-construct-cartesian-product-tuple-list/

example: get all permutations of coords x,y,z for {0,1,2} +- 1

```python
res = [(x, y, z) for x in range(-1,1) for y in range(0,2) for z in range(1,3)] 
print(res)
```