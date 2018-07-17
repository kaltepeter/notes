# Github

Migrations: [https://help.github.com/enterprise/2.11/admin/guides/migrations/](https://help.github.com/enterprise/2.11/admin/guides/migrations/)

mirroring: [https://help.github.com/articles/duplicating-a-repository/](https://help.github.com/articles/duplicating-a-repository/)

[https://help.github.com/articles/about-github-mirrors/](https://help.github.com/articles/about-github-mirrors/)

### clean history

```
 git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA' \
--prune-empty --tag-name-filter cat -- --all
```

### p4merge

[https://gist.github.com/tony4d/3454372](https://gist.github.com/tony4d/3454372)

## bots and push

[https://platform.github.community/t/repositories-which-have-protected-branches-with-push-restrictions-have-no-ability-to-grant-push-rights-to-integrations/1376](https://platform.github.community/t/repositories-which-have-protected-branches-with-push-restrictions-have-no-ability-to-grant-push-rights-to-integrations/1376)

## mirror

## count lines of code

```
git ls-files | xargs wc -l
```

## monitoring

[https://github.com/vegasbrianc/github-monitoring](https://github.com/vegasbrianc/github-monitoring) - grafana montioring

## hooks

[https://github.com/typicode/husky/issues/124](https://github.com/typicode/husky/issues/124) - skipping hooks for CICD

## migrating directories with history

[http://gbayer.com/development/moving-files-from-one-git-repository-to-another-preserving-history/](http://gbayer.com/development/moving-files-from-one-git-repository-to-another-preserving-history/)

[http://blog.neutrino.es/2012/git-copy-a-file-or-directory-from-another-repository-preserving-history/](http://blog.neutrino.es/2012/git-copy-a-file-or-directory-from-another-repository-preserving-history/)

```
DESTINATIONPATH=~/tmp/mergepatchs
SOURCE=node
git format-patch -o $DESTINATIONPATH --root $SOURCE
```

cd to new repo

```
git checkout -b init
SOURCE=node
git am --ignore-space-change --ignore-whitespace --3way $DESTINATIONPATH/*.patch
```

fix diverged histories

```
git fetch upstream
git branch -u upstream/master

git rebase --onto upstream/master

# or

git pull --allow-unrelated-histories upstream master

```



