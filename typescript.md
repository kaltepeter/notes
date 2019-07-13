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