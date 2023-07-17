---
title: Performance
date: 2021-04-11
tags:
  - ui
  - angular
---

## Build Optimizer and Vendor Chunk

Don't assume vendor chunk is helpful.

Use Vendor IF: - You can cache the asset - The asset doesn't change as often as the app - The vendor chunk reduces main significantly

Use the build optimizer with vendor off IF: - You benefit from smaller bundle size overall

> If we put all shared pipes, directives and common components in one big shared module and then import it everywhere(inside sync and async chunks) then that code will be in our initial main chunk. So if you want to get a bad initial load performance then it’s the way to go.

> On the other hand, if we split commonly used code across lazy loaded modules then a new shared chunk will be created and will be loaded only if any of those lazy modules are loaded. This should improve the application initial load. But do it wisely because sometimes it’s better to put small code in one chunk that having the extra request needed for a separate chunk load.

https://medium.com/angular-in-depth/angular-code-splitting-or-how-to-share-components-between-lazy-modules-432c755e389c
