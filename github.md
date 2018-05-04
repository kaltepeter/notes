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



