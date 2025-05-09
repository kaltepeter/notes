---
title: GitHub
date: 2020-08-21
tags:
  - DVCS
---

Migrations: [https://help.github.com/enterprise/2.11/admin/guides/migrations/](https://help.github.com/enterprise/2.11/admin/guides/migrations/)

mirroring: [https://help.github.com/articles/duplicating-a-repository/](https://help.github.com/articles/duplicating-a-repository/)

[https://help.github.com/articles/about-github-mirrors/](https://help.github.com/articles/about-github-mirrors/)

### clean history

```text
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

```text
git ls-files | xargs wc -l
```

## monitoring

[https://github.com/vegasbrianc/github-monitoring](https://github.com/vegasbrianc/github-monitoring) - grafana montioring

## hooks

[https://github.com/typicode/husky/issues/124](https://github.com/typicode/husky/issues/124) - skipping hooks for CICD

<https://github.com/github/platform-samples/tree/master/pre-receive-hooks>

<https://proandroiddev.com/ooga-chaka-git-hooks-to-enforce-code-quality-11ce8d0d23cb>

<https://githooks.com/>

<https://github.com/git/git/tree/master/templates>

## migrating directories with history

[http://gbayer.com/development/moving-files-from-one-git-repository-to-another-preserving-history/](http://gbayer.com/development/moving-files-from-one-git-repository-to-another-preserving-history/)

[http://blog.neutrino.es/2012/git-copy-a-file-or-directory-from-another-repository-preserving-history/](http://blog.neutrino.es/2012/git-copy-a-file-or-directory-from-another-repository-preserving-history/)

<https://bneijt.nl/blog/merge-a-subdirectory-of-another-repository-with-git/>

```text
DESTINATIONPATH=~/tmp/mergepatchs
SOURCE=node
git format-patch -o $DESTINATIONPATH --root $SOURCE
```

cd to new repo

```text
git checkout -b init
SOURCE=node
git am --ignore-space-change --ignore-whitespace --3way $DESTINATIONPATH/*.patch
```

fix diverged histories

```text
git fetch upstream
git branch -u upstream/master

git rebase --onto upstream/master

# or

git pull --allow-unrelated-histories upstream master
```

#### restore deleted file

[https://stackoverflow.com/questions/953481/find-and-restore-a-deleted-file-in-a-git-repository?rq=1](https://stackoverflow.com/questions/953481/find-and-restore-a-deleted-file-in-a-git-repository?rq=1)

```text
git rev-list -n 1 HEAD -- <path>
git checkout <deleting_commit>^ -- <file_path>
# git checkout $(git rev-list -n 1 HEAD -- "$file")^ -- "$file"
# git checkout $(git rev-list -n 1 HEAD -- "$file")~1 -- "$file"
```

### pages

[http://mgreau.com/posts/2016/03/28/asciidoc-to-gh-pages-with-travis-ci-docker-asciidoctor.html](http://mgreau.com/posts/2016/03/28/asciidoc-to-gh-pages-with-travis-ci-docker-asciidoctor.html)

#### using gitbook cli

[https://toolchain.gitbook.com/setup.html](https://toolchain.gitbook.com/setup.html)

Great for local writing and serving.

All i needed was:

```text
gitbook build
gitbook serve
```

## tips and tricks

<http://blog.virtuacreative.com.br/markdown-tips-tricks-part2.html> - Markdown Tips & Tricks - Part 2

```text
[![Dr. Nicole Forsgren](https://i1.ytimg.com/vi/R9izKUqPCiU/maxresdefault.jpg)](https://www.youtube-nocookie.com/embed/R9izKUqPCiU?start=1019 "Devops/JenkinsWorld Closing Keynote")
```

{% embed data="{\"url\":\"<http://www.getyoutubevideothumbnail.com\",\"type\":\"link\",\"title\":\"Get> Free YouTube Video Thumbnail Image \| YouTube Video Thumbnail Image \| YouTube Thumbnail Image Downloader\",\"icon\":{\"type\":\"icon\",\"url\":\"<http://www.getyoutubevideothumbnail.com/favicon.ico\",\"aspectRatio\":0}}>" %}

{% embed data="{\"url\":\"<http://www.getyoutubevideothumbnail.com/add-play-button-to-image\",\"type\":\"link\",\"title\":\"Add> Play Button to Image Online \| Add Play Button to YouTube Video Thumbnail Image Online \| play button image\",\"description\":\"add play button to image, play button image, play button on image, add play button to image online, youtube thumbnail generator with play button, play button overlay,transparent play button overlay, overlay play button on image, video play button overlay, add play button to image\",\"icon\":{\"type\":\"icon\",\"url\":\"<http://www.getyoutubevideothumbnail.com/favicon.ico\",\"aspectRatio\":0}}>" %}

<https://www.markdownguide.org/cheat-sheet>

## hooks

<https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks>

## submodulees

<https://github.blog/2016-02-01-working-with-submodules/>

## diff

using vimidff: <https://www.rosipov.com/blog/use-vimdiff-as-git-mergetool/>

## ssh

### use custom ssh id file

<https://superuser.com/questions/232373/how-to-tell-git-which-private-key-to-use>

```bash
host github.com
 HostName github.com
 IdentityFile ~/.ssh/id_rsa_github
 User git

chmod 400 ~/.ssh/id_rsa_github
```

## actions

<https://github-actions-hero.now.sh/> - interactive learning

lab.github.com

## GraphQL

- [GitHub GraphQL Schema Validation](https://www.npmjs.com/package/@octokit/graphql-schema)
- [Adding Typescript Types to GitHub's GraphQL API](https://benlimmer.com/2020/05/16/adding-typescript-types-github-graphql-api/)
