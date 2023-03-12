---
title: rust
date: 2023-03-11
tags:
- language
---

## Getting Started

`cargo init` create project
`cargo run` run project

## Error Handling

Result class

```rust
fn error_me(throw: bool) -> Result<(), usize> {
    if throw {
        return Err(7)
    }

    return Ok(())
}

// same return type makes this easy
fn main() -> Result<(), usize> {
    // ? will unwrap the value
    error_me(false)?;
    return Ok(())
}
```

`.expect("this failed because blah")` throw error and crash

### Using `anyhow`

```rust
use std::path::PathBuf;

use anyhow::{Result, anyhow, Context,};

fn error_me(throw: bool) -> Result<()> {
    if throw {
        return Err(anyhow!("this should never be true"));
    }

    std::fs::read(PathBuf::from("/foo")).context("hey unable to do this")?;

    return Ok(());
}

fn main() -> Result<()> {
    error_me(false)?;
    return Ok(())
}
```

## Structs

```rust
#[derive(Debug)]
struct RustLangStruct {
    y i32
    x i32
}

fn new_struct(x i32, y i32) -> RustLangStruct {
    return RustLangStruct{x, y}; // x will equal x, uses name, not order
}

func main() {
    println!("{:?}\n", new_struct(9, 6));
}
```

## Traits

- use traits to add behavior