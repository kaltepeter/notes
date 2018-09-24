# ruby

### command line apps

[http://blog.honeybadger.io/writing-command-line-apps-in-ruby/](http://blog.honeybadger.io/writing-command-line-apps-in-ruby/) - tutorial on command line apps in ruby

[http://culttt.com/2015/07/01/creating-and-using-modules-in-ruby/](http://culttt.com/2015/07/01/creating-and-using-modules-in-ruby/) - using ruby modules

[http://www.stuartellis.name/articles/rake/\#using-other-ruby-libraries-in-rake-tasks](http://www.stuartellis.name/articles/rake/#using-other-ruby-libraries-in-rake-tasks) - rake tasks

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
rvm install ruby-2.5.1    
```

create ruby-version

```text
rvm --ruby-version use 2.5.1@my_app
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

{% embed data="{\"url\":\"https://blog.kontena.io/dockerizing-ruby-application/\",\"type\":\"link\",\"title\":\"Dockerizing Ruby Application\",\"description\":\"Containers are great and they are gaining more popularity all the time. It’s replacing virtualization by removing hypervisor layer and allowing to run isolated container processes on the shared kernel instead \(Image 1\). The most important benefit of containers is a start time. While a full virtualized system usually\",\"icon\":{\"type\":\"icon\",\"url\":\"https://blog.kontena.io/favicon.png\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://blog.kontena.io/content/images/2016/06/17207132758\_6c89df1360\_o-2.jpg\",\"width\":1024,\"height\":683,\"aspectRatio\":0.6669921875}}" %}

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

{% embed data="{\"url\":\"https://medium.com/magnetis-backstage/how-to-cache-bundle-install-with-docker-7bed453a5800\",\"type\":\"link\",\"title\":\"How to cache bundle install with Docker\",\"description\":\"While dockering a Rails app, the first problem that comes out is the slow bundle install command while building the app’s image.\",\"icon\":{\"type\":\"icon\",\"url\":\"https://cdn-images-1.medium.com/fit/c/304/304/1\*VK-kp1F25uS52edx5GwEdQ.png\",\"width\":152,\"height\":152,\"aspectRatio\":1},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://cdn-images-1.medium.com/max/2000/1\*zJ1bSOdQOf35dMOP1atQYA.jpeg\",\"width\":2000,\"height\":1333,\"aspectRatio\":0.6665}}" %}

```text

```

working with jekyll

[https://github.com/BretFisher/jekyll-serve/blob/master/Dockerfile](https://github.com/BretFisher/jekyll-serve/blob/master/Dockerfile)

