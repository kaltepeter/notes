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



