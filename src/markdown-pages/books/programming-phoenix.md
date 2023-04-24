---
title: Programming Phoenix
date: 2023-04-23
tags:
- book
- phoenix
---

## Layers

```elixir
connection
|> endpoint()
|> router()
|> pipelines()
|> controller()
```

- Each request comes through an endpoint, then router, then pipelines, then the controller.
- Plug is a strategy for building web apps and libraries
- Business logic is in a context
- Keep controllers clean and skinny

## Stack

- Erlang
- Elixir
- Phoenix

```bash
elixir -v
mix local.hex
psql --version
```

## Getting Started

```bash
mix phx.new hello
cd hello
cd assets
npm i
cd ..

```
