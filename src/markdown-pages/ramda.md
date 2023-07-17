---
title: Ramda
date: 2021-04-11
tags:
  - library
---

- https://itnext.io/a-beginners-guide-to-ramda-part-1-7e4a34972e97

## composing & currying

- https://itnext.io/a-beginners-guide-to-ramda-part-1-7e4a34972e97

- https://robertwpearce.com/ramda-chops-function-currying.html

- https://tinyurl.com/y6e26lf4

Curry

example return partial function no curry

```typescript
const rule4 = R.equals("a");
const rule5 = R.equals("b");

const rules = new Map();
rules.set(4, rule4);
rules.set(5, rule5);

const ruleLookup = (rId) => (rList) => rList.get(rId);
console.log(ruleLookup); // fn(rId)
console.log(ruleLookup(4)); //fn(rList)
console.log(ruleLookup(4)(rules)); // fn(equals)
console.log(ruleLookup(4)(rules)("a")); // true
```

curry

```typescript
const rule4 = R.equals("a");
const rule5 = R.equals("b");

const rules = new Map();
rules.set(4, rule4);
rules.set(5, rule5);

const ruleLookup = curry((rId, rList) => rList.get(rId));
console.log(ruleLookup); // fn(rId)
const r4 = ruleLookup(4); //fn(rList)
console.log(r4);
const appliedRules = r4(rules);
console.log(appliedRules); // fn(equals)
console.log(appliedRules("a")); // true

const genRule = (rList) => map(ruleLookup, rList);
console.log(genRule);
rules.set(2, genRule([4, 4]));
console.log(rules.get(2)[0](rules)("a"));
console.log(rules.get(2)[1](rules)("a"));

const fns = map(([fn, v]) => fn(rules)(v), zip(rules.get(2), "ab"));
console.log(fns); // [true, false]
```

## Basics

-

## Map, Filter, Reduce

https://robertwpearce.com/ramda-chops-map-filter-and-reduce.html

### Map Examples

```javascript
const rule4 = R.equals("a");
const rule5 = R.equals("b");

const rules = new Map();
rules.set(4, rule4);
rules.set(5, rule5);

const getRule = (rId) => rules.get(rId);
const genRule = (rList) => map((rId) => rules.get(rId), rList);
const testGenRule = genRule([4, 4]);
console.log(testGenRule[0]("a")); // true
console.log(testGenRule[1]("b")); // false
```
