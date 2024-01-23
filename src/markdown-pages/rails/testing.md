---
title: "Ruby on Rails: Testing"
date: 2023-11-25
tags:
  - ruby
  - Ruby on Rails
  - framework
  - test
  - rspec
---

## Testing a Concern

- [testing concerns in rails 91i](https://dev.to/yowchun93/testing-concerns-in-rails-91i)

```ruby
class DummyPerson < ActiveRecord::Base
  self.table_name = 'users'

  include Personable
end
```
