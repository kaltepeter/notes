---
title: Git In-Depth
date: 2022-01-28
tags:
  - course
  - front-end-masters
---

https://frontendmasters.com/workshops/web-app-patterns/

https://firt.dev/

https://firtman.github.io/webapp-patterns/

`<script src="app.js" defer type="module"></script>` import as module

`globalThis` is the global object. window in browser

https://developer.mozilla.org/en-US/docs/Glossary/Global_object

`#data` private var

## Singleton

```javascript
static instance = null;
static {
    this.instance = new TodoList();
}
static getInstance() {
    return this.instance;
}

constructor() {
    if (TodoList.instance) {
        throw new Error('Use TodoList.getInstance() to access the list')
    }
}
```

## Mixins

```javascript
Object.assign(TodoList.prototype, observerMixin);
```

```javascript
this.notify?.call(this); # safe call
```
