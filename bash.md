# Bash

[https://stackoverflow.com/questions/17029902/using-curl-post-with-variables-defined-in-bash-script-functions](https://stackoverflow.com/questions/17029902/using-curl-post-with-variables-defined-in-bash-script-functions)

[https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash](https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash)

[http://goo.gl/ZThKCj](http://goo.gl/ZThKCj) - printing strings help

[http://goo.gl/HnPkiq](http://goo.gl/HnPkiq) - arithmetic operator

[http://goo.gl/g6xtca](http://goo.gl/g6xtca) - arrays

[http://goo.gl/xRHo3u](http://goo.gl/xRHo3u) - parameter expansion

[https://github.com/aperezdc/perezdecastro.org/blob/master/stash/using-boolean-variables-in-bash.markdown](https://github.com/aperezdc/perezdecastro.org/blob/master/stash/using-boolean-variables-in-bash.markdown) - flag variables in bourne shell

### Bash 4

[http://clubmate.fi/upgrade-to-bash-4-in-mac-os-x/](http://clubmate.fi/upgrade-to-bash-4-in-mac-os-x/)

Post upgrade to use bash 4 in script. change shebang line

`#!/usr/local/bin/bash`

##### Configure terminal to use it

```
# Add the new shell to the list of allowed shells
sudo bash -c 'echo /usr/local/bin/bash >> /etc/shells'
# Change to the new shell
chsh -s /usr/local/bin/bash
```

## sed

appending newlines with mac: [https://stackoverflow.com/questions/16576197/how-to-add-new-line-using-sed-mac](https://stackoverflow.com/questions/16576197/how-to-add-new-line-using-sed-mac)

```
echo foo | sed 's/f/f\'$'\n/'
```

```
tokens=$(echo "$tokens" | sed ' /^[[:space:]]*}/a \
 \
  ')
```

https://taoofmac.com/space/cli/sed - examples



