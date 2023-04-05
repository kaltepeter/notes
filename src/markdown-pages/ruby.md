---
title: Ruby
date: 2021-01-14
tags:
- language
---

### command line apps

[http://blog.honeybadger.io/writing-command-line-apps-in-ruby/](http://blog.honeybadger.io/writing-command-line-apps-in-ruby/) - tutorial on command line apps in ruby

[http://culttt.com/2015/07/01/creating-and-using-modules-in-ruby/](http://culttt.com/2015/07/01/creating-and-using-modules-in-ruby/) - using ruby modules

[http://www.stuartellis.name/articles/rake/\#using-other-ruby-libraries-in-rake-tasks](http://www.stuartellis.name/articles/rake/#using-other-ruby-libraries-in-rake-tasks) - rake tasks

[https://apidock.com/ruby/OptionParser](https://apidock.com/ruby/OptionParser) - options parser doc

### GSUB

[https://stackoverflow.com/questions/16579223/using-named-capture-groups-inside-ruby-gsub-blocks-regex](https://stackoverflow.com/questions/16579223/using-named-capture-groups-inside-ruby-gsub-blocks-regex) - capture groups in gsub

### RVM

update rvm

```text
rvm get stable --auto-dotfiles
```

list known ruby versions

```text
rvm list known
```

list installed

```text
rvm list
```

install ruby

```text
rvm install ruby-2.5.1 # version 2.5.1
rvm install ruby --latest # latest stable version
```

create ruby-version

```text
rvm --ruby-version use 2.5.1@my_app --create
```

install bundler && init

```text
gem install bundler
bundle init
```

adding dependencies

```text
bundle add pkg-config --version="~> 1.1"
```

### dockerizing

[Dockerizing Ruby Application](https://blog.kontena.io/dockerizing-ruby-application/)

```text
FROM ruby:2.5.1-alpine
ADD Gemfile /app/
ADD Gemfile.lock /app/
RUN apk --update add --virtual build-dependencies ruby-dev build-base && \
    gem install bundler --no-ri --no-rdoc && \
    cd /app ; bundle install --without development test && \
    apk del build-dependencies
ADD . /app
RUN chown -R nobody:nogroup /app
USER nobody
ENV RACK_ENV production
EXPOSE 9292
WORKDIR /app
```

https://medium.com/magnetis-backstage/how-to-cache-bundle-install-with-docker-7bed453a5800 - How to cache bundle install with Docker: While dockerizing a Rails app, the first problem that comes out is the slow bundle install command while building the app’s image.

[https://github.com/BretFisher/jekyll-serve/blob/master/Dockerfile](https://github.com/BretFisher/jekyll-serve/blob/master/Dockerfile) - working with jekyll

## IDE Support

## VSCode

https://medium.com/better-programming/code-like-a-pro-tooling-to-supercharge-vs-code-for-ruby-bf2ae61df5e3

1. Install vscode extensions:

    - [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby): `rebornix.ruby`
    - [Ruby Language Colorization](https://marketplace.visualstudio.com/items?itemName=groksrc.ruby): `groksrc.ruby`
    - [Ruby Solargraph](https://marketplace.visualstudio.com/items?itemName=castwide.solargraph): `castwide.solargraph`
    - [VSCode Ruby](https://marketplace.visualstudio.com/items?itemName=wingrunr21.vscode-ruby): `wingrunr21.vscode-ruby` - this comes with another plugin as a dependency

1. Install two global gems. These are used by the IDE and have trouble using project level rvn installs.

    ```bash
    rvm @global do bundle update
    rvm @global do gem install rubocop
    rvm @global do gem install solargraph
    ```

1. Configure VSCode User Settings:

    ```json
    "ruby.codeCompletion": "rcodetools",
    "ruby.format": "rubocop",
    "ruby.intellisense": "rubyLocate",
    "ruby.useBundler": true, //run non-lint commands with bundle exec
    "ruby.useLanguageServer": true, // use the internal language server (see below)
    "ruby.lint": {
        "rubocop": {
        "useBundler": true // enable rubocop via bundler
        },
        "reek": {
        "useBundler": true // enable reek via bundler
        }
    }
    ```

1. Restart IDE

## Style and Lint

https://rubystyle.guide/#guiding-principles

### Enforcing with rubocop

https://docs.rubocop.org/rubocop/0.87/index.html

https://medium.com/@kirill_shevch/lint-your-ruby-code-with-overcommit-and-static-analysis-tools-bd36d3147d2e

1. Add these gems to your project.

    ```ruby
        gem 'debase', '~> 0.2.1', group: :development
        gem 'overcommit', '~> 0.54.0'
        gem 'rubocop', require: false
    ```

    Run

    ```bash
    bundle install
    ```

1. Configure IDE

1. Setup overcommit

    ```bash
    overcommit --install
    overcommit --sign
    ```

1. Setup rubocop

    ```bash
    rubocop --auto-gen-config
    rubocop -a -x
    ```

1. Edit overcommit config, enable rubocop

    ```yaml
    PreCommit:
      RuboCop:
        enabled: true
    ```

1. Hooks will now run on commits

## Files, I/O

- https://medium.com/@jagiweb/how-to-read-write-files-in-ruby-8201fb77c2d4

## Blocks, Procs & Lamdas

- https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/#Lambdas_vs_Procs

## Special operators

- https://dev.to/junko911/ruby-iteration-shortcut-with-ampersand-operator-923 - `&:`

```ruby
[[1,2,3,4],[1,2,3,4],[1,2,3,4]].map(&:join)
#  => ["1234", "1234", "1234"]

# same as:
[[1,2,3,4],[1,2,3,4],[1,2,3,4]].map { |v| v.join('') }
#  => ["1234", "1234", "1234"]
```

## Printing

`puts`

- Special side effect of returning nil after printing
- Adds newline
- `puts "yo".inspect` is the same as `p "yo"` and will return the value after printing

`print`

- print string without extra line

`inspect` returns a string of the object

## Method Conventions

`?` methods that end in ? return a boolean

## Control Flow

`if`, `else`, `elsif` basic if
`puts "Strings are empty" if x.empty?` inline if statement

## Boolean

`!`, `!!`, `&&`, `||` boolean tests
`!!nil` will return false, it is the only object that will do that
`!!0` will return true, like most

## symbols and hash rocket

`:name` is a symbol
`name:` is only valid in a literal hash
`{ :name => 'blah'}` is the hash rocket syntax
`{ name: 'blah' }` is a literal hash
`"data-turbo-track": "reload"` and `{ "data-turbo-track": "reload" }` are same, `{}` are optional, like parenthesis

## Whitespace

Ruby doesn't distinguish between whitespace and others like '\n', you can break lines on char length

## Classes

`<` inheritance
`self` is optional in a class.

## Lambda

`->` stabby lambda

```ruby
-> { puts "foo" } # proc output
-> { puts "foo" }.call # foo, returns nil
```
