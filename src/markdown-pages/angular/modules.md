---
title: Angular Modules
date: 2021-04-11
tags:
  - ui
  - angular
---

## Export Only vs. Import/Export

The `HeaderComponent` is dependent on a material module. This module needs the import.

```typescript
@NgModule({
  declarations: [SharedUiComponent, HeaderComponent],
  imports: [MaterialModule],
  exports: [SharedUiComponent, HeaderComponent, MaterialModule],
})
export class SharedUiModule {}
```

This module re-exports material modules for use in other modules. This works, however, I am not sure this is correct.
**ANTI-PATTERN WARNING**: Using a shared material module makes any import of this module import all material modules in the application, versus a single or handful of needed modules. It becomes really apparent when using lazy-loaded modules.
-- https://indepth.dev/posts/1191/stop-using-shared-material-module

I think the exception would be if you put this module in vendor and loaded once in the app and than used webpack externals and/or module federation to re-use.

```typescript
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatToolbarModule],
})
export class MaterialModule {}
```
