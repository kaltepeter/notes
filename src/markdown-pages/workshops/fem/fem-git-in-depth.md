title: Git In-Depth 
date: 2022-01-28
tags:
- course 
---

`echo 'Hello, World!' | git hash-object --stdiin` print git hash, uses SHA1
`echo 'blob 14\0Hello, World!' | openssl sha1` print same hash that git hash-object would
`echo `Hello, World!' | git hash-object -w --stdin` writes the blob to the git data store. 
`git cat-file -t <sha>` print type of content
`git cat-file -p <sha>` print the contents
`cat .git/refs/heads/master` prints sha1 of master HEAD
`cat ./git/HEAD` show current head
`git ls-files -s` show the fiels in the staging area
`git add -P` stage in chunks interactively
`git checkout <stash name> -- <filename>` checkout one file from stash, it will overwrite local changes


## Blob Storage

The first two chars of the hash are the directory in objects.
The rest is the filename

## Tree

Tree contains pointers using SHA1

## Configure

https://git.io/config-editor

https://git.io/use-less


