# node

## generators

### npm init

simple and built in

[https://docs.npmjs.com/cli/init](https://docs.npmjs.com/cli/init)

[https://github.com/npm/init-package-json](https://github.com/npm/init-package-json)

`npm init <initializer>`can be used to set up a new or existing npm package.

`initializer`in this case is an npm package named`create-<initializer>`, which will be installed by[`npx`](https://docs.npmjs.com/cli/npx), and then have its main bin executed -- presumably creating or updating`package.json`and running any other initialization-related operations.



### testing locally

{% embed data="{\"url\":\"https://blog.strapi.io/testing-npm-package-before-releasing-it-using-verdaccio-and-ngrok/\",\"type\":\"link\",\"title\":\"Testing your npm package before releasing it using Verdaccio + ngrok\",\"description\":\"Making sure that your npm package works as expected after publishing on npm can be a nightmare. Since it can have several different working environments, it may behave differently on your machine than on a server. Actually, fixing a bug involves publishing again your package thus bumping up its version\",\"icon\":{\"type\":\"icon\",\"url\":\"https://blog.strapi.io/favicon.ico\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"http://blog.strapi.io/content/images/2018/01/strapi-sinopia.png\",\"width\":1420,\"height\":640,\"aspectRatio\":0.4507042253521127}}" %}

```text
npm install -g verdaccio  
verdaccio

npm adduser --registry  http://localhost:4873  
```

add to package.json

```text
  "publishConfig": {
    "registry": "http://localhost:4873"
  },
```

run

```text
npm publish
```



