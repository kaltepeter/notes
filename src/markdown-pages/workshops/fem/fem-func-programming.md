---
title: FEM functional programming
date: 2020-12-04
tags:
  - workshop
---

https://docs.google.com/presentation/d/1nj5xmsHeJh-6RdjLs1190Hwl8smclvFLePqPCTVsrYw/edit#slide=id.g338d117be_040

https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/

## curry trick

```javascript
const words = function (str) {
  return split(" ", str);
};
```

```javascript
const words = (str) => {
  return split(" ", str);
};
```

```javascript
const words = split(" ", str);
```

## compose

same as dot chaining but read right to left. pipe is left to right.

## code pens

curry: https://codepen.io/kaltepeter/pen/KKKGGdb
compose: https://codepen.io/kaltepeter/pen/gOOBQbq
box: https://codepen.io/drboolean/pen/poodxOm
either: https://codepen.io/drboolean/pen/xgoeWR
task https://codepen.io/drboolean/pen/Mparbp

https://mostly-adequate.gitbooks.io/mostly-adequate-guide/

## curry trick

```javascript
const words = function (str) {
  return split(" ", str);
};
```

```javascript
const words = (str) => {
  return split(" ", str);
};
```

```javascript
const words = split(" ", str);
```

## compose

same as dot chaining but read right to left. pipe is left to right.

## code pens

curry: https://codepen.io/kaltepeter/pen/KKKGGdb
compose: https://codepen.io/kaltepeter/pen/gOOBQbq
box: https://codepen.io/drboolean/pen/poodxOm
either: https://codepen.io/drboolean/pen/xgoeWR
task https://codepen.io/drboolean/pen/Mparbp

# functional arch

https://github.com/fantasyland/fantasy-land

## code pens

monoids: https://codepen.io/drboolean/pen/MpKpee
fn modeling: https://codepen.io/drboolean/pen/qeqpgB?editors=0010
transformers: https://codepen.io/drboolean/pen/NQKByP

## abstractions

`const identity = a => a`

## map of conccepts

https://github.com/fantasyland/fantasy-land/blob/master/figures/dependencies.png

https://www.npmjs.com/package/daggy

https://github.com/DrBoolean/Functional-Javascripts

https://haskellbook.com/

https://docs.google.com/presentation/d/1L5gxYQz2hyzbVJk5tkyNdDidf_cg4I1BlIGd_Y9jblU/edit#slide=id.g73e75cdd29_0_173

https://folktale.origamitower.com/
