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

* https://lucasfcosta.com/2018/12/25/bitwise-operations.html
* https://blog.logrocket.com/interesting-use-cases-for-javascript-bitwise-operators/


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