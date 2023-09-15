---
title: Tailwind CSS
date: 2023-09-05
tags:
  - javascript
  - css
  - framework
---

- <https://tailwindcss.com/>

- <https://v1.tailwindcss.com/course>

```bash
npm init -y
npm i tailwindcss postcss-cli autoprefixer
npx tailwind init
npm i -D live-server nodemon npm-run-all
```

postcss.config.js

```javascript
module.exports = {
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
```

tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["css/**/*.css", "public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

package.json (modified from <https://alexanderzeitler.com/articles/watch-tailwind-changes-update-browser-sync/>)

```json
  "scripts": {
    "build": "postcss css/tailwind.css -o public/build/tailwind.css",
    "start": "live-server public",
    "watch:dev": "nodemon -x npm run build -- --watch",
    "watch": "run-p watch:dev start"
  },
```

public/index.html

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Tailwind Quickstart</title>
    <link rel="stylesheet" href="/build/tailwind.css" />
  </head>
  <body>
    <h1 class="text-4xl font-bold text-center text-blue-500">Hello World!</h1>
  </body>
</html>
```

css/tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Approach

- Utility first. Everything is utility methods.

## Customizing with Apply

1. Put `@tailwind utilities;` below custom classes to allow combining utilities and overriding defined values in custom classes
1. Variants are not supported in `@apply`, use css. e.g. `.btn:hover`
1. Exposes media queries by name via `@screen`. e.g. `@screen sm {}`
1. Use for global tag styles, avoid for all components. Switch to framework to build components.

```css
/* ... */
.btn {
  @apply inline-block bg-indigo-500 text-white px-5 py-3 shadow-lg rounded-lg uppercase tracking-wider font-semibold text-sm;
}

.btn:hover {
  @apply bg-indigo-400;
}

@screen sm {
  .btn {
    @apply text-base;
  }
}

@tailwind utilities;
```

## Config

Generate full config

```bash
npx tailwind init tailwind-full.config.js --full
```

1. Anything at top level replaces
1. Anything in extend merges


### production mode

strip unused css

`npm i @fullhuman/postcss-purgecss`

```javascript
        process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
            content: [
                './src/**/*.vue',
                './public/index.html',
            ],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        }),
```

## Tools

- [Sizzy Browser for reponsive design](https://sizzy.co/)
- [VS Code Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Configure VS Code

<https://byby.dev/at-rule-tailwind>
