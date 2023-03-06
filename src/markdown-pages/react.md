---
title: React
date: 2019-01-07
tags:
- framework
- ui
---

## monorepo

https://itnext.io/guide-react-app-monorepo-with-lerna-d932afb2e875

## create react app

```bash
create-react-app my-app --typescript
```

## with lerna
```bash
lerna add @types/jest
lerna add @types/node
lerna add @types/react
lerna add @types/react-dom
lerna add react 
lerna add react-dom
lerna add react-scripts
lerna add typescript 
lerna add tslint
```

## Performance

### Context

> The way that context works is that whenever the provided value changes from one render to another, it triggers a re-render of all the consuming components (which will re-render whether or not they're memoized).

- [How to Optimize your Context Value](https://github.com/kentcdodds/old-kentcdodds.com/blob/319db97260078ea4c263e75166f05e2cea21ccd1/content/blog/how-to-optimize-your-context-value/index.md)

When:
- Your context value changes frequently
- Your context has many consumers
- You are bothering to use React.memo (because things are legit slow)
- You've actually measured things and you know it's slow and needs to be optimized

Tips:
- Slice context up when possible
- Use memo within context if needed

### Large App State

- [State Colocation will make your React app faster](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)

![State Decision Tree](https://res.cloudinary.com/kentcdodds-com/image/upload/f_auto,q_auto,dpr_2.0,w_1600/v1625033349/kentcdodds.com/content/blog/state-colocation-will-make-your-react-app-faster/where-to-put-state.png)

- Use HOC to handle memoization

- [Recoil](https://recoiljs.org/docs/basic-tutorial/intro)



