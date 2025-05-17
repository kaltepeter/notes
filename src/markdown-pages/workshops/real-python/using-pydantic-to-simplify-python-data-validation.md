---
title: Using Pydantic to Simplify Python Data Validation
date: 2025--5-16
tags:
  - course
  - real-python
  - pydantic
  - python
---

https://realpython.com/courses/pydantic-simplify-data-validation/ 

## Basic Model

### Valid

```python
from datetime import date
from enum import Enum
from uuid import UUID, uuid4
from typing_extensions import Self
from typing import Annotated
import time

from pydantic import (
    BaseModel,
    EmailStr,
    ConfigDict,
    Field,
    field_validator,
    model_validator,
    PositiveFloat,
    validate_call,
    HttpUrl
)
from pydantic_settings import BaseSettings, SettingsConfigDict


class Department(Enum):
    HR = "HR"
    SALES = "SALES"
    IT = "IT"
    ENGINEERING = "ENGINEERING"


class Employee(BaseModel):
    employee_id: UUID = uuid4()
    name: str
    email: EmailStr
    date_of_birth: date
    salary: float
    department: Department
    elected_benefits: bool


employee = Employee(
    name="John Doe",
    email="john.doe@example.com",
    date_of_birth=date(1990, 1, 1),
    salary=50000,
    department=Department.HR,
    elected_benefits=True,
)

print(employee)
```

### Invalid

```python
broken_employee = Employee(
    employee_id="12345",
    name=False,
    email="john.doe@example.com",
    date_of_birth=datetime(1990, 1, 1),
    salary=50000,
    department=Department.HR,
    elected_benefits=True,
)
```

## From Dictionary

```python
new_employee_dict = {
    "name": "Chris Detuma",
    "email": "chris.detuma@example.com",
    "date_of_birth": "1990-01-01",
    "salary": 123_000.00,
    "department": "HR",
    "elected_benefits": True,
}

# create a model from a dictionary
new_employee = Employee.model_validate(new_employee_dict)
print(new_employee)
```

## From JSON

```python
# create a model from json
new_employee_json = """
    {
        "employee_id": "d2e7b773-926b-49df-939a-5e98cbb9c9eb",
        "name": "Eric Slogrenta",
        "email": "eric.slogrenta@example.com",
        "date_of_birth": "1990-01-01",
        "salary": 123000.0,
        "department": "HR",
        "elected_benefits": false
    }
"""

new_employee_from_json = Employee.model_validate_json(new_employee_json)
print(new_employee_from_json)
```

## print dict

```python
print(new_employee.model_dump())
```

## print json

```python
print(new_employee.model_dump_json())
```

## print schema

```python
print(Employee.model_json_schema())
```

## Using Fields

```python
class Employee(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    employee_id: UUID = Field(default_factory=uuid4, frozen=True)
    name: str = Field(min_length=1, frozen=True)
    email: EmailStr = Field(pattern=r".+@example\.com$")
    date_of_birth: date = Field(alias="birth_date",
                                    repr=False,
                                    frozen=True)
    salary: float = Field(alias="compensation", gt=0, repr=False)
    department: Department
    elected_benefits: bool
```

### Invalid

```python
incorrect_employee_data = {
    "name": "",
    "email": "john.doe@example",
    "birth_date": "1990-01-01",
    "salary": -50000,
    "department": "HR",
    "elected_benefits": True,
}

print(Employee.model_validate(incorrect_employee_data))
```

### Valid

```python
correct_employee_data = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "birth_date": "1990-01-01",
    "salary": 50000,
    "department": "HR",
    "elected_benefits": True,
}

print(Employee.model_validate(correct_employee_data))
```

## Validators

```python
class Employee(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    employee_id: UUID = Field(default_factory=uuid4, frozen=True)
    name: str = Field(min_length=1, frozen=True)
    email: EmailStr = Field(pattern=r".+@example\.com$")
    date_of_birth: date = Field(alias="birth_date",
                                    repr=False,
                                    frozen=True)
    salary: float = Field(alias="compensation", gt=0, repr=False)
    department: Department
    elected_benefits: bool

    @field_validator("date_of_birth")
    @classmethod
    def check_valid_age(cls, date_of_birth: date) -> date:
        today = date.today()
        eighteen_years_ago = date(today.year - 18, today.month, today.day)

        if date_of_birth > eighteen_years_ago:
            raise ValueError("Employee must be at least 18 years old.")
        
        return date_of_birth
    
    @model_validator(mode="after")
    def check_it_benefits(self) -> Self:
        department = self.department
        elected_benefits = self.elected_benefits

        if department == Department.IT and elected_benefits:
            raise ValueError("IT employees do not qualify for elected benefits.")
        
        return self
```

### Invalid

```python
incorrect_employee_data = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "birth_date": "2021-01-01",
    "salary": 50000,
    "department": "HR",
    "elected_benefits": True,
}

print(Employee.model_validate(incorrect_employee_data))

incorrect_employee_data = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "birth_date": "2001-01-01",
    "salary": 50000,
    "department": "IT",
    "elected_benefits": True,
}

print(Employee.model_validate(incorrect_employee_data))
```

## Validate Functions 

```python
@validate_call
def send_invoice(
    client_name: Annotated[str, Field(min_length=1)],
    client_email: EmailStr,
    items_purchased: list[str],
    amount_owed: PositiveFloat,
) -> str:
    email_str = f"""
    Dear {client_name}, \n
    Thank you for choosing xyz inc! You
    owe ${amount_owed:,.2f} for the following items: \n
    {items_purchased}
"""
    print(f"Sending email to {client_email}...")
    time.sleep(2)

    return email_str
```

### Invalid

```python
email_str = send_invoice(
    client_name="",
    client_email="john.doe@example.",
    items_purchased=["item1", "item2"],
    amount_owed=100.00,
)
```

### Valid

```python
email_str = send_invoice(
    client_name="John Doe",
    client_email="john.doe@example.com",
    items_purchased=["item1", "item2"],
    amount_owed=100.00,
)

print(email_str)
```

## Annotated

- Used to provide metadata about a function argument
- Recommended by Pydantic for validation of argument with metadata
- if `default_factory` is used for dcefault argument
    - assign the argument directly to a field instance


## Pydantic Settings

### Set in shell

```bash
export DATABASE_HOST="https://dbprovider.example.com"
export DATABASE_USER="username"
export DATABASE_PASSWORD="fakePas87824r3"
export API_KEY="1234567890-dksjfmkj#$@#$kjfsk"
```


### Load settings

```python
class AppConfig(BaseSettings):
    database_host: HttpUrl
    database_user: str = Field(min_length=5)
    database_password: str = Field(min_length=10)
    api_key: str = Field(min_length=20)

print(AppConfig())
```

## BaseSettings
- parse and validate any env vars
- any `BaseModel` validation is possible with BaseSettings
    - custom validation:
        - `model_validator`
        - `field_validator`

## SettingsConfigDict
- customization of behavior is possible
- Example:
    - read from a `.env` file
    - Ensuring `BaseSettings` is Case-Sensitive
    - No additional variables present.

### `.env` file

```
database_host="https://dbprovider.example.com"
database_user="username"
database_password="fakePas87824r3"
api_key="1234567890-dksjfmkj#$@#$kjfsk"
```

### Load settings from `.env` file

```python
class AppConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="forbid",
    )
    database_host: HttpUrl
    database_user: str = Field(min_length=5)
    database_password: str = Field(min_length=10)
    api_key: str = Field(min_length=20)


print(AppConfig())
```