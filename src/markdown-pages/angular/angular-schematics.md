---
title: Angular Schematics
date: 2021-01-13
tags:
- ui
- framework
---

[https://astexplorer.net/](https://astexplorer.net/) - ast explorer

https://stackoverflow.com/questions/51610745/nrwl-nx-workspace-specific-schematics - running a collection in a workspace

https://auth0.com/blog/create-custom-schematics-with-nx/ - nx workspace tutorial

https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2 - introduction

https://www.softwarearchitekt.at/aktuelles/generating-custom-code-with-the-angular-cli-and-schematics/ - deep dive

https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4 - total walkthrough from 0

5 part series: https://www.angulararchitects.io/post/2017/10/29/generating-custom-code-with-the-angular-cli-and-schematics.aspx

https://www.angulararchitects.io/aktuelles/automating-your-angular-architecture-with-workspace-schematics-part-1-rules-and-parameters/

How to extend: https://medium.com/@michael.warneke/merging-custom-angular-schematics-c14a303f63b6

best practices: https://brenden.codes/posts/angular-schematics-best-practices/

https://dev.to/steveblue/build-angular-like-an-architect-part-1-3ph2

## example repos

https://github.com/nrwl/nx/blob/master/packages/angular/src/schematics/application/schema.json

https://github.com/mauriziovitale/angular-plugins/blob/master/libs/lite-serve/src/builders/lite-serve/schema.json

## workspace schematics

`ng g workspace-schematic demo-lib`

## types

`npm i --save-dev json-schema-to-typescript`

json-schema-to-ts.js

```
const toTypeScript = require('json-schema-to-typescript');
const fs = require('fs');

toTypeScript
    .compileFromFile('tools/schematics/domain/schema.json')
    .then(ts => fs.writeFileSync('tools/schematics/domain/schema.ts', ts));
```

npm script: `"build:schema": "node tools/schematics/json-schema-to-ts.js"`

Call existing rules:

```
return chain([
    externalSchematic('@nrwl/angular', 'lib', {
      name: 'domain',
      directory: options.name,
      tags: `domain:${options.name},type:domain-logic`,
      style: 'scss',
    }),
    (!options.addApp) ? 
      noop() : 
      externalSchematic('@nrwl/angular', 'app', {
        name: options.name,
        tags: `domain:${options.name},type:app`,
        style: 'scss',
      }),
  ]);
```

calling: `nx workspace-schematic domain ordering --add-app`