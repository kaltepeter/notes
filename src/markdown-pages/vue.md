---
title: Vue
date: 2023-09-05
tags:
  - javascript
  - framework
---

## Vue CLI Add to existing project

```bash
npx @vue/cli create .
```

## Tooling

- [VS Code Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- ~~[VS Code Live Preview](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.vue-preview)~~
- [VS Code Preview](https://marketplace.visualstudio.com/items?itemName=zenclabs.previewjs)

vue wrapper for preview (with tailwind)

```vue
<style>
body {
    @apply bg-gray-200 p-0
}

</style>
<script setup>
  import "../src/assets/tailwind.css";
//   import { getCurrentInstance } from "vue";

//   const { appContext } = getCurrentInstance();
//   appContext.app.use(mockRouter);
</script>
<template>
  <div class="wrapper">
    <slot />
  </div>
</template>
```
