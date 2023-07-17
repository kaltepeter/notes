---
title: Haskell
date: 2020-01-19
tags:
  - language
---

https://tech.fpcomplete.com/haskell/learn

http://www.cs.nott.ac.uk/~pszgmh/pih.html

https://repl.it - code runner

## books

Programming in Haskell

## my samples

https://repl.it/@kaltepeter/programming-in-haskell

## language details

https://hackage.haskell.org/package/base-4.12.0.0/docs/Prelude.html#g:13 - built ins

### functions

```haskell
-- conditional
    abs :: Int -> Int
    abs n = if n >= 0 then n else -n
-- guarded
    abs n | n >= 0 = n
          | otherwise = -n

    signum n | n  < 0 = -1
             | n == 0 = 0
             | otherwise = 1
-- pattern matching
    not :: Bool -> Bool
    not False = True
    not True = False

    && :: Bool -> Bool -> Bool
    True && True   = True
    True && False  = False
    False && True  = False
    False && False = False

    -- simplified
    -- _ is wildcard
    True && True = True
    _    && _    = False

    -- alt - first value True returns value of second
    True && b  = b
    False && _ = False

    -- guarded
    b && c | b == c    = b
           | otherwise = False

-- lamda λ
    (\x -> x + x) 2

-- curried operator
    (+) 1 2
```
