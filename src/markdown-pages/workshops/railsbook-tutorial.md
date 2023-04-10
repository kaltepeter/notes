---
title: Rails Tutorial
date: 2023-03-29
tags:
- tutorial
---

- [Rails Book Tutorial](https://www.railstutorial.org/book)

## Tools

- Cloud 9. Visit https://console.aws.amazon.com/ and search for cloud 9 for online environment
- Heroku. Login:

## Ruby on Rails

`echo "gem: --no-document" >> ~/.gemrc` save time by skipping downloading docs
`gem install rails -v 7.0.4` install rails, particular version
`gem install bundler -v 2.3.14` install bundler, particular version
`source <(curl -sL https://cdn.learnenough.com/resize)` resize cloud9 vm
`rails _7.0.4_ new hello_app --skip-bundle` create app but allow for gemfile modifications. You can edit the gemfile versions before continuing.
`bundle _2.3.14_ install` run install
`rails server` or `rails s` start the server.

For cloud9 make sure to edit the development environment config and add:

```ruby
  config.hosts.clear
  config.web_console.whitelisted_ips = [<your_ip>]
```

`git config --global init.defaultBranch main` set default branch name
`git config --global credential.helper "cache --timeout=86400"` set login cache time for easy use in cloud9
`git branch -M main` set the main branch

building without production gems

```bash
bundle _2.3.14_ config set --local without 'production'
bundle _2.3.14_ install
bundle _2.3.14_ lock --add-platform x86_64-linux
source <(curl -sL https://cdn.learnenough.com/heroku_install) # install heroku
```

`heroku login -i` login on the cloud app
`git push heroku main` push branch up to heroku
`heroku logs` show logs
`herokue app:info` get app info

`rails generate scaffold User name:string email:string` scaffold users
`rails db:migrate` apply db changes
`heroku run rails db:migrate` migrate db in heroku
`heroku logs --tail` watch logs
`rails destroy controller StaticPages home help` remove a controller
`rails destroy model User` remove a user
`rails db:rollback` rollback migration

## ERB

`<% ... %>` executes code
`<%= ... %>` executes and inserts
`<%= yield %>` inserts page contents

test_helper.rb

```ruby
require "minitest/reporters"
Minitest::Reporters.use!
```

`bundle _2.3.14_ exec guard init` add guard to watch tests
`bundle _2.3.14_ exec guard` run guard

For Cloud9, edit `~/.irbrc`:

```
IRB.conf[:PROMPT_MODE] = :SIMPLE
IRB.conf[:AUTO_INPUT_MODE] = false
```

`rails c` open IRB

`attr_accessor :name, :email` adds getter and setter to the class
`@name` is an instance var

<https://en.wikipedia.org/wiki/Active_record_pattern>
<https://sqlitebrowser.org/>

`brew install --cask db-browser-for-sqlite` install sqlite browser

`rails console --sandbox` load console in a sandbox, any modficaitons are rolled back on exit

DB migrations

The rails way is to generate a migraion: `rails generate migration add_index_to_users_email`

`self.email = email.downcase` is ok, `email = email.downcase` is not. Assignment requires self, the value does not

`heroku run rails db:migrate` production db migrate
`heroku run rails console --sandbox` run the rails console on production heroku

`<%= debug(params) if Rails.env.development? %>` debug params
`rails server --environment production` run production
`rails db:migrate RAILS_ENV=production` migrate production

<https://stackoverflow.com/questions/941594/understanding-the-rails-authenticity-token>

`assert_no_difference` use for db testing, more idiomatic

concerns are a way of mixing in functionality.

<https://www.akshaykhot.com/how-rails-concerns-work-and-how-to-use-them/>

[session fixation](https://guides.rubyonrails.org/security.html#session-fixation) use `reset_session` to avoid

`@current_user = @current_user || User.find_by(id: session[:user_id])` and `@current_user ||= User.find_by(id: session[:user_id])` are the same, the latter is more idiomatic

`rails importmap:install turbo:install stimulus:install` usually run automatically but we skipped with `--skip-bundle`

`user&.authenticate` safe navigation operator

`unless @user == current_user` is the same as `unless current_user?(@user)`, the latter is more idiomatic and expressive

```bash
rails db:migrate:reset
rails db:seed
```

```ruby
user.microposts.build(arg) # more idiomatic, through relationship
user.microposts.find_by(id: 1)
```

`build` is an alias for `new`

`default_scope -> { order(created_at: :desc) }` sort desending on create date
`->` is stabby lambda syntax, takes a block and returns a proc

<https://github.com/faker-ruby/faker>

private methods can be called from derived classes

<https://guides.rubyonrails.org/active_record_querying.html>

cloud 9 memory/cpu issues

<https://docs.aws.amazon.com/cloud9/latest/user-guide/troubleshooting.html#troubleshooting-ide-low-memory>

```bash
sudo swapon --show
sudo swapoff -a # if running
sudo fallocate --length 512MB /var/swapfile && sudo chmod 600 /var/swapfile && sudo mkswap /var/swapfile && echo '/var/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab > /dev/null
sudo swapon /var/swapfile
```

image upload

```bash
rails active_storage:install
rails db:migrate
```

```bash
sudo apt-get -y install imagemagick
```

```ruby
amazon:
  service: S3
  access_key_id:     <%= ENV['AWS_ACCESS_KEY_ID'] %>
  secret_access_key: <%= ENV['AWS_SECRET_ACCESS_KEY'] %>
  region:            <%= ENV['AWS_REGION'] %>
  bucket:            <%= ENV['AWS_BUCKET'] %>
```

many-to-many relationships are complex

![naive implementation](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9780138050061/files/graphics/f0761-01.jpg)

through relationships are likely better

![model folled through active relationships](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9780138050061/files/graphics/f0761-02.jpg)

```ruby
    add_index :relationships, :follower_id
    add_index :relationships, :followed_id
    add_index :relationships, [:follower_id, :followed_id], unique: true
```

would allow a unique combo or indiviual (async) relationships

`user.active_relationships.build(followed_id: ...)` build relationships

By default, Rails expects a foreign key of the form `<class>_id`

`has_many :followeds, through: :active_relationships` rails default associations, overridden by `has_many :following, through: :active_relationships, source: :followed` to make more sense

<https://guides.rubyonrails.org/routing.html>

<https://hotwired.dev/>

<https://www.learnenough.com/action-cable>

`&:to_s` shorthand for `{ |i| i.to_s }`, use with map for example

<http://railscasts.com/episodes/274-remember-me-reset-password>

As a general rule, if a method doesn’t need an instance of an object, it should be a class method

Class methods

```ruby
def self.digest(string)
end

def User.digest(string)
end

class << self
def digest(string)
end
end
```

`if (user_id = session[:user_id])` if session id exists, ,assing to user_id. () is a convention to denote assignment

pushing to heroku with maintenence mode

```bash
heroku maintenance:on
git push heroku
heroku run rails db:migrate
heroku maintenance:off
```

`before_create :create_activation_digest` method reference, calls the method create_activation_digest

```ruby
# mutliple db calls
# update_attribute(:activated,    true)
# update_attribute(:activated_at, Time.zone.now)

# single db call
update_columns(activated: true, activated_at: Time.zone.now)
```

`heroku addons:create sendgrid:starter` sendgrid addon
`grep heroku .git/config` show config

<https://docs.sendgrid.com/ui/sending-email/sender-verification>
