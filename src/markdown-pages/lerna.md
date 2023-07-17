---
title: Lerna
date: 2019-01-07
tags:
  - monorepo
---

## with typescript

https://blog.logrocket.com/setting-up-a-monorepo-with-lerna-for-a-typescript-project-b6a81fe8e4f8

```bash
mkdir my-mono-repo
cd my-mono-repo
lerna init && npm i

cat >.gitignore <<EOF
node_modules
lerna-debug.log
npm-debug.log
packages/*/lib
.idea
EOF

npm install typescript @types/node —save-dev

lerna create my-package

```

Install deps

```
lerna add tslint --dev
```

## dev deps

```
yarn add husky --dev -W
```
