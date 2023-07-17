---
title: Factory Bot
date: 2023-06-19
tags:
  - framework
  - ruby
  - backend
---

## Transient attributes

<https://bloggie.io/@kinopyo/the-practical-usage-of-factory_bot-transient-attributes>

## Overriding defaults

You can override a field by passing in an object with values as the second argument.

```ruby
create(:user_confirmed, { user_email: email })
```
