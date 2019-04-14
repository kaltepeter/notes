# mac

## cleanup disk space, old stuffs

https://tomodwyer.com/post/2017-02-19-useful-homebrew-commands/

brew. old files can take up a lot of space

*TIP*: run upgrade first so it cleans old files and updates

upgrade all and cleanup

```bash
brew outdated | awk '{print $1;}' | xargs brew upgrade --cleanup
```

```bash
# dry run
brew cleanup -n
# run
brew cleanup
brew prune
```

```bash
# remove package
brew rm pandoc
```

install latest and remove older

```bash
brew upgrade --cleanup pandoc
```

## useful tools

https://pandoc.org/demos.html

```bash
brew install pandoc
```

## rename files with .js to .tsx

```bash
find ./src -name "*.js" -exec bash -c 'git mv "$1" "${1%.js}".tsx' - '{}' \;
```
