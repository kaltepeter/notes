---
title: Algorithmic Trading with Python, Statistics, and Pandas
date: 2024-01-25
tags:
- machine-learning
- course
- mammoth-interactive
---


<https://iexcloud.io/console/home>
<https://iexcloud.io/docs/core/QUOTE>

## API Calls

Slow version

```python
stocks_columns = ['Ticker', 'Price', 'Market Capitalization', 'Shares to Buy']
stocks_dataframe = pandas.DataFrame(columns=stocks_columns)

for symbol in stocks_table['Symbol']:
  api_url = f"https://api.iex.cloud/v1/data/core/quote/{symbol}?token={IEX_CLOUD_API_TOKEN}"
  data = requests.get(api_url).json()[0]
  print(data)

  stocks_dataframe = stocks_dataframe.append(pandas.Series([symbol,
                                                          data['latestPrice'],
                                                          data['marketCap'],
                                                          'N/A'],
                                                          index=stocks_columns),
                                            ignore_index = True)

print(stocks_dataframe)
```

Batching

```python
def split_list(list, number_per_group: int):
  for index in range(0, len(list), number_per_group):
    yield list[index:index+ number_per_group]

stock_symbol_groups = list(split_list(stocks_table['Symbol'], 100))
print(stock_symbol_groups)

stock_symbol_strings = []

for index in range(0, len(stock_symbol_groups)):
  stock_symbol_strings.append(','.join(stock_symbol_groups[index]))


```

Write to Excel

<https://xlsxwriter.readthedocs.io/getting_started.html>

```python
!pip install XlsxWriter

import xlsxwriter

excel_writer = pandas.ExcelWriter('stocks.xlsx', engine='xlsxwriter')

batch_stocks_dataframe.to_excel(excel_writer, sheet_name="S&P 500 Stocks", index = False)
excel_writer.save()
```

