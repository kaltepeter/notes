---
title: Heroku
date: 2019-09-08
tags:
- platform
---

## Push single directory as app

https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f

```bash
heroku create ka-task-manager --remote heroku-task-manager
heroku git:remote -a ka-task-manager
git subtree push --prefix udemy/complete-nodejs-dev/task-manager heroku master
```
