# node

## generators

### npm init

simple and built in

[https://docs.npmjs.com/cli/init](https://docs.npmjs.com/cli/init)

[https://github.com/npm/init-package-json](https://github.com/npm/init-package-json)

`npm init <initializer>`can be used to set up a new or existing npm package.

`initializer`in this case is an npm package named`create-<initializer>`, which will be installed by[`npx`](https://docs.npmjs.com/cli/npx), and then have its main bin executed -- presumably creating or updating`package.json`and running any other initialization-related operations.



### testing locally

#### using local npm server

https://blog.strapi.io/testing-npm-package-before-releasing-it-using-verdaccio-and-ngrok

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

#### npm link FTW

with typescript watch. it will auto build and link is still good

```javascript
"name": "@scope/create-myapp",
"version": "1.0.0",
"description": "starter template for building deliverable apps/libs",
"bin": {
  "create-myapp": "./dist/index.js"
},
"scripts": {
     "watch": "npm run build -- -w"
}
```

```bash
npm run watch
npm link

# from anywhere else use a cli app
create-myapp <args> [options]
```

## shell, exec, execFile, fork

https://zaiste.net/nodejs-child-process-spawn-exec-fork-async-await/

https://nodejs.org/api/child_process.html

### exec example

```javascript
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const getVars = async () => {
    const getVar = async (varName) => {
        const { stdout, stderr } = await exec(`zsh -c '. ~/.zshrc; echo $${varName}'`);
        if (stderr) return reject(stderr);
        return stdout.toString().trim();
    };

    const [currentThemeRes, zshCustomRes] = await Promise.all(
        [getVar('ZSH_THEME'), getVar('ZSH_CUSTOM')]);
    return [currentThemeRes, zshCustomRes];
};

try {
  const [currentTheme, zshCustom] = await getVars();
  console.log(`vars: ${currenttheme} ${zshCustom}`)
} catch(err) {
  console.log('err: ', err);
}
```

## fs

https://dev.to/mrm8488/from-callbacks-to-fspromises-to-handle-the-file-system-in-nodejs-56p2

## nvm


