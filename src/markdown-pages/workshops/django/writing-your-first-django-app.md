---
title: Writing your first Django app
date: 2025-03-23
tags:
  - tutorial
  - django
---

## Install Django

```bash
asdf set python 3.12.9
asdf install
python -m venv .venv
. .venv/bin/activate 
python -m pip install Django
```

## Create Project

```bash
mkdir djangotutorial
django-admin startproject mysite djangotutorial
```

## Run

```bash
python manage.py runserver
```

## Create App

```bash
python manage.py startapp polls
```

## App Basics

`views.py` - contains view functions
`urls.py` - contains url patterns
`models.py` - contains database models
`settings.py` - contains configuration

## Database

SQLITE out of the box.

```bash
python manage.py migrate
```

Add your models to `models.py`

## Create Migrations for App

```bash
python manage.py makemigrations polls
# python manage.py sqlmigrate polls 0001 # readable verbose
python manage.py migrate
```

## Interactive Shell

```bash
python manage.py shell
```

## Admin

```bash
python manage.py createsuperuser
```

## Views

Render

```python
from django.http import HttpResponse
from django.template import loader

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    template = loader.get_template("polls/index.html")
    context = {
        "latest_question_list": latest_question_list,
    }
    return HttpResponse(template.render(context, request))
```

Shortcut

```python
from django.shortcuts import render

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "polls/index.html", context)
```

Get or 404

```python
from django.http import Http404
from django.shortcuts import render

from .models import Question


# ...
def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, "polls/detail.html", {"question": question})
```

sortcut

```python
from django.http import Http404
from django.shortcuts import render

from .models import Question


# ...
def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, "polls/detail.html", {"question": question})

```

dynamic urls

```html
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

generic views

```python
from django.db.models import F
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Choice, Question


class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by("-pub_date")[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"


class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"


def vote(request, question_id):
    # same as above, no changes needed.
    # ...
```

## Tests

`tests.py`

```bash
python manage.py test polls
```

