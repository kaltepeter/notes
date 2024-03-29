---
title: Bash
date: 2019-10-09
tags:
  - nix
---

[https://stackoverflow.com/questions/17029902/using-curl-post-with-variables-defined-in-bash-script-functions](https://stackoverflow.com/questions/17029902/using-curl-post-with-variables-defined-in-bash-script-functions)

[https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash](https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash)

[http://goo.gl/ZThKCj](http://goo.gl/ZThKCj) - printing strings help

[http://goo.gl/HnPkiq](http://goo.gl/HnPkiq) - arithmetic operator

[http://goo.gl/g6xtca](http://goo.gl/g6xtca) - arrays

[http://goo.gl/xRHo3u](http://goo.gl/xRHo3u) - parameter expansion

[https://github.com/aperezdc/perezdecastro.org/blob/master/stash/using-boolean-variables-in-bash.markdown](https://github.com/aperezdc/perezdecastro.org/blob/master/stash/using-boolean-variables-in-bash.markdown) - flag variables in bourne shell

[https://kvz.io/blog/2013/11/21/bash-best-practices/](https://kvz.io/blog/2013/11/21/bash-best-practices/) - boiler plate and best practice guide

https://explainshell.com/explain - amazing visual explanation

### Bash 4

[http://clubmate.fi/upgrade-to-bash-4-in-mac-os-x/](http://clubmate.fi/upgrade-to-bash-4-in-mac-os-x/)

Post upgrade to use bash 4 in script. change shebang line

`#!/usr/local/bin/bash`

**Configure terminal to use it**

```text
# Add the new shell to the list of allowed shells
sudo bash -c 'echo /usr/local/bin/bash >> /etc/shells'
# Change to the new shell
chsh -s /usr/local/bin/bash
```

## sed

appending newlines with mac: [https://stackoverflow.com/questions/16576197/how-to-add-new-line-using-sed-mac](https://stackoverflow.com/questions/16576197/how-to-add-new-line-using-sed-mac)

```text
echo foo | sed 's/f/f\'$'\n/'
```

```text
tokens=$(echo "$tokens" | sed ' /^[[:space:]]*}/a \
 \
  ')
```

```text
tokens=$(echo "${tokens}" | sed ' /^\s*$/d;s/},/}/;s/}/}\'$'\n\\\n/; ')
```

[https://lists.freebsd.org/pipermail/freebsd-questions/2009-March/194500.html](https://lists.freebsd.org/pipermail/freebsd-questions/2009-March/194500.html) - example to safe replace with newlines

```text
a="This
 is
 the
 input
 from the
 web server"
b=`echo $a`
sed "s/foo/$b/"
```

[https://taoofmac.com/space/cli/sed](https://taoofmac.com/space/cli/sed) - examples

[https://stackoverflow.com/questions/29613304/is-it-possible-to-escape-regex-metacharacters-reliably-with-sed](https://stackoverflow.com/questions/29613304/is-it-possible-to-escape-regex-metacharacters-reliably-with-sed) - more whitespacing issues

## awk

```text
echo "${tokens}" | awk 'BEGIN { RS=""; FS=/,/; }; $0 ~ "jane@github.com" { print }'
```

## escaping quotes

[https://stackoverflow.com/questions/13799789/expansion-of-variable-inside-single-quotes-in-a-command-in-bash](https://stackoverflow.com/questions/13799789/expansion-of-variable-inside-single-quotes-in-a-command-in-bash)

wrap with single quote and expand variable

```text
grep '^'"${APP_NAME}"''
```

## args and help

[https://argbash.io/generate](https://argbash.io/generate)

[http://spf13.com/post/easy-bash-scripting-with-shflags/](bash.md) - documentation module

#### shflags

[https://github.com/kward/shflags](https://github.com/kward/shflags)

**Install**

1. Download
2. link to path

   ```text
   ln ~/data/tools/shflags-1.2.2/shflags /usr/local/bin/shflags
   ```

3. execute

## lint/static analysis

[https://github.com/koalaman/shellcheck](https://github.com/koalaman/shellcheck)

```text
brew install shellcheck
```

execute

```text
shellcheck script.sh
```

## list directory structure

https://stackoverflow.com/questions/3455625/linux-command-to-print-directory-structure-in-the-form-of-a-tree

```bash
ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'
```

outputs

```bash
   |-jobs
   |---PCF-Upgrade
   |-----jobs
   |-------Bulk-Build-Pipelines
   |---------jobs
```

count directories

```bash
ls -R | grep ":$" | wc -l
```

show structure

```bash
ls -la | xargs ls -la \{\}
ls -lrt -d -1 $PWD/* | xargs ls -la \{\}
```

find by dir name

```bash
find . -type d -name builds -exec rm -rf {} \;
```

find string in directory

```bash
grep -rnw /var/lib/jenkins -e 'utils/util'
```

## delete fast

https://www.kinamo.be/en/support/faq/efficiently-remove-a-zillion-files-on-linux-servers

```bash
rsync -a --delete empty_dir/ dir_to_delete
```

## move vs. copy vs. delete

cp -> slow

mv -> faster

delete -> fast as mv

mv (rename in place) -> fastest

## cli inputs / help

https://github.com/kward/shflags/wiki/Documentation12x

## styleguide

https://google.github.io/styleguide/shell.xml#Builtin_Commands_vs._External_Commands

https://www.chromium.org/chromium-os/shell-style-guidelines#TOC-Default-Assignments

## colors

https://misc.flogisoft.com/bash/tip_colors_and_formatting

## use python to get json value

```
DOMAIN_NAME=$(curl -s http://localhost:4040/api/tunnels/jenkins | python -c 'import sys, json; print json.load(sys.stdin)["public_url"]' | sed 's/http:\/\/\(.*\)/\1/')
```

## colors

https://misc.flogisoft.com/bash/tip_colors_and_formatting

## rerun with sudo

```bash
sudo !!
```

## Generating a Sequence for Output

I needed to execute several scripts in terminal tabs, this made that easier.

```bash
#!/usr/bin/env bash
set -o nounset
set -o errexit
set -o pipefail
DEBUG="${DEBUG:-false}"
[[ ${DEBUG} == true ]] && set -o xtrace

start_num=50000
end_num=90000
increment=10000

for ((i=start_num; i<=end_num; i+=increment)); do
    finish=$((i+increment))
#    echo "start: $i, finish ${finish}"
    echo "time bundle exec rails 'one_time:preprocess_active_storage_for_users_and_companies[${i},${finish},100]'"
done
```
