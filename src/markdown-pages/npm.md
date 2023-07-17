---
title: NPM
date: 2018-07-28
tags:
  - ui
---

Get the npm location

```text
npm root
```

Get the npm location for globals - regardless of current workspace

```text
npm root -g
```

with docker

[https://github.com/nodejs/docker-node](https://github.com/nodejs/docker-node)

Run local package

[https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

```text
npx ng
```

> But wait! npx has yet another trick up its sleeve: when you use the
>
> `-c`
>
> option, the script written inside the string argument will have full access to the same env variables as a regular run script!

```text
npx -c ng
```
