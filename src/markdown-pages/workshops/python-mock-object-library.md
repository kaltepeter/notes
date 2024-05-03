---
title: Improve Your Tests With the Python Mock Object Library
date: 2024-05-03
tags:
  - course
  - python
  - real-python
---

https://realpython.com/courses/python-mock-object-library/

## What is Mocking

- Creating a fake object that represents the real object
- Used in test environments
- More control over code behavior
- Deeper insight into your code
    - when functions were called
    - how many times they were called
    - what arguments were passed

## unittest.mock

- Built in to Python 3.3+
- Provides the `Mock()` class
- Provides the `patch()` method

## Debugging

- `print(dir(json))` dump the methods of json
- `print(json.dumps.call_args)` prints args
- `print(json.dumps.call_count)` counts
- `print(json.dumps.method_calls)` all methods called
- `cal 05 2024` in terminal to show the moth 5 of year 2024

## Lazy Attributes and Methods

The mock object will create attributes and methods on demand. Arguments aren't validated by default.

```python
from unittest.mock import Mock
import json

mock = Mock()
print(mock)

data = json.dumps({'a': 1})
json = mock

data = json.dumps({'a': 1})
print(data) # <Mock name='mock.dumps()' id='4392722704'>
```

```python
from unittest.mock import Mock
import json

json = Mock()
json.dumps({'a': 1, })

print(json.dumps.assert_called()) # None, was called
print(json.dumps.assert_called_once()) # None
print(json.dumps.assert_called_with({'a': 1, })) # none
print(json.dumps.assert_called_with({'a': 2, })) # exception
```

## Return Value

```python
from datetime import datetime
from unittest.mock import Mock

tuesday = datetime(year=2024, month=5, day=7)
saturday = datetime(year=2024, month=5, day=11)

datetime = Mock()

def is_weekday():
     # type: ignore
    today = datetime.today()
    day_of_the_week = today.weekday()
    return (0 <= day_of_the_week < 5)


datetime.today.return_value = tuesday
assert is_weekday()

datetime.today.return_value = saturday
assert is_weekday() is False
```

## Unit Tests

`python -m unittest test_example.py` run test

```python
if __name__ == '__main__':
    unittest.main()
```

## Side Effects

```python
def get_holidays():
    r = requests.get('https://localhost/api/holidays');
    if r.status_code == 200:
        return r.json()

    return None


class TestGetHolidays(unittest.TestCase):
    def test_get_holidays_connection(self):
        requests.get.side_effect = ConnectionError
        with self.assertRaises(ConnectionError):
            get_holidays()

    def test_get_holidays_timeout(self):
        requests.get.side_effect = Timeout
        with self.assertRaises(Timeout):
            get_holidays()

    def log_request(self, url):
        print(f"Making request to {url}")
        response_mock = Mock()
        response_mock.status_code = 200
        response_mock.json.return_value = {
            '25/12': 'Christmas',
            '01/01': 'New Years'
        }
        return response_mock

    def test_request_with_logging(self):
        requests.get.side_effect = self.log_request
        assert get_holidays()['25/12'] == 'Christmas'



if __name__ == '__main__':
    unittest.main()
```

With iterable

```python
def test_request_with_logging(self):
    requests.get.call_count = 0
    response_mock = Mock()
    response_mock.status_code = 200
    response_mock.json.return_value = {
        '25/12': 'Christmas',
        '01/01': 'New Years'
    }

    requests.get.side_effect = [Timeout, response_mock]
    with self.assertRaises(Timeout):
        get_holidays()

    assert get_holidays()['25/12'] == 'Christmas'
    assert requests.get.call_count == 2
```

## Configure Mocks

Define during construction

```python
mock = Mock(return_value=True, side_effect=AttributeError)
```

Configure existing

```python
mock.configure_mock(side_effect=None)
```


Using objects

```python
In [4]: holidays = { '25/12': 'Christmas', '01/01': 'New Years' }

In [5]: response_mock = Mock(**{'json.return_value': holidays})

In [6]: response_mock.json()
Out[6]: {'25/12': 'Christmas', '01/01': 'New Years'}
```

## patch() as context manager

```python
from unittest.mock import Mock, patch
from my_calendar import is_weekday, get_holidays
import unittest
from requests.exceptions import Timeout

class TestCalendar(unittest.TestCase):
    def test_get_holidays_timeout(self):
        with patch('my_calendar.requests') as mocked_requests:
            mocked_requests.get.side_effect = Timeout
            with self.assertRaises(Timeout):
                get_holidays()

if __name__ == '__main__':
    unittest.main()
```

## patch.object()

```python
from unittest.mock import Mock, patch
from my_calendar import is_weekday, get_holidays, requests
import unittest
from requests.exceptions import Timeout

class TestCalendar(unittest.TestCase):
    def test_get_holidays_timeout(self):
        with patch.object(requests, 'get', side_effect=Timeout) as _:
            with self.assertRaises(Timeout):
                get_holidays()

if __name__ == '__main__':
    unittest.main()

# or

class TestCalendar(unittest.TestCase):
    @patch.object(requests, 'get', side_effect=Timeout)
    def test_get_holidays_timeout(self, mocked_get):

        with self.assertRaises(Timeout):
            get_holidays()
```

## Common Problems

- Changes to object interfaces
- Changes to external dependencies

## Spec List

```python
In [2]: from unittest.mock import Mock

In [3]: calendar = Mock(spec=['is_weekday', 'get_holidays'])

In [4]: calendar
Out[4]: <Mock id='4436584656'>

In [5]: calendar.is_weekday()
Out[5]: <Mock name='mock.is_weekday()' id='4394641168'>

In [6]: calendar.is_weekdayy()
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
Cell In[6], line 1
----> 1 calendar.is_weekdayy()

File ~/.asdf/installs/python/3.11.7/lib/python3.11/unittest/mock.py:653, in NonCallableMock.__getattr__(self, name)
    651 elif self._mock_methods is not None:
    652     if name not in self._mock_methods or name in _all_magics:
--> 653         raise AttributeError("Mock object has no attribute %r" % name)
    654 elif _is_magic(name):
    655     raise AttributeError(name)

AttributeError: Mock object has no attribute 'is_weekdayy'
```

## Spec Module

```python

In [9]: import my_calendar

In [10]: calendar = Mock(spec=my_calendar)
In [12]: calendar.is_weekday()

Out[12]: <Mock name='mock.is_weekday()' id='4440262544'>

In [13]: calendar.is_weekdayy()
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
Cell In[13], line 1
----> 1 calendar.is_weekdayy()

File ~/.asdf/installs/python/3.11.7/lib/python3.11/unittest/mock.py:653, in NonCallableMock.__getattr__(self, name)
    651 elif self._mock_methods is not None:
    652     if name not in self._mock_methods or name in _all_magics:
--> 653         raise AttributeError("Mock object has no attribute %r" % name)
    654 elif _is_magic(name):
    655     raise AttributeError(name)

AttributeError: Mock object has no attribute 'is_weekdayy'
```

## Autospec

```python
In [14]: from unittest.mock import create_autospec

In [15]: calendar = create_autospec(my_calendar)

In [16]: calendar
Out[16]: <NonCallableMagicMock spec='module' id='4354278288'>

In [18]: calendar.is_weekdayy()
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
Cell In[18], line 1
----> 1 calendar.is_weekdayy()

File ~/.asdf/installs/python/3.11.7/lib/python3.11/unittest/mock.py:653, in NonCallableMock.__getattr__(self, name)
    651 elif self._mock_methods is not None:
    652     if name not in self._mock_methods or name in _all_magics:
--> 653         raise AttributeError("Mock object has no attribute %r" % name)
    654 elif _is_magic(name):
    655     raise AttributeError(name)

AttributeError: Mock object has no attribute 'is_weekdayy'
```

```python
In [24]: from unittest.mock import patch

In [25]: with patch('__main__.my_calendar', autospec=True) as calendar:
    ...:     calendar.is_weekday()
    ...:     calendar.is_weekdayy()
    ...:
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
Cell In[25], line 3
      1 with patch('__main__.my_calendar', autospec=True) as calendar:
      2     calendar.is_weekday()
----> 3     calendar.is_weekdayy()

File ~/.asdf/installs/python/3.11.7/lib/python3.11/unittest/mock.py:653, in NonCallableMock.__getattr__(self, name)
    651 elif self._mock_methods is not None:
    652     if name not in self._mock_methods or name in _all_magics:
--> 653         raise AttributeError("Mock object has no attribute %r" % name)
    654 elif _is_magic(name):
    655     raise AttributeError(name)

AttributeError: Mock object has no attribute 'is_weekdayy'
```

