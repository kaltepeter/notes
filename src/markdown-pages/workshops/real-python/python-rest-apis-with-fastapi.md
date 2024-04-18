---
title: Python Rest APIs with FastAPI
date: 2024-02-01
tags:
  - course
  - real-python
---

<https://realpython.com/lessons/introduction-to-fastapi/>

<https://fastapi.tiangolo.com/>

<https://replit.com/@dbader/FastAPIMongita>

## Servers

ASGI - Async Server Gateway Interface
    - Uvicorn https://www.uvicorn.org/
WSGI - Web Server Gateway Interface

Loading Uvicorn: `uvicorn main:app --host '0.0.0.0' --port 8000 --reload`

## Swagger

http://localhost:8000/docs

## HTTP IE

`pip install httpie`

`http localhost:8000`

`http POST localhost:8000`

## Types

FastAPI uses pydantic extensively. Default parameter types are string without type hints.

This will use int.

```python
@app.get('/shapes/{shape_id}')
async def get_shapes(shape_id: int):
    for shape in shapes:
        if shape['id'] == shape_id:
            return shape
```

404 for not found

```python
@app.get('/shapes/{shape_id}')
async def get_shapes(shape_id: int):
    for shape in shapes:
        if shape['id'] == shape_id:
            return shape

    raise HTTPException(status_code=404, detail=f"Shape with id {shape_id} not found")
```

FRM stack: FastAPI, React, MongoDB

Mongita: file based NoSQL database implementing the PyMongo API
