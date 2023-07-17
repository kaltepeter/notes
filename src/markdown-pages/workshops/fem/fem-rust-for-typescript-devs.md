---
title: FEM Rust for Typescript Devs
date: 2023-03-10
tags:
  - workshop
  - front-end-masters
---

- https://theprimeagen.github.io/rust-for-typescript-devs/
- https://code.visualstudio.com/updates/v1_67#_toggle-inlay-hints
- https://rust-unofficial.github.io/too-many-lists/index.html

## Rust

`!` is a macro

```rust
let foo = 5
let mut foo = 5
```

shadowing

```rust
let foo = 5
let foo = 'yo'
```

- only public and private scope

`String` and `&str`

- strings are heap allocated and mutable
- &str is a view of string, immutable, analogous to &[u8]

- unwraps and clones are dangerous but will show up

- destructuring is pattern matching

`todo!("handle this")` will let you move on and explode when called

`unreachable!("this should never happen")` handle unknowns

`foo.unwrap()` can't unwrap a none or error value, which is dangerous. Pulls values out, don't use them, good for learning

- value: itself
- reference: readonly reference of the value
- mutable reference: means read and write reference

`()` is nothing, not like undefined

## Error handling

- thiserror, great for creating errors, should be used in libraries
- anyhow, great for applications

## Borrow Checker

There are THREE rules you must have in your head at all times.

- There can only be one value owner
- There can be unlimited immutable borrows (reference) with no mutable references
- There can be only one mutable reference and no immutable references

There is one rule for Lifetimes

- A reference cannot outlive its value

- tokio
- leptos + WASM
