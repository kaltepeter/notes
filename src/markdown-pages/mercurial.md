---
title: Mercurial
date: 2018-10-21
tags:
  - DVCS
---

## migrating to git

https://git-scm.com/book/en/v2/Git-and-Other-Systems-Migrating-to-Git

```bash
git clone https://github.com/frej/fast-export.git
hg clone <remote repo URL> /tmp/hg-repo
cd /tmp/hg-repo
hg log | grep user: | sort | uniq | sed 's/user: *//' > ../authors
git init /tmp/converted
cd /tmp/converted
/tmp/fast-export/hg-fast-export.sh -r /tmp/hg-repo -A /tmp/authors
# hg log | grep user: | sort | uniq | sed 's/user: *//' | sed 's/\(.*\) \(<.*>\)/"\1 \2"="\1 \2"/' > ../authors
git shortlog -sn
git remote add origin git@my-git-server:myrepository.git
git push origin --all
```
