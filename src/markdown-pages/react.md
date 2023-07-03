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

### Performance Monitoring

- [React Production Performance](https://kentcdodds.com/blog/react-production-performance-monitoring)

## Async (Suspense)

- React renders components in try/catch, if you throw a promise during render if it's not ready it will update when ready

```typescript
const pokemonPromise = fetchPokemon("pikachu").then(
  pokemonData => (pokemon = pokemonData)
)

function PokemonInfo() {
  if (!pokemon) {
    throw pokemonPromise
  }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}
```

### Error Handling

```typescript
  if (pokemonError) {
    throw pokemonError;
  }


<ErrorBoundary>
  <React.Suspense fallback={<div>loading...</div>}>Yo</React.Suspense>
</ErrorBoundary>
```

### Promises inside render 

- Dangerous, don't assume render called only once
- Use a cache to resolve

```typescript
const promiseCache = {}
function MySuspendingComponent({value}) {
  let resource = promiseCache[value]
  if (!resource) {
    resource = doAsyncThing(value)
    promiseCache[value] = resource // <-- this is very important
  }
  return <div>{resource.read()}</div>
}
```

✅ ⚠️ ⛔
### Fetch on Render (default)

✅ benefits from colocation
✅ fetch when component renders
⛔ User may see empty content
⛔ Takes time

### Fetch than render

⛔ empty content

### Render as fetch

✅ Fetch data and assets as soon as you have the assets you need (preload)
⚠️ Lose the benefits of colocation unless split into two files (data and component)


### Suspense List

- [Suspense List](https://17.reactjs.org/docs/concurrent-mode-reference.html#suspenselist)