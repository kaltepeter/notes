---
title: Phoenix
date: 2023-05-06
tags:
  - framework
---

## Learn

- <https://www.learnphoenix.io/phoenix-chat/lessons>

## alias vs use vs. import

alias helps setup aliases for modules so you can use shorter names

`alias FireStarter.Repo`

import allows easy access to functions from other modules without using the fully qualified name

```elixir
import Ecto.Query

def short_duration do
  from v in __MODULE__, where: v.duration < 800
end
```

use is similar to import but gives module authors more control over what is imported and allows injecting code

```elixir
defmodule Firestarter.Video do
  use Ecto.Schema

  schema "videos" do
  end
end
```

## General

`IO.inspect()` print output

list comprehension

```elixir
for video <- @videos do

end
```

## New

```elixir
def new(conn, _) do
    changeset = change(%Event{})
    render conn, "new.html", changeset: changeset
end
```
