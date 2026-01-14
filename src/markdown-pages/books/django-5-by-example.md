---
title: Django 5 by Example
date: 2025-03-24
tags:
  - book
  - django
---

## Install Django

```bash
asdf set python 3.12.9
asdf install
python -m venv .venv
. .venv/bin/activate 
python -m pip install Django~=5.0.4 
```

## Manage Commands

- `python manage.py runserver` start dev server
- `python manage.py shell` django shell
- `python manage.py createsuperuser` create superuser


## Create Project

```bash
django-admin startproject mysite

cd mysite
python manage.py migrate
```

`python manage.py runserver` - run server

[Settings Reference](https://docs.djangoproject.com/en/5.0/ref/settings/)


## Create Application 

1. `python manage.py startapp blog` create app called blog
1. Edit settings.py and include the blog app `'blog.apps.BlogConfig',`

| File          | Purpose                                                 |
|---------------|---------------------------------------------------------|
| `__init__.py` | python module                                           |
| `admin.py`    | register models to include in the admin site (optional) |
| `apps.py`     | main config of the blog application                     |
| `migrations`  | db migrations                                           |
| `models.py`   | data models                                             |
| `tests.py`    | add tests                                               |
| `views.py`    | logic goes here, request/response                       |


## Models

- [Field Reference](https://docs.djangoproject.com/en/5.0/ref/models/fields/)
- [Foreign Key On Delete](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.ForeignKey.on_delete)
- [Model API](https://docs.djangoproject.com/en/5.0/ref/models/)

`publish = models.DateTimeField(default=timezone.now)` uses python now with timezone aware
`publish = models.DateTimeField(db_default=Now())` uses the database now

`auto_now_add` - will use now on create
`auto_now` - will use now on update

Meta can be added to model classes to set ordering and indexes. '-publish' will order by latest first.

```python
class Meta:
        ordering = ["-publish"]
        indexes = [models.Index(fields=['-publish'])]
```

### Foreign Keys

Define a one to many relationship with the default user model and posts.

related_name allows us to reverse the look up with `user.blog_posts`.

```python
author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='blog_posts',
    )
```

## Shell

`python manage.py shell` runs interactive python shell with django loaded

## Migrations

1. Initial migration `python manage.py makemigrations blog`
1. Sync databse with new model `python manage.py migrate`

`python manage.py sqlmigrate blog 0001` - inspect migration

Any edit to `models.py` requires two steps. `makemigrations` and `migrate`.

## Admin Site

1. create super user: `python manage.py createsuperuser`

Register models in `admin.py`

```python
from django.contrib import admin
from .models import Post

admin.site.register(Post)

# or

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'author', 'publish', 'status']
    list_filter = ['status', 'created', 'publish', 'author']
    search_fields = ['title', 'body']
    prepopulated_fields = {'slug': ('title',)}
    raw_id_fields = ['author']
    date_hierarchy = 'publish'
    ordering = ['status', 'publish']
    show_facets = admin.ShowFacets.ALWAYS
```

## ORM

- [ORM Reference](https://docs.djangoproject.com/en/5.0/topics/db/queries/)

- Filters are SQL joined with AND
- 

`get` or `get_or_create` to retrieve
`save` to persist objects
`create` to define and create
`delete` to delete

`Post.objects.all()` get all posts
`Post.objects.filter(title='Who was Django Reinhardt?')` filter by query
`Post.objects.filter(id__exact=1)` get by id 1
`Post.objects.filter(id=1)` sae as `id__exact=1`, without lookup type is assumed exact
`Post.objects.filter(title__iexact='who was django reinhardt?')` case insensitive exact match
`Post.objects.filter(title__contains='Django')` title contains django
`Post.objects.filter(title__icontains='django')` case insensive contains
`Post.objects.filter(id__in=[1,3])` find posts with id 1 or 3
`Post.objects.filter(id__gt=3)` find posts with id greater than 3
`Post.objects.filter(id__gte=3)` find posts with id greater than equal to 3
`Post.objects.filter(id__lt=3)` find posts with id less than 3
`Post.objects.filter(id__lte=3)` find posts with id less than equal to 3
`Post.objects.filter(title__istartswith='who')` find posts with titles that start with who case-insensitve
`Post.objects.filter(title__iendswith='reinhardt')` find posts with titles that ends with reinhardt case-insensitve
`Post.objects.filter(publish__date=date(2024, 1, 31))` find posts published on a date
`Post.objects.filter(publish__year=2024)` find posts from 2024
`Post.objects.filter(publish__month=1)` find posts published in jan
`Post.objects.filter(publish__day=1)` find posts published on the first of the month
`Post.objects.filter(publish__date__gt=date(2024, 1, 1))` posts published after a date
`Post.objects.filter(author__username='admin')` posts published by a user
`Post.objects.filter(author__username__startswith='ad')` posts published by a user whose name starts with ad
`Post.objects.filter(publish__year=2024, author__username='admin')` posts published by a user in 2024


```python
posts = Post.objects.filter(title='Who was Django Reinhardt?')
print(posts.query) # print sql
```

### Chaining

```python
Post.objects.filter(publish__year=2024)
    .filter(author__username='admin')
```

### Excluding

```python
Post.objects.filter(publich_year=2024)
    .exclude(title__startswith='Why')
```

### Ordering

```python
Post.objects.order_by('title') # ascending
Post.objects.order_by('-title') # descending
Post.objects.order_by('author', 'title') # multiple fields
Post.objects.order_by('?') # random order
```

### Limiting

Negative indexing is not supported.

```python
Post.objects.all()[:5] # limit 5
Post.objects.all()[3:6] # offset 3 limit 6
Post.objects.order_by('?')[0] # get a single object randomly
```

### Counting

```python
Post.objects.filter(id_lt=3).count()
```

### Exists

```python
Post.objects.filter(title__startswith='Why').exists()
```

### Q objects

- [Query Objects](https://docs.djangoproject.com/en/5.0/topics/db/queries/#complex-lookups-with-q-objects)


```python
from django.db.models import Q
starts_who = Q(title__istartswith='who')
starts_why = Q(title__istartswith='why')
Post.objects.filter(starts_who | starts_why)
```

### QuerySet Evaluation

- [QuerySet API](https://docs.djangoproject.com/en/5.0/ref/models/querysets/)

QuerySets are only evalutated in the following cases:

- The first time you iterate over them.
- When you slice them
- When you pickle or cache them
- When you call `repr()` or `len()` on them
- When you explicity call `list()` on them
- When you test them in a statement, such as `bool()`, `or`, `and`, or `if`

### Model Managers

- Default manager is `objects`
- Two ways to create custom managers: add extra manager methods or create a new manager by modifying the initial QuerySet that a mangare returns

```python
class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset() \
                    .filter(status=Post.Status.PUBLISHED)


objects = models.Manager()
published = PublishedManager()
```

## Urls

- [Path Converters](https://docs.djangoproject.com/en/5.0/topics/http/urls/#path-converters)
- [Regex Reference](https://docs.djangoproject.com/en/5.0/ref/urls/#django.urls.re_path)
- [URL Namespace Reference](https://docs.djangoproject.com/en/5.0/topics/http/urls/#url-namespaces)

1. Define urls in a `urls.py` for each application
1. Add the include to the `urls.py` in mysite.

`<parameter>` is captured as a string

Path converters such as `<int:year>` will convert the string to an integer. `<slug:post>` would match a slug.

## Templates

- [Template Reference](https://docs.djangoproject.com/en/5.0/ref/templates/language/)
- [Template Builtins](https://docs.djangoproject.com/en/5.0/ref/templates/builtins/)

- `{% tag %}` controls the rendering of the template
- `{{ variable }}` gets replaced with values
- `{{ variable|filter }}` allow you to modify variables for display
- `{% with comments.count as total_comments %}` will assign the value of `comments.count` to `total_comments`

## Pagination

- [Paginator](https://docs.djangoproject.com/en/5.0/ref/paginator/)

```python
def post_list(request):
    post_list = Post.published.all()
    paginator = Paginator(post_list, 3)
    page_number = request.GET.get('page', 1)

    try:
        posts = paginator.page(page_number)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    return render(
        request,
        'blog/post/list.html',
        {'posts': posts},
    )
    
```

templates/pagination.html

```html
<div class=""pagination">
    <span class="step-links">
        {% if page.has_previous %}
            <a href="?page={{ page.previous_page_number }}">Previous</a>
        {% endif %}
        <span class="current">Page {{ page.number }} of {{ page.paginator.num_pages }}.</span>
        {% if page.has_next %}
            <a href="?page={{ page.next_page_number }}">Next</a>
        {% endif %}
    </span>
</div>
```

## Class Based Views

- [Class-based Views Intro](https://docs.djangoproject.com/en/5.0/topics/class-based-views/intro/) 

### WHy?

- Organize code related to HTTP methods in separate methods instead of conditional branching
- Multiple inheritence to create reusable view classes (mixins)


## Forms

- [Fields](https://docs.djangoproject.com/en/5.0/ref/forms/fields/)

```python
class EmailPostForm(forms.Form):
    name = forms.CharField(max_length=25)
    email = forms.EmailField()
    to = forms.EmailField()
    comments = forms.CharField(
        required=False,
        widget=forms.Textarea
    )
```

```python
def post_share(request, post_id):
    post = get_object_or_404(
        Post,
        id=post_id,
        status=Post.Status.PUBLISHED
    )
    if request.method == 'POST':
        form = EmailPostForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
        else:
            form = EmailPostForm()

        return render(
            request,
            'blog/post/share.html',
            {
                'post': post,
                'form': form
            }
        )
```

## Tagging

- [Taggit](https://django-taggit.readthedocs.io/en/latest/)

```python
# django, third party, local
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'taggit',
    'blog.apps.BlogConfig',
]
```

```python
path('', views.post_list, name='post_list'),
# path('', views.PostListView.as_view(), name='post_list'),
path('tag/<slug:tag_slug>/', views.post_list, name='post_list_by_tag'),
```

```python
def post_list(request, tag_slug=None):
    post_list = Post.published.all()
    tag = None
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        post_list = post_list.filter(tags__in=[tag])
        
    paginator = Paginator(post_list, 3)
    page_number = request.GET.get('page', 1)

    try:
        posts = paginator.page(page_number)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    return render(
        request,
        'blog/post/list.html',
        {'posts': posts},
    )
```

Find similar posts by tags

```python
post_tags_ids = post.tags.values_list('id', flat=True)
similar_posts = Post.published.filter(tags__in=post_tags_ids).exclude(id=post.id)
similar_posts = similar_posts.annotate(same_tags=Count('tags')).order_by('-same_tags', '-publish')[:4]
```

## Custom Template Tags

[Custom Template Tags](https://docs.djangoproject.com/en/5.0/howto/custom-template-tags/)

Add `__init__.py` to `templatetags`

`templatetags/blog_tags.py`

```python
from django import template
from django.db.models import Count
from ..models import Post


register = template.Library() 
@register.simple_tag
def total_posts():
    return Post.published.count()

@register.inclusion_tag('blog/post/latest_posts.html')
def show_latest_posts(count=5):
    latest_posts = Post.published.order_by('-publish')[:count]
    return {'latest_posts': latest_posts}

@register.simple_tag
def get_most_commented_posts(count=5):
    return Post.published.annotate(
        total_comments=Count('comments')
    ).order_by('-total_comments')[:count]
```

```html
{% load blog_tags %}
{% load static %}
<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}{% endblock %}</title>
  <link href="{% static "css/blog.css" %}" rel="stylesheet">
</head>
<body>
  <div id="content">
    {% block content %}
    {% endblock %}
  </div>
  <div id="sidebar">
    <h2>My blog</h2>
    <p>
      This is my blog.
      I've writter {% total_posts %} posts so far.
    </p>
    <h3>Latest posts</h3>
    {% show_latest_posts 3 %}
    <h3>Most commented posts</h3>
    {% get_most_commented_posts as most_commented_posts %}
      <ul>
        {% for post in most_commented_posts %}
          <li>
            <a href="{{ post.get_absolute_url }}">{{ post.title }}</a>
          </li>
        {% endfor %}
      </ul>
  </div>
</body>
</html>
```

## Template Filters

[Built-in Template Filters](https://docs.djangoproject.com/en/5.0/ref/templates/builtins/#built-in-filter-reference)

- `{{ variable|filter }}` basic filter
- `{{ variable|filter:"foo" }}` filter with argument
- `{{ variable|filter|filter }}` filter chaining

```python
import markdown
from django.utils.safestring import mark_safe

@register.filter(name='markdown')
def markdown_format(text):
    return mark_safe(markdown.markdown(text))
```

```html
  {{ post.body|markdown }}
```

## Sitemaps

- [Sitemaps](https://docs.djangoproject.com/en/5.0/ref/contrib/sitemaps/)
- [Sites Framework](https://docs.djangoproject.com/en/5.0/ref/contrib/sites/)

```python
# settings.py
SITE_ID = 1

# Application definition

INSTALLED_APPS = [
    'django.contrib.sites',
    'django.contrib.sitemaps',
]

# sitemaps.py
from django.contrib.sitemaps import Sitemap
from .models import Post

class PostSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.9
    
    def items(self):
        return Post.published.all()
    
    def lastmod(self, obj):
        return obj.updated

# urls.py (mysite)
from django.urls import include, path
from django.contrib.sitemaps.views import sitemap
from blog.sitemaps import PostSitemap


sitemaps = {
    'posts': PostSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls', namespace='blog')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
```

## Full Text Search

- [Posgres Adapter Install](https://www.psycopg.org/psycopg3/docs/basic/install.html#binary-installation)
- [SearchVectorField](https://docs.djangoproject.com/en/5.0/ref/contrib/postgres/search/#performance)
- [Stop words](https://github.com/postgres/postgres/blob/master/src/backend/snowball/stopwords/english.stop)
- [Django Search](https://docs.djangoproject.com/en/5.0/ref/contrib/postgres/search/)

```bash
brew install docker
docker pull postgres:16.2     
docker run --name=blog_db -e POSTGRES_DB=blog -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=<pw> -p 5432:5432 -d postgres:16.2 
python -m pip install "psycopg[binary]" 
# dumpdata
# python manage.py dumpdata --indent=2 --output=mysite_data.json
# used this to avoid key issues
python manage.py dumpdata --indent=2 --output=mysite_data.json --natural-foreign --natural-primary

# migrate data
python manage.py migrate
python manage.py loaddata mysite_data.json    
```

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432')
    }
}

INSTALLED_APPS = [
    'django.contrib.postgres',
]
```

`.env`

```
EMAIL_HOST_USER=<email>
EMAIL_HOST_PASSWORD="<pw>"
DEFAULT_FROM_EMAIL=My Blog <email>
DB_NAME=blog
DB_USER=blog
DB_PASSWORD=<db_pw>
DB_HOST=localhost
DB_PORT=5432
```

If search is more than a few hundred rows, you should define a functional index that matches the search vector you are using. See [SearchVectorField](https://docs.djangoproject.com/en/5.0/ref/contrib/postgres/search/#performance)

```py
# forms.py
class SearchForm(forms.Form):
    query = forms.CharField()

# views.py
def post_search(request):
    form = SearchForm()
    query = None
    results = []

    if 'query' in request.GET:
        form = SearchForm(request.GET)

        if form.is_valid():
            query = form.cleaned_data['query']
            results = (
                Post.published.annotate(
                    search=SearchVector('title', 'body'),
                ).filter(search=query)
            )

    return render(
        request,
        'blog/post/search.html',
        {
            'form': form,
            'query': query,
            'results': results
        }
    )

# urls.py
path('search/', views.post_search, name='post_search'),
```

`templates/blog/post/search.html`

```html
{% extends 'blog/base.html' %}
{% load blog_tags %}
{% block title %}Search{% endblock %}
{% block content %}
    {% if query %}
        <h1>Posts containing "{{ query }}"</h1>
        <h3>
        {% with results.count as total_results %}
            Found {{ total_results }} result{{ total_results|pluralize }}
        {% endwith %}
        </h3>  
        {% for post in results %}
            <h4>
                <a href="{{ post.get_absolute_url }}">{{ post.title }}</a>
            </h4>
            {{ post.body|markdown|truncatewords_html:12 }}
        {% empty %}
            <p>There are no results for your query.</p>
        {% endfor %}
        <p><a href="{% url 'blog:post_search' %}">Search again</a></p>
    {% else %}
            <h1>Search for posts</h1>
            <form method="get">
                {{ form.as_p }}
                <input type="submit" value="Search">
            </form>
    {% endif %}
{% endblock %}
```

```python 
# views.py
if form.is_valid():
            query = form.cleaned_data['query']
            search_vector = SearchVector('title', 'body')
            search_query = SearchQuery(query)
            results = (
                Post.published.annotate(
                    search=search_vector,
                    rank=SearchRank(search_vector, search_query)
                ).filter(search=search_query)
                .order_by('-rank')
            )

# spanish
search_vector = SearchVector('title', 'body', config='spanish')
search_query = SearchQuery(query, config='spanish')

# weights
search_vector = SearchVector('title', weight='A') + SearchVector('body', weight='B')
results = (
    Post.published.annotate(
        search=search_vector,
        rank=SearchRank(search_vector, search_query)
    ).filter(rank__gte=0.3)
    .order_by('-rank')
)
```

### Weights

`D`: `0.1`
`C`: `0.2`
`B`: `0.4`
`A`: `1.0`

### Trigram Similarity

- [Postgres Operations](https://docs.djangoproject.com/en/5.0/ref/contrib/postgres/operations/)

Use `pg_trgm`

`python manage.py makemigrations --name=trigram_ext --empty blog`

Edit the migration file

```python
from django.db import migrations
from django.contrib.postgres.operations import TrigramExtension

class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_post_tags'),
    ]

    operations = [
        TrigramExtension(),
    ]
```

`python manage.py migrate blog`

```python
if form.is_valid():
    query = form.cleaned_data['query']
    results = (
        Post.published.annotate(
            similarity=TrigramSimilarity('title', query),
        ).filter(similarity__gt=0.1)
        .order_by('-similarity')
    )
```

### AI

- [Chapter 3 Prompt](https://github.com/PacktPublishing/Django-5-by-example/blob/main/Chapter03/prompts/task.md)

```python
# blog/sitemaps.py
class TagSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.6

    def items(self):
        return Tag.objects.all()

    def location(self, obj):
        return reverse('blog:post_list_by_tag', args=[obj.slug])

# mysite/urls.py
sitemaps = {
    'posts': PostSitemap,
    'tags': TagSitemap,
}
```

## New Project

```bash
django-admin startproject bookmarks
django-admin startapp account

```

`settings.py`

```python
INSTALLED_APPS = [
    'account.apps.AccountConfig',
    # ...
]
```

`python manage.py migrate`

## Built-in Authentication Framework

`django.contrib.auth`

Middleware: 
`AuthenticationMiddleware`: associates users with requests 
`SessionMiddleware`: handles current session across requests

Models:
`User`: represents a user account
`Group`: represents a group of users
`Permission`: represents a permission that can be assigned to a user or group


```python
# account/forms.py
from django import forms

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

# account/views.py
def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form .is_valid():
            cd = form.cleaned_data
            user = authenticate(
                request,
                username=cd['username'],
                password=cd['password']
            )
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse('Authenticated successfully')
                else:
                    return HttpResponse('Disabled account')
            else:
                return HttpResponse('Invalid login')
    else:
        form = LoginForm()
    return render(request, 'account/login.html', {'form': form})

# account/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.user_login, name='login'),
]

# bookmarss/urls.py add:
path('account/', include('account.urls')),

```

`authenticate()` returns a user object if the credentials are valid, or `None` if not.
`login()` logs in the user and sets the session cookie.

`python manage.py createsuperuser`

- [Default Views](https://docs.djangoproject.com/en/5.0/topics/auth/default/#all-authentication-views)


```python
# account/settings.py
LOGIN_REDIRECT_URL = 'dashboard'
LOGIN_URL = 'login'
LOGOUT_URL = 'logout'

# console email
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

- [Django Auth URLs](https://github.com/django/django/blob/stable/5.0.x/django/contrib/auth/urls.py)

```python
# forms.py
class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Repeat password', widget=forms.PasswordInput)

    class Meta:
        model = get_user_model()
        fields = ('username', 'first_name', 'email')

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Passwords don\'t match.')
        
        return cd['password2']

# views.py
def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()
            return render(request, 'account/register_done.html', {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'account/register.html', {'user_form': user_form})
```

- [Django Auth get_user_model](https://docs.djangoproject.com/en/5.0/topics/auth/customizing/#django.contrib.auth.get_user_model)


`clean_<fieldname>` is called when the form is validated.
`set_password` handles hashing and storing the password.

Default is `PBKDF2` hashing. Supports: `P8KDF2SHA1`, `argon2`, `bcrypt`, `scrypt`.

`scrypt` was introduced in Django 4.0 and requires OpenSSL 1.1+ or later and more memory.

`PASSWORD_HASHERS` setting defines the hashers to use.

- [Django Auth Passwords](https://docs.djangoproject.com/en/5.0/topics/auth/passwords/)

Extending the user model with a profile model is simple with a 1:1 relationship. 

- [Django Auth Customizing](https://docs.djangoproject.com/en/5.0/topics/auth/customizing/#substituting-a-custom-user-model)

Using a custom model will give emore flexibility, but it might also result in more difficult integrations with pluggble applications that interact directly with Django’s user model.

## Media Files

`python -m pip install Pillow`

```python
# settings.py
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# bookmarks/urls.py
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root=settings.MEDIA_ROOT
    )

# bookmarks/forms.py
class UserEditForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name', 'email']

class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['date_of_birth', 'photo']

# bookmarks/views.py
Profile.objects.create(user=new_user)

@login_required
def edit(request):
    if request.method == 'POST':
        user_form = UserEditForm(instance=request.user, data=request.POST)
        profile_form = ProfileEditForm(
            instance=request.user.profile,
            data=request.POST,
            files=request.FILES
        )
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileEditForm(instance=request.user.profile)
    return render(
        request, 
        'account/edit.html', 
        {'user_form': user_form, 'profile_form': profile_form}
    )
```

Django is very inefficient at servince static files, this is only for development.

```bash
python manage.py makemigrations  
python manage.py migrate      
```

## Messages

- [Django Messages](https://docs.djangoproject.com/en/5.0/ref/contrib/messages/)

`add_message()` or `success()` or `error()` or `warning()` or `info()` or `debug()`

## OAuth

- [Django Auth Sources](https://docs.djangoproject.com/en/5.0/topics/auth/customizing/#other-authentication-sources)
- [Django Social App](https://github.com/python-social-auth/social-app-django)
- [Social Backends](https://python-social-auth.readthedocs.io/en/latest/backends/index.html#supported-backends)
- [Allowed Hosts](https://docs.djangoproject.com/en/5.0/ref/settings/#allowed-hosts)
- [Django Estensions](https://django-extensions.readthedocs.io/en/latest/)
- [Google OAuth2](https://developers.google.com/identity/protocols/OAuth2))

```python
# settings.py
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'account.authentication.EmailAuthBackend',
]
```

```bash
python -m pip install social-auth-app-django
```

### SSL

```bash
python -m pip install django-extensions
python -m pip install werkzeug
python -m pip install pyOpenSSL
python -m pip install python-decouple
```

```python
# settings.py INSTALLED_APPS
'django_extensions',

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'account.authentication.EmailAuthBackend',
    'social_core.backends.google.GoogleOAuth2',
]
```

```bash
python manage.py runserver_plus --cert-file cert.crt 
```

- [Google Dev Key]( https://console.cloud.google.com/projectcreate)
- [Python Social Auth Pipeline](https://python-social-auth.readthedocs.io/en/latest/pipeline.html)

1. create app
2. authorize consent
3. create credentials with OAuth client ID


`.env`

```
GOOGLE_OAUTH_KEY=
GOOGLE_OAUTH_SECRET=
```

```python
# settings.py

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = config('GOOGLE_OAUTH2_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = config('GOOGLE_OAUTH2_SECRET')

SOCIAL_AUTH_PIPELINE = [
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.user.create_user',
    'account.authentication.create_profile',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
]
```

` python manage.py runserver_plus --cert-file cert.crt`


```python
# account/authentication.py
def create_profile(backend, user, *args, **kwargs):
    """
    Create user profile for social authentication
    """
    Profile.objects.get_or_create(user=user)
```

## Images

- [Database Indexes](https://docs.djangoproject.com/en/5.0/ref/models/options/#django.db.models.Options.indexes)
- [Django Many to Many Models](https://docs.djangoproject.com/en/5.0/topics/db/examples/many_to_many/)
- [Image Thumbnails](https://easy-thumbnails.readthedocs.io/en/latest/)

```txt
requests==2.31.0
easy-thumbnails==2.8.5
```

```python
# images/models.py
from django.db import models

from django.conf import settings
from django.db import models

class Image(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='images_created', 
        on_delete=models.CASCADE)
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, blank=True)
    url = models.URLField(max_length=2000)
    image = models.ImageField(upload_to='images/%Y/%m/%d/')
    description = models.TextField(blank=True)
    created = models.DateField(auto_now_add=True)
    users_like = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='images_liked',
        blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['-created']),
        ]
        ordering = ['-created']
    
    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

# images/forms.py
from django import forms
from .models import Image

class ImageCreateForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['title', 'url', 'description']
        widgets = {
            'url': forms.HiddenInput,
        }


def clean_url(self):
    url = self.cleaned_data['url']
    valid_extensions = ['jpg', 'jpeg', 'png']
    extension = url.rsplit('.', 1)[1].lower()
    if extension not in valid_extensions:
        raise forms.ValidationError('The given URL does not '
                                    'match valid image extensions.')
    return url

def save(self, 
         force_insert=False, 
         force_update=False, 
         commit=True):
    image = super().save(commit=False)
    image_url = self.cleaned_data['url']
    name = slugify(image.title)
    extension = image_url.rsplit('.', 1)[1].lower()
    image_name = f'{name}.{extension}'
    response = requests.get(image_url)
    image.image.save(
        image_name, 
        ContentFile(response.content), 
        save=False)
    if commit:
        image.save()
    
    return image

# images/views.py
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .forms import ImageCreateForm

@login_required
def image_create(request):
    if request.method == 'POST':
        form = ImageCreateForm(data=request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            new_item = form.save(commit=False)
            new_item.user = request.user
            new_item.save()
            messages.success(request, 'Image added successfully')

            return redirect(new_item.get_absolute_url())
        else:
            form = ImageCreateForm(data=request.GET)
            return render(request, 
                          'images/image/create.html', 
                          {'section': 'images', 'form': form}
                        )
```

Thumbnails

```bash
python -m pip install easy-thumbnails
python manage.py migrate
```

```html
{% load thumbnail %}
    <a href="{{ image.image.url }}">
        <img src="{% thumbnail image.image 300x0 %}" class="image-detail">
    </a>
```

## HTTP Requests

```python
@require_POST # only accept POST requests
```

## Javascript

- [CSRF](https://docs.djangoproject.com/en/5.0/ref/csrf/#ajax)

```html
<!-- base.html -->
  <script src="//cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
  <script>
    const csrftoken = Cookies.get('csrftoken');
    document.addEventListener('DOMContentLoaded', function(event) {
        {% block domready %}
        {% endblock %}
    });
  </script>
<!-- images/detail.html -->
{% block domready %}
const url = '{% url "images:like" %}';
var options = {
    method: 'POST',
    headers: {'X-CSRFToken': csrftoken},
    mode: 'same-origin'
}
document.querySelector('a.like').addEventListener('click', function(e){
    e.preventDefault();
    var likeButton = this;
    var formData = new FormData();
    formData.append('id', likeButton.dataset.id);
    formData.append('action', likeButton.dataset.action);
    options['body'] = formData;
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data['status'] === 'ok') {
                var previousAction = likeButton.dataset.action;
                var action = previousAction === 'like' ? 'unlike' : 'like';
                likeButton.dataset.action = action;
                likeButton.innerHTML = action;
                var likeCount = document.querySelector('span.count .total');
                var totalLikes = parseInt(likeCount.innerHTML);
                likeCount.innerHTML = previousAction === 'like' ? totalLikes + 1 : totalLikes - 1;
            }
        })
})
{% endblock %}
```

## Pagination

```python
@login_required
def image_list(request):
    images = Image.objects.all()
    paginator = Paginator(images, 8)
    page = request.GET.get('page')
    images_only = request.GET.get('images_only')
    try:
        images = paginator.page(page)
    except PageNotAnInteger:
        images = paginator.page(1)
    except EmptyPage:
        if images_only:
            return HttpResponse('')
        images = paginator.page(paginator.num_pages)
    if images_only:
        return render(request,
                      'images/image/list_images.html',
                      {
                          'section': 'images',
                          'images': images,
                      })
    return render(request,
                  'images/image/list.html',
                  {
                      'section': 'images',
                      'images': images,
                  })
```

```html
<!-- images/image/list.html -->
{% extends "base.html" %}
{% block title %}Images bookmarked{% endblock %}
{% block content %}
    <h1>Images bookmarked</h1>
    <div id="image-list">
        {% include "images/image/list_images.html" %}
    </div>
{% endblock %}
{% block domready %}
    var page = 1;
    var emptyPage = false;
    var blockRequest = false;
    window.addEventListener('scroll', function(e) {
        var margin = document.body.clientHeight - window.innerHeight - 200;
        if (window.pageYOffset > margin && !emptyPage && !blockRequest) {
            blockRequest = true;
            page += 1;
            fetch(`?images_only=1&page=${page}`)
                .then(response => response.text())
                .then(html => {
                    if (html === '') {
                        emptyPage
                    } else {
                        var imageList = document.getElementById('image-list');
                        imageList.insertAdjacentHTML('beforeend', html);
                        blockRequest = false;
                    }
                });
        }
    });
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
{% endblock %}

<!-- images/image/list_images.html -->
 {% load thumbnail %}
{% for image in images %}
    <div class="image">
        <a href="{{ image.get_absolute_url }}">
            {% thumbnail image.image 300x300 crop="smart" as im %}
            <a href="{{ image.get_absolute_url }}">
                <img src="{{ im.url }}">
            </a>
        </a>
        <div class="info">
            <a href="{{ image.get_absolute_url }}" class="title">
                {{ image.title }}
            </a>
        </div>
    </div>
{% endfor %}
```

## Many to Many Relationships

Usually `ManytoManyField` is good enough, when you need additional data an intermediate model is needed.

Two reasons to use:

- using the Django user table and don't want to alter it
- storing additional data about the relationship, such as time

- [Custom User Model](https://docs.djangoproject.com/en/5.0/topics/auth/customizing/#specifying-a-custom-user-model)

```python
class Contact(models.Model);
    user_from = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='rel_from_set',
        on_delete=models.CASCADE
    )
    user_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='rel_to_set',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['-created']),
        ]
        ordering = ['-created']
    
    def __str__(self):
        return f'{self.user_from} follows {self.user_to}'

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    photo = models.ImageField(upload_to='users/%Y/%m/%d/', blank=True)
    user_model = get_user_model()
    user_model.add_to_class(
        'following',
        models.ManyToManyField(
            'self',
            through=Contact,
            related_name='followers',
            symmetrical=False
        )
    )

    def __str__(self):
        return f'Profile of {self.user.username}'
```

`symentrical=False` with followers for example, means that because i follow you, doesn't mean you automatically follow me.

## contenttypes Framework

- [contenttypes framework](https://docs.djangoproject.com/en/5.0/ref/contrib/contenttypes/)

`django.contrib.contenttypes` is included by default. Creates a `ContentType` model that stores a reference to the model that is registered in the database.

```bash
>>> from django.contrib.contenttypes.models import ContentType
>>> image_type = ContentType.objects.get(app_label='images', model='image')
>>> image_type
<ContentType: Images | image>
>>> image_type.model_class()
<class 'images.models.Image'>
>>> from images.models import Image
>>> ContentType.objects.get_for_model(Image)
<ContentType: Images | image>
```

Three things to setup a generic relationship:

- A `foreign key` field to `ContentType`: the model relationship
- A field to store the primary key of the related model: usually `PositiveIntegerField` to match Django's automatic primary key fields
- A field to define and mange the generic relation using the two prvious fields: the `contenttypes` framwork offers a `GenericForeignKey` field 


avoid overlapping actions and save

```python
# actions/utils.py
import datetime
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from .models import Action

def create_action(user, verb, target=None):
    now = timezone.now()
    last_minute = now - datetime.timedelta(seconds=60)
    similar_actions = Action.objects.filter(user_id=user.id,
                                            verb=verb,
                                            created__gte=last_minute
                                        )
    if target:
        target_ct = ContentType.objects.get_for_model(target)
        similar_actions = similar_actions.filter(
            target_ct=target_ct,
            target_id=target.id
        )

    if not similar_actions:
        action = Action(user=user,
                        verb=verb,
                        target=target
                    )
        action.save()
        return True
    return False

# account/views.py
@login_required
def dashboard(request):
    actions = Action.objects.exclude(user=request.user)
    following_ids = request.user.following.values_list('id', flat=True)
    if following_ids:
        actions = actions.filter(user_id__in=following_ids)
        actions = actions.select_related('user', 'user__profile').prefetch_related('target')[:10]
        
    return render(request,
                  'account/dashboard.html',
                  {
                      'section': 'dashboard',
                      'actions': actions
                  })
```

- `select_related` is used to avoid N+1 queries with 1:many relationships. Join uses SQL.
- `prefetch_related` is used to avoid N+1 queries with many:many relationships. Join uses python. 

```html
<!-- actions/templates/actions/action/detail.html -->
 {% load thumbnail %}
{% with user=action.user profile=action.user.profile %}
<div class="action">
    <div class="images">
        {% if profile.photo %}
            {% thumbnail user.profile.photo 80x80 crop="100%" as im %}
            <a href="{{ user.get_absolute_url }}">
                <img src="{{ im.url }}" alt="{{ user.get_full_name }}" class="item-img">
            </a>
        {% endif %}
        {% if action.target %}
            {% with target=action.target %}
                {% if target.image %}
                    {% thumbnail target.image 80x80 crop="100%" as im %}
                    <a href="{{ target.get_absolute_url }}">
                        <img src="{{ im.url }}" class="item-img">
                    </a>
                {% endif %}
            {% endwith %}
        {% endif %}
    </div>
    <div class="info">
        <p>
            <span class="date">{{ action.created|timesince }} ago</span>
            <br />
            <a href="{{ user.get_absolute_url }}">
                {{ user.first_name }}
            </a>
            {{ action.verb }}
            {% if action.target %}
                {% with target=action.target %}
                    <a href="{{ target.get_absolute_url }}">{{ target }}</a>
                {% endwith %}
            {% endif %}
        </p>
    </div>
</div>
{% endwith %}
```

## Using Signals for Denormalizing Counts

Denormalizing data is making data redundant to optimize for read performance.

- [Signals](https://docs.djangoproject.com/en/5.0/ref/signals/)
- [App Config](https://docs.djangoproject.com/en/5.0/ref/applications/)

- Django comes with a signal dispatcher that allows receiver functions to get notified when certain actions occur in the system.
- Decouple logic
- Several methods:
    - `pre_save` and `post_save` are sent before and after calling the `save()` method of a model.
    - `pre_delete` and `post_delete` are sent before and after calling the `delete()` method of a model or queryset
    - `m2m_changed` is sent when a `ManyToManyField` on a model is changed.

This would retrieve images according to number of likes:

```python
from django.db.models import Count
from images.models import Image
images_by_popularity = Image.objects.annotate(
    total_likes=Count('users_like')
).order_by('-total_likes')
```

- It's expensive, it's better to add a field that stores the total counts to images.
- Several ways to imporve performance before denormalizing:
    - database indexes
    - query optimization
    - caching
- signals are synchronous

```python
# images/models.py
    total_likes = models.PositiveBigIntegerField(default=0)

    class Meta:
        indexes = [
            models.Index(fields=['-created']),
            models.Index(fields=['-total_likes'])
        ]
        ordering = ['-created']

# images/signals.py
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from .models import Image

@receiver(m2m_changed, sender=Image.users_like.through)
def users_like_changed(sender, instance, **kwargs):
    instance.total_likes = instance.users_like.count()
    instance.save()

# iamges/apps.py
from django.apps import AppConfig


class ImagesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'images'
    def ready(self):
        # import signal handlers
        import images.signals
```

To sync db state open shell and run:

```python
from images.models import Image
for image in Image.objects.all():
    image.total_likes = image.users_like.count()
    image.save()

```

 ## Debug Toolbar

 - [Django Debug Toolbar](https://django-debug-toolbar.readthedocs.io/en/latest/)
 - [Django Debug Panels](https://django-debug-toolbar.readthedocs.io/en/latest/panels.html#third-party-panels)

 ```bash
python -m pip install django-debug-toolbar
 ```

 ```python
#  settings.py
 INSTALLED_APPS = [
    'debug_toolbar',
]

MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

INTERNAL_IPS = ['127.0.0.1']

# urls.py
path('__debug__/', include('debug_toolbar.urls')),
```

debug shell

```bash
python manage.py debugsqlshell  
```

use the debug shell

```python
>>> Image.objects.get(id=11)
SELECT "images_image"."id",
       "images_image"."user_id",
       "images_image"."title",
       "images_image"."slug",
       "images_image"."url",
       "images_image"."image",
       "images_image"."description",
       "images_image"."created",
       "images_image"."total_likes"
FROM "images_image"
WHERE "images_image"."id" = 11
LIMIT 21 [0.33ms]
<Image: Wikimedia Commons>
```

## Redis 

- [Redis](https://redis.io/)
- [Redis Commands](https://redis.io/docs/latest/commands/)
- [Redis Datatypes](https://redis.io/docs/latest/develop/data-types/)

```bash
docker pull redis:7.2.4
docker run -it --rm --name redis -p 6379:6379 redis:7.2.4
docker exec -it redis sh
redis-cli
SET name "Peter"
GET name
EXISTS name
EXPIRE name 2
GET name

SET total 1
DEL total
GET total

python -m pip install redis

python manage.py shell

>>> import redis
>>> r = redis.Redis(host='localhost', port=6379, db=0)
>>> r.set('foo', 'bar')
True
>>> r.get('foo')
b'bar'
```

```python
# settings.py
REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_DB = 0

# images/views.py
r = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB,
)

def image_detail(request, id, slug):
    image = get_object_or_404(Image, id=id, slug=slug)
    total_views = r.incr(f'image:{image.id}:views')
    return render(request, 
                  'images/image/detail.html', 
                  {
                      'section': 'images', 
                      'image': image,
                      'total_views': total_views
                  }
                )

@login_required
def image_ranking(request):
    image_ranking = r.zrange('image_ranking', 0, -1, desc=True)[:10]
    image_ranking_ids = [int(id) for id in image_ranking]
    most_viewed = list(Image.objects.filter(id__in=image_ranking_ids))
    most_viewed.sort(key=lambda x: image_ranking_ids.index(x.id))
    r.zincrby('image_ranking', 1, image.id)
    return render(
        request,
        'images/image/ranking.html',
        {
            'section': 'images',
            'most_viewed': most_viewed
        }
    )
```

Redis keys are `object-type:id:field`, which is namespaced. Seperating by colon allows grouped calls.

## Chat GPT

### prompt

**Background:** I've developed a Django application called account, which includes a Profile model. This model extends Django's default authentication User model.

**Goal:** I aim to use Django signals to automatically create an associated `Profile` object each time a `User` object is created.

**Here’s some of my existing setup:**

Definition of the `Profile` model in `account/models.py`:
```
class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    date_of_birth = models.DateField(blank=True, null=True)
    photo = models.ImageField(
        upload_to='users/%Y/%m/%d/',
        blank=True
    )

    def __str__(self):
        return f'Profile of {self.user.username}'
```

### results

```python
# account//signals.py
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from .models import Profile

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# account/apps.py
from django.apps import AppConfig

class AccountConfig(AppConfig):
    name = 'account'

    def ready(self):
        import account.signals  # noqa: F401

# settings..py
from django.apps import AppConfig

class AccountConfig(AppConfig):
    name = 'account'

    def ready(self):
        import account.signals  # noqa: F401

```

## images

```python 
# settings.py
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# urls.py
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
```

## sessions

- [session settings](https://docs.djangoproject.com/en/5.0/ref/settings/#sessions)

- anonymous user sessions
- store arbitrary data for the user
- stored on the server side and cookies contain the session id, unleess you use the cookie based session engine
- session middleware manages sending and receiving cookies
- default session engine stores data in the database
- `django.contrib.sessions.middleware.SessionMiddleware` must be in the middleware, added by default

```python
request.session['key'] = value
request.session.get('key', default)
del request.session['key']
```

### storing session data 

- database sessions
- file based sessions
- cache based sessions
- cached db sessions
- cookie based sessions

```python 
# cart.py
from decimal import Decimal
from django.conf import settings
from shop.models import Product

class Cart:
    def __init__(self, request):
        """
        Initialize the cart.
        """
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            # save an empty cart in the session
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def add(self, product, quantity=1, override_quantity=False):
        """
        Add a product to the cart or update its quantity.
        """
        product_id = str(product.id)
        if product_id not in self.cart:
            self.cart[product_id] = {'quantity': 0,
                                      'price': str(product.price)}
        if override_quantity:
            self.cart[product_id]['quantity'] = quantity
        else:
            self.cart[product_id]['quantity'] += quantity
        self.save()

    def save(self):
        self.session.modified = True
    
    def remove(self, product):
        """
        Remove a product from the cart.
        """
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()
        
    def __iter__(self):
        """
        Iterate over the items in the cart and get the products
        from the database.
        """
        product_ids = self.cart.keys()
        # get the product objects and add them to the cart
        products = Product.objects.filter(id__in=product_ids)
        cart = self.cart.copy()
        for product in products:
            cart[str(product.id)]['product'] = product
        for item in cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']
            yield item

    def __len__(self):
        """
        Count all items in the cart.
        """
        return sum(item['quantity'] for item in self.cart.values())

    def get_total_price(self):
        return sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values())

    def clear(self):
        # remove cart from session
        del self.session[settings.CART_SESSION_ID]
        self.save()
```

## context processors

- [context processsors](https://docs.djangoproject.com/en/5.0/ref/templates/api/#built-in-template-context-processors)
- [request context](https://docs.djangoproject.com/en/5.0/ref/templates/api/#django.template.RequestContext)

- python function that takes the request object as an argument and returns a dictionary that gets added to the context
- used for global data in templates

```python
# cart/context_processors.py
from .cart import Cart

def cart(request):
    return {'cart': Cart(request)}

# settings.py
TEMPLATES = [
    {
        # ...
        'OPTIONS': {
            'context_processors': [
                # ...
                'cart.context_processors.cart',
            ]
        }
    }
]

```

## inline admin 

```python
from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email',
                    'address', 'postal_code', 'city', 'paid',
                    'created', 'updated']
    list_filter = ['paid', 'created', 'updated']
    inlines = [OrderItemInline]
```

## Async Tasks

- workers are task based servers to process tasks asynchronously
    - one or many workers can be running and executing tasks in the background
    - can queue future tasks
    - messages are used to queue tasks in a FIFO order (first in first out)
    - when finished workers pickup the next message from the queue
    - with multiple, each worker takes the first available message in order when they become available
- queue ensures each broker only gets one task at a time
    - producer sends messages to the queue
- message broker used to translate a message to a formal message protocol
    - provides reliable storage and guarenteed delivery
    - brokers are idle when queues are empty


### Celery

- [celery](https://docs.celeryq.dev/en/stable/index.html)
- [celery intro](https://docs.celeryq.dev/en/stable/getting-started/introduction.html)
- [rabbbitmq](https://www.rabbitmq.com/docs/download)
- [flower](https://flower.readthedocs.io/en/latest/)

- distrributed task queue
- communicates via messages and requires a message broker to mediatge between the client and worker
- several options for brokers including redis and rabbitmq
- `Rabbit AMQP` is the recommended message worker

```bash
python -m pip install celery
docker pull rabbitmq:3.13.1-management
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13.1-management
```

- [local rabbit admin](http://127.0.0.1:15672/#/)

default `guest:guest`

```python
# celery.py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myshop.settings')
app = Celery('myshop')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks() 

# __init__.py
from .celery import app as celery_app

__all__ = ['celery_app']
```

start a worker

```bash
celery -A myshop worker -l info
```

- The `CELERY_ALWAYS_EAGER` setting allows you to execute tasks locally in a synchronous manner instead of sending them to a queue. This is useful for testing and development.
- convention for task discovery is to define async tasks in tasks module in your application
- recommended to only send ids to tasks and query db to avoid outdated information

```python
# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from .models import Order

@shared_task
def order_created(order_id):
    """
    Task to send an e-mail notification when an order is
    successfully created.
    """
    order = Order.objects.get(id=order_id)
    subject = f'Order nr. {order.id}'
    message = f'Dear {order.first_name},\n\n' \
              f'You have successfully placed an order.' \
              f'Your order ID is {order.id}.'
    mail_sent = send_mail(subject,
                          message,
                          'admin@myshop.com',
                          [order.email])
    return mail_sent

# order/views.py
order_created.delay(order.id)
```

### Flower

Moniitor Celery tasks

```bash
python -m pip install flower
celery -A myshop flower
celery -A myshop flower --basic-auth=<user>:<pwd>
```

- http://localhost:5555

## Payment Gateway
- [stripe](https://stripe.com/)
- [Stripe Checkout](https://docs.stripe.com/payments/checkout)
- [stripe python](https://github.com/stripe/stripe-python)
- [stripe test apikeys](https://dashboard.stripe.com/test/apikeys)
- [stripe keys](https://docs.stripe.com/keys)
- [stripe session object](https://docs.stripe.com/api/checkout/sessions/create)

- `pk_test_`: test mode publishable key
- `pk_live_`: live mode publishable key
- `sk_test_`: test mode secret key
- `sk_live_`: live mode secret key

### test credit cards

- [stripe dashboard](https://dashboard.stripe.com/test/payments)

| result                           | test card number    | cvc          | expiration date |
|----------------------------------|---------------------|--------------|-----------------|
| success                          | 4242 4242 4242 4242 | any 3 digits | any future date |
| failed                           | 4000 0000 0000 0002 | any 3 digits | any future date |
| require 3d secure authentication | 4000 0025 0000 3155 | any 3 digits | any future date |

### webhook

- [stripe webhooks](https://dashboard.stripe.com/test/webhooks)
- [stripe webhook events](https://docs.stripe.com/api/events/types)

```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to 127.0.0.1:8000/payment/webhook/
stripe trigger payment_intent.succeeded
```

```python
# webhooks.py
import stripe
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from orders.models import Order

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        return HttpResponse(status=400)
    
    if event.type == 'checkout.session.completed':
        session = event.data.object
        if session.mode == 'payment' and session.payment_status == 'paid':
            try:
                order = Order.objects.get(id=session.client_reference_id)
            except Order.DoesNotExist:
                return HttpResponse(status=404)
            order.paid = True
            order.save()
            
    return HttpResponse(status=200)

# orders/models.py
    def get_stripe_url(self):
        if not self.stripe_id:
            return ''
        if '_test_' in settings.STRIPE_SECRET_KEY:
            path = '/test/'
        else:
            path = '/'
        return f'https://dashboard.stripe.com{path}payments/{self.stripe_id}'

# orders/admin.py
from django.contrib import admin
from .models import Order, OrderItem
from django.utils.safestring import mark_safe

def order_payment(obj):
    url = obj.get_stripe_url()
    if obj.stripe_id:
        html = f'<a href="{url}" target="_blank">{obj.stripe_id}</a>'
        return mark_safe(html)
    return ''

order_payment.short_description = 'Stripe payment'

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email',
                    'address', 'postal_code', 'city', 'paid',
                    order_payment, 'created', 'updated']
    list_filter = ['paid', 'created', 'updated']
    inlines = [OrderItemInline]
```

### Export CSV with Custom Action

- [outputting csv](https://docs.djangoproject.com/en/5.0/howto/outputting-csv/)
- [django import export library](https://django-import-export.readthedocs.io/en/latest/)
- [import/export with celery](https://github.com/auto-mat/django-import-export-celery)

```python
# orders/admin.py
def export_to_csv(modeladmin, request, queryset):
    opts = modeladmin.model._meta
    content_disposition = (f"attachment; filename={opts.verbose_name}.csv")
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = content_disposition
    writer = csv.writer(response)
    fields = [field
              for field in opts.get_fields()
              if not field.many_to_many and not field.one_to_many]
    writer.writerow([field.verbose_name for field in fields])
    
    for obj in queryset:
        data_row = []
        for field in fields:
            value = getattr(obj, field.name)
            if isinstance(value, datetime.datetime):
                value = value.strftime('%d/%m/%Y')
            data_row.append(value)
            
        writer.writerow(data_row)

        return response
    
export_to_csv.short_description = 'Export to CSV'

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    actions = [export_to_csv]
```


### Extend Admin Template

- [django admin templates](https://github.com/django/django/tree/5.0/django/contrib/admin/templates/admin)

```python
# orders/views.py
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required
from cart.cart import Cart
from .forms import OrderCreateForm
from .models import OrderItem, Order
from .tasks import order_created

@staff_member_required
def admin_order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id)

    return render(request,
                  'admin/orders/order/detail.html',
                  {'order': order})

# orders/urls.py
path('admin/order/<int:order_id>/', views.admin_order_detail, name='admin_order_detail'),

# orders/admin.py
from django.urls import reverse


def order_detail(obj):
    url = reverse('orders:admin_order_detail', args=[obj.id])

    return mark_safe(f'<a href="{url}">View</a>')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email',
                    'address', 'postal_code', 'city', 'paid',
                    order_payment, 'created', 'updated', order_detail]
```  


```html
<!-- admin/orders/order/detail.html -->
{% extends "admin/base_site.html" %}

{% block title %}
  Order {{ order.id }} {{ block.super }}
{% endblock %}

{% block breadcrumbs %}
  <div class="breadcrumbs">
    <a href="{% url "admin:index" %}">Home</a> &rsaquo;
    <a href="{% url "admin:orders_order_changelist" %}">Orders</a>
    &rsaquo;
    <a href="{% url "admin:orders_order_change" order.id %}">Order {{ order.id }}</a>
    &rsaquo; Detail
  </div>
{% endblock %}

{% block content %}
<div class="module">
  <h1>Order {{ order.id }}</h1>
  <ul class="object-tools">
    <li>
      <a href="#" onclick="window.print();">
        Print order
      </a>
    </li>
  </ul>
  <table>
    <tr>
      <th>Created</th>
      <td>{{ order.created }}</td>
    </tr>
    <tr>
      <th>Customer</th>
      <td>{{ order.first_name }} {{ order.last_name }}</td>
    </tr>
    <tr>
      <th>E-mail</th>
      <td><a href="mailto:{{ order.email }}">{{ order.email }}</a></td>
    </tr>
    <tr>
      <th>Address</th>
    <td>
      {{ order.address }},
      {{ order.postal_code }} {{ order.city }}
    </td>
    </tr>
    <tr>
      <th>Total amount</th>
      <td>${{ order.get_total_cost }}</td>
    </tr>
    <tr>
      <th>Status</th>
      <td>{% if order.paid %}Paid{% else %}Pending payment{% endif %}</td>
    </tr>
    <tr>
      <th>Stripe payment</th>
      <td>
        {% if order.stripe_id %}
          <a href="{{ order.get_stripe_url }}" target="_blank">
            {{ order.stripe_id }}
          </a>
        {% endif %}
      </td>
    </tr>
  </table>
</div>
<div class="module">
  <h2>Items bought</h2>
  <table style="width:100%">
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {% for item in order.items.all %}
        <tr class="row{% cycle "1" "2" %}">
          <td>{{ item.product.name }}</td>
          <td class="num">${{ item.price }}</td>
          <td class="num">{{ item.quantity }}</td>
          <td class="num">${{ item.get_cost }}</td>
        </tr>
      {% endfor %}
      <tr class="total">
        <td colspan="3">Total</td>
        <td class="num">${{ order.get_total_cost }}</td>
      </tr>
    </tbody>
  </table>
</div>
{% endblock %}

``` 


### Generating PDF Invoices

- [Django Outputting PDF](https://docs.djangoproject.com/en/5.0/howto/outputting-pdf/)
- [WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html)

```bash
python -m pip install WeasyPrint
mkdir -p orders/static/css # repeat for all static
python manage.py collectstatic  
```

```python
# myshop/settings.py
STATIC_ROOT = BASE_DIR / 'static'

# orders/urls.py
path('admin/order/<int:order_id>/pdf/', views.admin_order_pdf, name='admin_order_pdf'),

# orders/views.py
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required
from django.template.loader import render_to_string
from django.contrib.staticfiles import finders
from django.http import HttpResponse
from cart.cart import Cart
from .forms import OrderCreateForm
from .models import OrderItem, Order
from .tasks import order_created
import weasyprint


@staff_member_required
def admin_order_pdf(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    html = render_to_string('orders/order/pdf.html', {'order': order})
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'filename=order_{order.id}.pdf'
    weasyprint.HTML(string=html).write_pdf(
        response,
        stylesheets=[weasyprint.CSS(finders.find('css/pdf.css'))],
    )
    return response


# orders/admin.py
def order_pdf(obj):
    url = reverse('orders:admin_order_pdf', args=[obj.id])
    return mark_safe(f'<a href="{url}">PDF</a>')


order_detail.short_description = 'Invoice'
```


```html
<!-- orders/templates/orders/order/pdf.html -->
<html>
<body>
  <h1>My Shop</h1>
  <p>
    Invoice no. {{ order.id }}<br>
    <span class="secondary">
      {{ order.created|date:"M d, Y" }}
    </span>
  </p>
  <h3>Bill to</h3>
  <p>
    {{ order.first_name }} {{ order.last_name }}<br>
    {{ order.email }}<br>
    {{ order.address }}<br>
    {{ order.postal_code }}, {{ order.city }}
  </p>
  <h3>Items bought</h3>
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Cost</th>
      </tr>
    </thead>
    <tbody>
      {% for item in order.items.all %}
        <tr class="row{% cycle "1" "2" %}">
          <td>{{ item.product.name }}</td>
          <td class="num">${{ item.price }}</td>
          <td class="num">{{ item.quantity }}</td>
          <td class="num">${{ item.get_cost }}</td>
        </tr>
      {% endfor %}
      <tr class="total">
        <td colspan="3">Total</td>
        <td class="num">${{ order.get_total_cost }}</td>
      </tr>
    </tbody>
  </table>

  <span class="{% if order.paid %}paid{% else %}pending{% endif %}">
    {% if order.paid %}Paid{% else %}Pending payment{% endif %}
  </span>
</body>
</html>

### Sending Email of PDF

```python
# payment/tasks.py
from io import BytesIO
import weasyprint
from celery import shared_task
from django.contrib.staticfiles import finders
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from orders.models import Order
import logging

logger = logging.getLogger(__name__)

@shared_task
def payment_completed(order_id):
    """
    Task to send an e-mail notification when an order is successfully paid.
    """
    logger.info(f"Processing payment completed for order {order_id}")
    order = Order.objects.get(id=order_id)
    subject = f'My Shop - Invoice no. {order.id}'
    message = 'Please, find attached the invoice for your recent purchase.'
    email = EmailMessage(subject,
                         message,
                         'admin@myshop.com',
                         [order.email])
    
    html = render_to_string('orders/order/pdf.html', {'order': order})
    out = BytesIO()
    stylesheets = [weasyprint.CSS(finders.find('css/pdf.css'))]
    weasyprint.HTML(string=html).write_pdf(out,
                                           stylesheets=stylesheets)
    
    email.attach(f'order_{order.id}.pdf',
                 out.getvalue(),
                 'application/pdf')
    
    email.send()

# payment/webhooks.py
import stripe
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from orders.models import Order
from .tasks import payment_completed

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        return HttpResponse(status=400)
    
    if event.type == 'checkout.session.completed':
        session = event.data.object
        
        if session.mode == 'payment' and session.payment_status == 'paid':
            try:
                order = Order.objects.get(id=session.client_reference_id)
            except Order.DoesNotExist:
                return HttpResponse(status=404)
            order.paid = True
            order.stripe_id = session.payment_intent
            order.save()
            payment_completed.delay(order.id)
            
    return HttpResponse(status=200)
```