---
title: "Ruby on Rails: Performance"
date: 2023-11-25
tags:
  - ruby
  - Ruby on Rails
  - framework
  - performance
---

- [Optimizing Rails for Memory (4 parts)](https://collectiveidea.com/blog/archives/2015/02/19/optimizing-rails-for-memory-usage-part-1-before-you-optimize)

## Profiling

- [stackprof](https://github.com/tmm1/stackprof)

```bash
gem install stackprof
```

```ruby
StackProf.run(mode: :cpu, raw: true, out: 'tmp/stackprof-cpu-myapp.dump') do
  #...
end
# mode: cpu, wall, object. use object for memory
```

- [stackprof webnav](https://github.com/alisnic/stackprof-webnav)

```bash
gem install stackprof-webnav
stackprof-webnav -f /path/to/stackprof.dump
```

## Active Record

- [find_in_batches vs. find_each](https://www.rubyinrails.com/2019/09/17/rails-find-in-batches-vs-find-each/)

### Maximum Number / Calculate Needs

> A released connection will be returned to the pool, but not disconnect from the database server. The connection will remain connected in the pool, waiting for a new thread to request a connection. Hence the connection will count against your database server's maximum number of connections.

> Only when a connection in the pool remains unused for more than 5 minutes, ActiveRecord will actually close the connection. You can configure this by setting the idle_timeout in your database.yml.

-- [Using ActiveRecord with threads might use more database connections than you think](https://makandracards.com/makandra/45360-using-activerecord-with-threads-might-use-more-database-connections-than-you-think)

`(2 pods * 3 workers) * (1 pod * 10 sidekiq workers) = 6 * 10 = 60 connections`

`((2 pods * 3 workers) * (1 pod * 10 sidekiq workers)) * 5 threads = (6 * 10) * 5 = 300 connections`

`reaping_frequency`: when to look for connections from inactive threads

`ActiveRecord::Base.clear_active_connections!`: clears all active connections and diconnects forcibly

`ActiveRecord::Base.connection_pool.release_connection`: releases the connection back to the pool without disconnecting so it can be reused

## Reducing memory

- [find_each memory leak](https://github.com/rails/rails/issues/46436)
- [how to reduce memory usage in ruby](https://answers.abstractbrain.com/how-to-reduce-memory-usage-in-ruby)

1. reduce sidekiq threads
1. use `MALLOC_ARENA_MAX=2` as an env var

## Caching

- [Caching in development environment in Rails 5](https://www.bigbinary.com/blog/caching-in-development-environment-in-rails5)

```bash
rails dev:cache # will enable/disable the cache if you have the default config in rails 5+
```

Example cache config in development.rb

```ruby
if Rails.root.join('tmp/caching-dev.txt').exist?
  config.action_controller.perform_caching = true
  config.static_cache_control = "public, max-age=172800"
  config.cache_store = :mem_cache_store
else
  config.action_controller.perform_caching = false
  config.cache_store = :null_store
end
```
