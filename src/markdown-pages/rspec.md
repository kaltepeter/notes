---
title: Rspec
date: 2023-06-18
tags:
- framework
- ruby
- backend
---

<https://www.rubypigeon.com/posts/rspec-core-cheat-sheet/>

## let, let!

<https://mixandgo.com/learn/ruby/let-vs-let!>

- Both memoize the value
- They are lazyily instantiated, only executed when called.
- Use `let!` if needing to evaluate before the it blocks.

## Request specs

<https://dev.to/kevinluo201/introduce-rspec-request-spec-4pbl>
<https://github.com/rspec/rspec-rails/blob/master/features/request_specs/request_spec.feature>

```ruby
RSpec.describe "/some/path", type: :request do
  # spec content
end
```

## Authentication

<https://thoughtbot.com/blog/token-authentication-with-rails>

```ruby
# support/request_helpers.rb
module RequestHelpers
  def get_token(user = nil)
    user ||= FactoryBot.create(:user_confirmed)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    "Bearer #{token}"
  end
end

# spec/controllers/api/v2/follows_controller_spec.rb
let(:email) { 'example101@example.com' }
let!(:user) { create(:user_confirmed, { user_email: email }) }
let!(:company) { create(:company) }

let(:valid_headers) { { 'authorization': get_token(user) } }

context 'GET' do
  it 'should return a single follow' do
    get api_v2_follows_url, {
        headers: valid_headers,
        params: {
        resource_type: 'Company',
        resource_id: follow_companies[1]
        }
    }
    expect(response).to be_successful
    data = JSON.parse(response.body)
    expect(data.size).to be 1
    expect(data.first['resource_id']).to eq follow_companies[1]
  end
end
```

## Skipping tests

`xit`, `xcontext` x in front will skip the blockl

`skip` instead of it will skip

Omit the body

## Changes

Assert changes

```ruby
expect {
    my_method
}.to change(users, :count).by(3)
```

The number can be negative for delete.
