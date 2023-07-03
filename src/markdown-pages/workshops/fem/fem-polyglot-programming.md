---
title: FEM Polyglot Programming - TS, Go and Rust
date: 2023-03-10
tags:
- workshop
- front-end-masters
---

- https://theprimeagen.github.io/ts-go-rust/
- https://rust-unofficial.github.io/too-many-lists/

## Setup

- https://go.dev/doc/install
- `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

## Borrow Checker

- One of the most difficult to understand
- you can not have a mutable reference to a mutable var, readable and writable are split which makes it safe
- `{}` closure can enclose things for safety
- avoid `mut`
- reference is read only, mutable ref lets you manipulate the value
- `let` lets you change the types

```rust
let a: Vec<i32> = vec![];
let mut b = a;
b.push(5);

println!("a size: {}", a.len());
println!("b size: {}", b.len());
```
 

- Rust and typescript are very close
- Go uses `iota`

### Rust
- Enums can have different types on items
- Rust has nullables which are enums


- [WASM with Rust](https://github.com/yewstack/yew) 
- [vscode tools](https://www.becomebetterprogrammer.com/rust-recommended-vscode-extensions/)
- [vscode tools 2](https://users.rust-lang.org/t/setting-up-rust-with-vs-code/76907)