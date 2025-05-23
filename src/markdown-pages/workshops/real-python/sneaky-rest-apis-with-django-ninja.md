---
title: Sneaky REST APIs With Django Ninja
date: 2025-5-19
tags:
  - course
  - real-python
  - python
  - project
  - django
---

https://realpython.com/videos/sneaky-rest-apis-with-django-ninja-overview/

grandpa: https://www.django-rest-framework.org/ is different from ninja

## Overview
- Django Ninja is a FastAPI inspired library for writing REST APIs with Django
- Decorate a Django view with HTTP operations
- Ninja does serialization and forms the response
- Manages authentication and exception handling
- Flexible about the organizational structure of your API

## Setup

```bash
python -m venv venv
source venv/bin/activate  
python -m pip install django django-ninja

cd Westeros
./mange.py startapp lannister
source venv/bin/activate  
```

## Lannister API

- where doesn't matter
- apis.py is similar to views.py

```python
# lannister/api.py
from ninja import Router

router = Router()

@router.get("/home")
def home(request):
    return "A Lannister always pays their debts"

# westeros/urls.py
from django.contrib import admin
from django.urls import path

from ninja import NinjaAPI

from lannister.api import router as lannister_router
from dothraki.api import router as dothraki_router

api = NinjaAPI()
api.add_router("/lannister/", lannister_router)
api.add_router("/dothraki/", dothraki_router)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", api.urls),
]
```

## Ninja

- Doesn't use trailing slashes
- Might conflict with Django's trailing slash

### Arguments

- Ninja handles Django-style URL structures and query parameters
- Everything HTTP is a string
- Ninja uses this type information to convert your variables
- Strings don't need conversion but it's a good practice
- Notation similar to Django in the url

```python
@router.get("/ruler")
def ruler(request, gender):
    if gender == 'm':
        return "Hello Khal"
    
    return "Hello Khalessi"

@router.get("/horses")
def horses(request, num: int):
    horses = ["horse" for _ in range(num)]
    return "\n".join(horses)

@router.get("/food/{item}")
def food(request, item: str):
    return f"I love {item}"

@router.get("/drank/{int:count}")
def drank(request, count: int):
    return f"I drank {count} cups of fermented horse milk"
```

### Response Object
- access the response object to make changes
- example: setting a header or cookie

```python
@router.get("/swords")
def swords(request, response: HttpResponse):
    response.set_cookie("curve", "bendy")
    return f"Swords are pointy"
```

### Schemas
- Ninja is built on top of pydantic
- pydantic uses a model object to group fields
    - django also has a Model object
    - pydantic model objects become Schema objects in Ninja
- groups attributes defined with type information
- APIs respond with data:
    - Schema used to translate it into a payload
- Ninja doesn't care where, `schemas.py` might make sense for large apps
- `out` and `in` is the Ninja convention for serializing in or out
- `ModelSchema` works like a Django form class
- Ninja automatically looks for static methods with `resolve_` and uses to populate a field

```python
# targaryen/schemas.py
from ninja import Schema, ModelSchema
from targaryen.models import Person


class DragonOut(Schema):
    name: str
    birth_year: int


class PersonOut(ModelSchema):
    full_name: str

    class Config:
        model = Person
        model_fields = ["id", "birth_year"]

        @staticmethod
        def resolve_full_name(obj):
            return f"{obj.name}, {obj.title}"


# targaryen/api.py
@router.get("/dragons", response=list[DragonOut])
def dragons(request):
    data = [
        DragonOut(name="Drogon", birth_year=298),
        DragonOut(name="Rhaegal", birth_year=298),
        DragonOut(name="Viserion", birth_year=298),
    ]

    return data


@router.get("/person/{person_id}", response=PersonOut)
def dragons(request, person_id: int):
    return Person.objects.get(id=person_id)
```

### Outside of Views

`./manage.py loaddata targaryen/fixtures/targaryen.json` load data from fixtures

```python
from targaryen.models import Person
from targaryen.schemas import PersonOut
person = Person.objects.last()
data = PersonOut.from_orm(person)
data.dict()
data.json()
```

### CRUD

Be careful with `__all__` or `__exclude__`, you will get all fields and changes without thinking about it and this is not recommended.

- specify response type
- use url_name for reverse lookup, can be finicky
    - a second get request with url_name would override the previous name
    - name the first operation with url_name and not the rest
- payload has GiftIn type
- `**` creates dict with keywrod arguments


```python
# stark/schemas.py
from ninja import ModelSchema
from stark.models import WeddingGift


class GiftIn(ModelSchema):
    class Config:
        model = WeddingGift
        model_exclude = ["id",]


class GiftOut(ModelSchema):
    class Config:
        model = WeddingGift
        model_fields = "__all__"

# stark/api.py
from django.shortcuts import get_object_or_404 
from ninja import Router
from stark.schemas import GiftIn, GiftOut
from stark.models import WeddingGift

router = Router()

@router.post("/gift", response=GiftOut, url_name="create_gift")
def create_gift(request, payload: GiftIn):
    gift = WeddingGift.objects.create(**payload.dict())
    return gift


@router.get("/gifts", response=list[GiftOut], url_name="list_gifts")
def list_gifts(request):
    return WeddingGift.objects.all()


@router.get("/gift/{int:gift_id}", response=GiftOut, url_name="gift")
def get_gift(request, gift_id):
    return get_object_or_404(WeddingGift, id=gift_id)


@router.put("/gift/{int:gift_id}", response=GiftOut)
def update_gift(request, gift_id, payload: GiftIn):
    gift = get_object_or_404(WeddingGift, id=gift_id)

    for name, value in payload.dict().items():
        setattr(gift, name, value)

    gift.save()
    return gift


@router.delete("/gift/{int:gift_id}")
def delete_gift(request, gift_id):
    gift = get_object_or_404(WeddingGift, id=gift_id)
    gift.delete()
    return {"success": True}
```

### Ninja Docs

http://localhost:8000/api/docs

### Complex Organization

multiple operations
- a view can handle multiple http operations
- use the api_operation decorator, passing a list of acceptable operations
- can be used for HTTP operations without decorators
    - Example: HEAD, OPTIONS

```python
@router.api_operation(["GET", "POST", "DELETE"], "/ravens")
def ravens(request):
    if request.method == "DELETE":
        # process
        
    return "squawk"
```

flock of ninjas

- can create multiple NinjaAPI objects
- useful for API versioning
- can create routers for each if desired
- naming prefix uses the version number

```python
from ninja import NinjaAPI

api1 = NinjaAPI(version="1.0")
api2 = NinjaAPI(version="2.0")

urlpatterns = [
    path("api/v1", api1.urls),
    path("api/v2", api2.urls),
]
```


routerless

```python
from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/giants")
def giants(request):
    return "very tall"


from django.urls import reverse

reverse("api-1.0.0:create_gifts")
reverse("api-2.0:giants")
```

nested routers

```python
from ninja import NinjaAPI

api = NinjaAPI()

greyjoy_routers = Router()
kraken_routers = Router()

@kraken_routers.get("/tenacles")
def tentacles(request):
    return "Squiggly"

api.add_router("/greyjoy/", greyjoy_routers)

greyjoy_routers.add_router("/squids/", kraken_routers)
```

### Authentication

- ninja supports multiple types of authentication
    - use Django's auth system
    - API Keys
    - HTTP Basic Auth
    - HTTP Bearer
- Support multiple authentication methods: first pass allows access
- specify authentication at the veiw, route, or API level

CSRF
- Django uses a token to prevent CSRF attacks
- included in forms when handling POSTS
- Ninja can enforce this as well

```python
api = NinjaAPI(csrf=True)
```

```python
# nwatch/api.py
from ninja import NinjaAPI
from ninja.security import APIKeyHeader, django_auth

secure = NinjaAPI(version="match", csrf=True)

@secure.get('/elevator', auth=django_auth)
def elevator(request):
    return "Ascend to the wall"

# Westeros/urls.py
from nwatch.api import secure

api = NinjaAPI()

urlpatterns = [
    path("secure/", secure.urls),
]
```

http://localhost:8000/secure/docs will load swagger, no slash

Django auth isn't the best way to secure an API, more common way is api key. Django auth is used if already using Django and adding an API for a separate frotnend

```python
# nwatch/api.py
from ninja import NinjaAPI
from ninja.security import APIKeyHeader, django_auth

secure = NinjaAPI(version="match", csrf=True)

class APIKey(APIKeyHeader):
    param_name = "X-API-KEY"

    def authenticate(self, request, key):
        if key == 'jonsnow':
            return key
        
api_key = APIKey()

@secure.get('/downbelow', auth=api_key)
def downbelow(request):
    return "One blast for rangers returning"
```

> [!NOTE]
> For testing the header must be set as 'HTTP_X_API_KEY' or it will not work and be tricky to debug

- ninja.security
    - APIKeyQuery
    - APIKeyCookie
    - HTTPBearer
    - HTTPBasicAuth
- write own function
- What to use?
    - APIKeyHeader

Resources

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication
- https://realpython.com/python-requests/
- https://realpython.com/django-user-management/
- https://realpython.com/courses/python-requests/

### Error Handling
- Good: 
    - ninja gives info
- Bad: 
    - it might not be where you expect
    - lots of things happen in the decorator before your view

- Ninja provides built-in exception handling for standard Django errors
- Raise an error using HTTPError
- Wirte your own exception handlers
- Override Ninja's handlers

```python
from django.http import Http404, HttpResponse
from ninja import NinjaAPI
from ninja.errors import HttpError

citadel = NinjaAPI(version="citadel")

@citadel.get('/conclave')
def conclave(request):
    raise HttpError(503, "Service unavailable. Please come back later.")
    return "Never get here"

# custom handler
class BookUnavailable(Exception):
    pass

@citadel.exception_handler(BookUnavailable)
def book_unavailable(request, exc):
    data = {
        "message": "Book not available",
    }

    return citadel.create_response(request, data, status=404)

@citadel.get('/book/{book_id}')
def fetch_book(request, book_id: int):
    raise BookUnavailable()
    return "Never got here either"
 
# override django
@citadel.exception_handler(Http404)
def override404(request, exc):
    return HttpResponse("I banish you to the wall", status=404)

@citadel.get("/greyscale")
def greyscale(request):
    raise Http404()
```

## Curl

```bash
curl http://localhost:8000/api/lannister/home                                                     
"A Lannister always pays their debts"%                                                                  

╭─ 🚴    …/django-ninja/Westeros  
╰─ curl -v http://localhost:8000/api/lannister/home                                                  
* Host localhost:8000 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:8000...
* connect to ::1 port 8000 from ::1 port 55554 failed: Connection refused
*   Trying 127.0.0.1:8000...
* Connected to localhost (127.0.0.1) port 8000
> GET /api/lannister/home HTTP/1.1
> Host: localhost:8000
> User-Agent: curl/8.7.1
> Accept: */*
> 
* Request completely sent off
< HTTP/1.1 200 OK
< Date: Mon, 19 May 2025 17:24:30 GMT
< Server: WSGIServer/0.2 CPython/3.12.9
< Content-Type: application/json; charset=utf-8
< X-Frame-Options: DENY
< Content-Length: 37
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< 
* Connection #0 to host localhost left intact
"A Lannister always pays their debts"%  
```

- `>` curl is sending
- `<` server is responding


Wrap url in quotes to avoid shell issues

```bash
curl -s "http://localhost:8000/api/dothraki/ruler?gender=f" 
```

```bash
 curl -s http://localhost:8000/api/dothraki/ruler | python -m json.tool
    "detail": [
        {
            "type": "missing",
            "loc": [
                "query",
                "gender"
            ],
            "msg": "Field required"
        }
    ]
}
```

`python -m json.tool` pretty prints json

```bash
curl -s "http://localhost:8000/api/targaryen/dragons" | python -m json.tool
[
    {
        "name": "Drogon",
        "birth_year": 298
    },
    {
        "name": "Rhaegal",
        "birth_year": 298
    },
    {
        "name": "Viserion",
        "birth_year": 298
    }
]

curl -s -X POST http://localhost:8000/api/stark/gift -H "Content-Type: application/json" -d '{"description": "stain remover" }'

curl -s -X PUT http://localhost:8000/api/stark/gift/4 -H "Content-Type: application/json" -d '{"description": "stain removers" }'

curl -s -X DELETE http://localhost:8000/api/stark/gift/1   

curl -s -H 'X-API-KEY:jonsnow'  http://localhost:8000/secure/downbelow  
```

## Reverse Lookup

```python
>>> from django.urls import reverse
>>> reverse('api-1.0.0:create_gift')
'/api/stark/gift'
>>> reverse('api-1.0.0:list_gifts')
'/api/stark/gifts'
>>> reverse('api-1.0.0:gift', args=[1,])
'/api/stark/gift/1'
```