---
title: Angular Material
date: 2021-01-13
tags:
  - ui
  - framework
---

Comprehensive guide: https://blog.thoughtram.io/angular/2017/05/23/custom-themes-with-angular-material.html

Color tool for palettes: https://material.io/design/color/the-color-system.html#tools-for-picking-colors

Sample palette:

```scss
$ds-purple: (
  50: #eaedff,
  100: #cad3fe,
  200: #a6b5fd,
  300: #8297fc,
  400: #6881fc,
  500: #4d6bfb,
  600: #4663fa,
  700: #3d58fa,
  800: #344ef9,
  900: #253cf8,
  1000: #000,
  contrast: (
    50: $ds-black,
    100: $ds-black,
    200: $ds-black,
    300: $ds-black,
    400: $ds-black,
    500: $ds-white,
    600: $ds-white,
    700: $ds-white,
    900: $ds-white,
    A100: $ds-white,
    A200: $ds-white,
    A500: $ds-white,
    A700: $ds-white,
    A900: $ds-white,
  ),
);
```

## Building a theme

1. Pick or generate a palette: <https://material.io/resources/color/#!/?view.left=0&view.right=0> and <https://material.io/design/color/the-color-system.html#tools-for-picking-colors>

1. Generate palette in code
1. example theme:

   ```typescript
   @import '~@angular/material/theming';
   @import '../palette';
   // Plus imports for other components in your app.

   // Include the common styles for Angular Material. We include this here so that you only
   // have to load a single css file for Angular Material in your app.
   // Be sure that you only ever include this mixin once!
   @include mat-core();

   // Define the palettes for your theme using the Material Design palettes available in palette.scss
   // (imported above). For each palette, you can optionally specify a default, lighter, and darker
   // hue. Available color palettes: https://material.io/design/color/
   $shiny-new-app-primary: mat-palette($sn-gray-blue, 800);
   $shiny-new-app-accent: mat-palette($sn-green, 300);

   // The warn palette is optional (defaults to red).
   $shiny-new-app-warn: mat-palette($mat-red);

   // Create the theme object. A theme consists of configurations for individual
   // theming systems such as `color` or `typography`.
   $shiny-new-app-theme: mat-light-theme(
   $shiny-new-app-primary,
   $shiny-new-app-accent,
   $shiny-new-app-warn
   );

   // Include theme styles for core and each component used in your app.
   // Alternatively, you can import and @include the theme mixins for each component
   // that you are using.
   @include angular-material-theme($shiny-new-app-theme);

   ```

1. Import in your app styles
