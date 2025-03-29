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
| ------------- | ------------------------------------------------------- |
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

## OAuth


