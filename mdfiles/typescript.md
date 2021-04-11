# typescript

dynamic imports:

* https://mariusschulz.com/blog/typescript-2-4-dynamic-import-expressions
* http://2ality.com/2017/01/import-operator.html

## async

async IIFE

```typescript
(async () => {
    // code goes here
})();
```

## global definition

```typescript
declare namespace NodeJS {
  interface Global {
    APPD_ENABLED: string;
  }
}
```

## Boolean as type guard filter

* https://fettblog.eu/boolean-in-javascript-and-typescript/
* https://mariusschulz.com/blog/conditional-types-in-typescript

```javascript
let list = [1,2,3,4,null,7,null,9,'yo'];
let filteredList = list.filter(Boolean).filter(v => typeof v === 'number');
console.log(filteredList);
```

Does not work, type error.

```typescript
let list = [1,2,3,4,null,7,null,9, 'yo'];
let filteredList: NonNullable<number>[];
filteredList = list.filter(Boolean);
console.log(filteredList);
```

Works with strict null checks.

```typescript
let list = [1,2,3,4,null,7,null,9, 'yo'];
let filteredList: NonNullable<number>[];
// filteredList = list.filter<NonNullable<number>>(Boolean as any); // would remove nulls but allow strings
filteredList = list.filter<NonNullable<number>>(Boolean as any).filter(v => typeof v === 'number');
console.log(filteredList);
```

## BigInt

* https://www.smashingmagazine.com/2019/07/essential-guide-javascript-newest-data-type-bigint/

```typescript

  describe.each([
    [30, 1073741824, '000001000000000000000000000000000000'],
    [31, 2147483648, '000010000000000000000000000000000000'],
    [32, 4294967296, '000100000000000000000000000000000000'],
    [33, 8589934592, '001000000000000000000000000000000000'],
    [34, 17179869184, '010000000000000000000000000000000000'],
    [35, 34359738368, '100000000000000000000000000000000000'],
    // [36, 68719476736, '1000000000000000000000000000000000000'],
  ])(
    `JS large number math`,
    (pos: number, expectedResult: number, expectedBinaryString: string) => {
      test(`should return ${expectedResult}`, () => {
        // expect(1 << pos).toEqual(expectedResult); // after pos 30 next bit is negative and starts at 1
        expect(Math.pow(2, pos)).toEqual(expectedResult);
      });

      test(`convertToBinaryString(${expectedResult})`, () => {
        expect(expectedBinaryString.length).toBe(36);
        expect(convertToBinaryString(BigInt(expectedResult))).toBe(
          expectedBinaryString
        );
      });

      test(`parseInt`, () => {
        expect(parseInt(expectedBinaryString, 2)).toBe(expectedResult);
      });
    }
  );
```

## Binary & Bitwise

* https://medium.com/@LindaVivah/learn-how-to-read-binary-in-5-minutes-dac1feb991e
* https://lucasfcosta.com/2018/12/25/bitwise-operations.html
* https://blog.logrocket.com/interesting-use-cases-for-javascript-bitwise-operators/
* https://codeforwin.org/2018/05/10-cool-bitwise-operator-hacks-and-tricks.html
* https://www.alanzucconi.com/2015/07/26/enum-flags-and-bitwise-operators/
* https://graphics.stanford.edu/~seander/bithacks.html


Create a zero padded binary number.

```typescript
const convertToBinaryString = (num: bigint) =>
  num.toString(2).padStart(36, '0');
const num = 51331021;
console.log(convertToBinaryString(BigInt(num))) // 000000000011000011110011111111001101
```

Convert a binary string to number.

```typescript
console.log(parseInt("000000000011000011110011111111001101",2)) // 51331021
```

Set a bit for 32 bit signed int.

```typescript
1 << 4 // 16 or 000000000000000000000000000000010000
```

Get a bit at a location

```typescript
const getBit = (n: number, bitIndex:number) => {
    const bitMask = 1 << bitIndex;
    const result = n & bitMask;
    return result >>> bitIndex;
}


console.log(getBit(n,3)) // 0
console.log(getBit(n,4)) // 1
console.log(getBit(n, 5)) // 1
console.log(getBit(n, 6)) // 0
```

Turn on a bit

```typescript
const setBit = (n: number, bitIndex: number) => {
    const bitMask = 1 << bitIndex;
    return n | bitMask;
}

console.log(0b10110001.toString(2)) // 10110001
console.log(setBit(0b10110001,2).toString(2)) // 10110101
```

Clear a bit

```typescript
const clearBit = (n:number, bitIndex:number) => {
    const bitMask = ~(1 << bitIndex);
    return n & bitMask;
}

console.log(n.toString(2)) // 10110101
console.log(clearBit(n,2).toString(2)) // 10110001

```

Bitwise find in array

```typescript
const foundIndex = (index: number) => {
  return Boolean(~index);
}

console.log(foundIndex(arr.indexOf(9))); // false
console.log(foundIndex(arr.indexOf(100))); // false
console.log(foundIndex(arr.indexOf(3))); // true
```

Flags


```ts
let val = 0b0;

enum Flags {
  NONE = 0,
  SELF = 1,
  NEIGHBOR1 = 2,
  NEIGHBOR2 = 4,
  NEIGHBOR3 = 8,
  NEIGHBOR4 = 16,
  NEIGHBOR5 = 32,
  NEIGHBOR6 = 64,
  NEIGHBOR7 = 128,
  NEIGHBOR8 = 256,
  OTHERDATA = 512
}

const currentFlags = {
  self: 1,
  neighbor1: 0,
  neighbor2: 1,
  neighbor3: 1,
  neighbor4: 0,
  neighbor5: 1,
  neighbor6: 0,
  neighbor7: 0,
  neighbor8: 1,
  otherdata: 1
}

const getNeighborsMask = 0b0111111110;
	
const isEmpty = (v: number) => !(v > Flags.NONE);

console.log(`Initial value:  ${val} : `, val.toString(2), isEmpty(val));
console.log('');

console.log(`***** SETTING *****`);
// Setting
Object.entries(currentFlags).forEach(([_,v], i) => {
  val |= v << i
});
console.log(`  Final value: ${val} : `, val.toString(2), isEmpty(val));

console.log('');
console.log(`***** READING *****`);
// Reading
console.log(`self is : ${val & Flags.SELF}`);
console.log(`neighbor1 is : ${val & Flags.NEIGHBOR1}`);
console.log(`neighbor2 is : ${val & Flags.NEIGHBOR2}`);
console.log(`neighbor3 is : ${val & Flags.NEIGHBOR3}`);
console.log(`neighbor4 is : ${val & Flags.NEIGHBOR4}`);
console.log(`neighbor5 is : ${val & Flags.NEIGHBOR5}`);
console.log(`otherData is : ${val & Flags.OTHERDATA}`);

console.log('');
console.log(`     -----     `);
Object.keys(currentFlags).forEach((k, i) => {
  const key: string = k.toUpperCase();
  const flag: number = Flags[key];
  if (val & flag) {
    // console.log(`${i} bit is set.`)
    console.log(`${k} is set.`)
  } else {
        console.log(`${k} is not set.`)
  }
});

console.log('');
console.log(`     -----     `);
const cn = val & getNeighborsMask;
// console.log(`isAnyNeighborSet: `, val > Flags.SELF); // only if no other data type is after neighbors
console.log(`isAnyNeighborSet mask: `, !isEmpty(cn));

console.log('');
console.log(`***** UNSET *****`);

// unset neighbors only
Object.keys(currentFlags).forEach((k, i) => {
    const key: string = k.toUpperCase();
  const flag: number = Flags[key];
  if (flag > Flags.SELF && flag < Flags.OTHERDATA) {
    val &= (~(1 << i));
  }
})
console.log(`self is : ${val & Flags.SELF}`);
console.log(`neighbor1 is : ${val & Flags.NEIGHBOR1}`);
console.log(`neighbor2 is : ${val & Flags.NEIGHBOR2}`);
console.log(`neighbor3 is : ${val & Flags.NEIGHBOR3}`);
console.log(`neighbor4 is : ${val & Flags.NEIGHBOR4}`);
console.log(`neighbor5 is : ${val & Flags.NEIGHBOR5}`);
console.log(`otherData is : ${val & Flags.OTHERDATA}`);

const cn2 = val & getNeighborsMask;
// console.log(`isAnyNeighborSet: `, val > Flags.SELF); // only if no other data type is after neighbors
console.log(`isAnyNeighborSet mask: `, !isEmpty(cn2));
```



<details><summary><b>Output</b></summary>

```ts
"use strict";
let val = 0b0;
var Flags;
(function (Flags) {
    Flags[Flags["NONE"] = 0] = "NONE";
    Flags[Flags["SELF"] = 1] = "SELF";
    Flags[Flags["NEIGHBOR1"] = 2] = "NEIGHBOR1";
    Flags[Flags["NEIGHBOR2"] = 4] = "NEIGHBOR2";
    Flags[Flags["NEIGHBOR3"] = 8] = "NEIGHBOR3";
    Flags[Flags["NEIGHBOR4"] = 16] = "NEIGHBOR4";
    Flags[Flags["NEIGHBOR5"] = 32] = "NEIGHBOR5";
    Flags[Flags["NEIGHBOR6"] = 64] = "NEIGHBOR6";
    Flags[Flags["NEIGHBOR7"] = 128] = "NEIGHBOR7";
    Flags[Flags["NEIGHBOR8"] = 256] = "NEIGHBOR8";
    Flags[Flags["OTHERDATA"] = 512] = "OTHERDATA";
})(Flags || (Flags = {}));
const currentFlags = {
    self: 1,
    neighbor1: 0,
    neighbor2: 1,
    neighbor3: 1,
    neighbor4: 0,
    neighbor5: 1,
    neighbor6: 0,
    neighbor7: 0,
    neighbor8: 1,
    otherdata: 1
};
const getNeighborsMask = 0b0111111110;
const isEmpty = (v) => !(v > Flags.NONE);
console.log(`Initial value:  ${val} : `, val.toString(2), isEmpty(val));
console.log('');
console.log(`***** SETTING *****`);
// Setting
Object.entries(currentFlags).forEach(([_, v], i) => {
    val |= v << i;
});
console.log(`  Final value: ${val} : `, val.toString(2), isEmpty(val));
console.log('');
console.log(`***** READING *****`);
// Reading
console.log(`self is : ${val & Flags.SELF}`);
console.log(`neighbor1 is : ${val & Flags.NEIGHBOR1}`);
console.log(`neighbor2 is : ${val & Flags.NEIGHBOR2}`);
console.log(`neighbor3 is : ${val & Flags.NEIGHBOR3}`);
console.log(`neighbor4 is : ${val & Flags.NEIGHBOR4}`);
console.log(`neighbor5 is : ${val & Flags.NEIGHBOR5}`);
console.log(`otherData is : ${val & Flags.OTHERDATA}`);
console.log('');
console.log(`     -----     `);
Object.keys(currentFlags).forEach((k, i) => {
    const key = k.toUpperCase();
    const flag = Flags[key];
    if (val & flag) {
        // console.log(`${i} bit is set.`)
        console.log(`${k} is set.`);
    }
    else {
        console.log(`${k} is not set.`);
    }
});
console.log('');
console.log(`     -----     `);
const cn = val & getNeighborsMask;
// console.log(`isAnyNeighborSet: `, val > Flags.SELF); // only if no other data type is after neighbors
console.log(`isAnyNeighborSet mask: `, !isEmpty(cn));
console.log('');
console.log(`***** UNSET *****`);
// unset neighbors only
Object.keys(currentFlags).forEach((k, i) => {
    const key = k.toUpperCase();
    const flag = Flags[key];
    if (flag > Flags.SELF && flag < Flags.OTHERDATA) {
        val &= (~(1 << i));
    }
});
console.log(`self is : ${val & Flags.SELF}`);
console.log(`neighbor1 is : ${val & Flags.NEIGHBOR1}`);
console.log(`neighbor2 is : ${val & Flags.NEIGHBOR2}`);
console.log(`neighbor3 is : ${val & Flags.NEIGHBOR3}`);
console.log(`neighbor4 is : ${val & Flags.NEIGHBOR4}`);
console.log(`neighbor5 is : ${val & Flags.NEIGHBOR5}`);
console.log(`otherData is : ${val & Flags.OTHERDATA}`);
const cn2 = val & getNeighborsMask;
// console.log(`isAnyNeighborSet: `, val > Flags.SELF); // only if no other data type is after neighbors
console.log(`isAnyNeighborSet mask: `, !isEmpty(cn2));

```


</details>


<details><summary><b>Compiler Options</b></summary>

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "declaration": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": 2,
    "target": "ES2017",
    "jsx": "React",
    "module": "ESNext"
  }
}
```


</details>

**Playground Link:** [Provided](https://www.typescriptlang.org/play?#code/DYUwLgBAbghsEF4IAYBGyDcAoLIB2ArgLYQBiwMA5gM4QDeWEEAcgPLMCiiKANIxAGUOAGVLcAjHyacAkgHEAEgCFWAJXHcATFJYd5ytZu4AWHbMUrVAZm4AOM3otrjEgGwP9lgKzcr2-uYGqq7crqYBjkEA7BKa9hGearZaXu78rAAqChyqACIAghn53F7imlgAvjgAxgD2eNSQ1QQATi34YORUtEgMTNQgwABmAFwQkvx4IACWlAAWqLUt4mPIOlOzC0uaYxNMG-OLLVa76zOHS8arZ5tHXqeT51strtePt0tRb-tPR7YPTFqYDmIBaABMYGAYLtKjV6o0IJRwMxfktqABZGDUADW3DQyHEhKJhMwWAAkFg6g1INNqBwiAAHMAAT24AAooGNCERUKCAJSIAB8EAAhByIMKujQAHRsTh87CU+G1UDS4C1ShsgAGMjw0zA0zg0DgBBAYwgABI6LBgBUIGMtTxjcBpWBagIwC1pnhNZo+U7afSmcyOXA+QqlQ0VSA1Rq2QByeMRyPUaOxzVagBU2ezgg4GQyMmYcggOezWojAHpK4JwAafVhWKgAFYgapgaUdL0gahs5ptDpS6h86VDJYcGDVOZstkAbQA+jwoABdAMChDCvrOiAAHyQUAgAB5DxBppUI1TU6r1RmmKRvUabaaxlabXaHU6ba73Z7vb7-aedKMiyobAOGiqXmmN4Jkm2CQdecZZmWECqBw+S5EWJZlpmFbYNWKEgDAYJ-imUGIQMwyAfalrWkaABkZAUDKQiiBUuGkQhGYHM8Gi0tRr70Yx3SypEljiGxF7Kpx2rcUcRh8S+tHwAxQ4iYkqiaBJcFSTG0FarJSw2ApNE2hAKlMdQalONYWkcbpiEGS0LjGQJylCTKgSWMYtnwfZXGoi0PguUpZnuZZnlqF4Pk6em2pAiCLS5JCMBUYppnmcJmTZHkhT5LZdmxYmklRtJWpMOVAC0VVVeVTDsU2rbttK2IgMyvb9u0eCdBZI5ji0E5TjO2JrkK9D8JekAtcyYyNF6PrcNi34AKoMgyoIAMJYiAbIRkwE0QEMTFcsQvItNwQ6zlNy7YEw0xDBAoGhYdVACluTD4b5sVala0x2qg+pUQMHYVvwe0xXpVrYnafFA9KINMHagwDGNtW1Z9EN0FDVF4ECECw-DEBVBUybo3GRXaSVfnaqj1U1bV7H7dUeDcOliLIgFGJYtieE1qTGa0vkeDMiiHwtAI4AftukoWdKLGkAqED4fUwCsndEA4xA8WghAEJQhALJrVRMBDGA2uOdQBV6QLQsixcYvgBARBc5LIqBsBIZM+BcKU4VsGW4h2EQEtzBCBkpZluxWD4QQDQO+bmt4CrjYtm2HZTe1rSdd13S9eOk7Tmyw2nuum6gxA+1TTNv7zUgi1uita0tJtAw7Td5fwpAz2UMdPLa0gF1XW3atsl3EphbLIhiHRDGjyeqlZTkBRFK9ZfpUgbIAH5shox7F7thPnv7GYUfdwWs6pcvRT7emObxtBpYJqkReoV9XlT+kBfJ98mY-MvP5pDNwYOQCkZb+rlQpP1EmoKwr8yL+VFs5MBIUMoeSgaobygDr7ANFkFJB58-5oKipgt+X0taJWSqlH+bl55ZEXrlfKjM8BGH3IJJEYBbbPE5jiHm7csH82oILYWAVxZgElqZaWwk5YKyVonVW90NZkJ1hQg2IAjYmzNhzI+2prZCNFiIx2zsICOlFG7YMfYmHgSAA)

Easier to Read Binary Enums

```typescript
enum Flags {
  NONE = 0,
  SELF = 1 << 0,
  NEIGHBOR1 = 1 << 1,
  NEIGHBOR2 = 1 << 2,
  NEIGHBOR3 = 1 << 3,
  NEIGHBOR4 = 1 << 4,
}

// or, they are equivalent

enum Flags2 {
  NONE = 0,
  SELF = 1,
  NEIGHBOR1 = 2 ** 1,
  NEIGHBOR2 = 2 ** 2,
  NEIGHBOR3 = 2 ** 3,
  NEIGHBOR4 = 2 ** 4,
}

// original
enum Flags {
  NONE = 0,
  SELF = 1,
  NEIGHBOR1 = 2,
  NEIGHBOR2 = 4,
  NEIGHBOR3 = 8,
  NEIGHBOR4 = 16,
}
```

## Data Structures

- https://codeburst.io/array-vs-set-vs-map-vs-object-real-time-use-cases-in-javascript-es6-47ee3295329b

Map can be very fast.

### Set

* No duplicates
* Converting from array to set and vice versa is easy
* Large datasets can have a performance impact, usually very fast
* Values follow object equality rules

```typescript
type point = [number,number,number];
const testSet = new Set<point>();
const newPoint = [4,3,2] as point;
const points: point[] = [[0,1,1], [1,1,2], [3,1,1], [0,2,1], newPoint];
points.forEach((p) => {
    testSet.add(p);
})

console.log(testSet.size); // 5
console.log(testSet.has([1,1,2])); // object equality, false
console.log(testSet.has(newPoint)); // true
```

workaround for complex lookups
```typescript
type point = [number,number,number];
const testSet = new Set<string>();
const newPoint = [4,3,2] as point;
const points: point[] = [[0,1,1], [1,1,2], [3,1,1], [0,2,1], newPoint];
points.forEach((p) => {
    testSet.add(p.toString());
})

console.log(testSet.size); // 5
console.log(testSet.has([1,1,2].toString())); // true
console.log(testSet.has(newPoint.toString())); // true
```
