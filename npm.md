# NPM

Get the npm location

```
npm root
```

Get the npm location for globals - regardless of current workspace

```
npm root -g
```

with docker

[https://github.com/nodejs/docker-node](https://github.com/nodejs/docker-node)

Run local package

[https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

```
npx ng
```

> But wait! npx has yet another trick up its sleeve: when you use the
>
> `-c`
>
> option, the script written inside the string argument will have full access to the same env variables as a regular run script!

```
npx -c ng
```



