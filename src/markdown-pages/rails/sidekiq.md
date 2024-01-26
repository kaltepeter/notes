---
title: "Ruby on Rails: Sidekiq"
date: 2023-11-25
tags:
  - ruby
  - Ruby on Rails
  - framework
  - background
  - async
  - sidekiq
---

## Serialization / Passing objects to sidekiq

Sidekiq backed by Redis has to serialize everything. If you pass an active record object to a worker it will likely choke unless it's simple values.

**Solution**

Pass serializable inputs to the worker and have the worker lookup the record. **Warning**, depending on how you use this you could have significant load in your workers.
