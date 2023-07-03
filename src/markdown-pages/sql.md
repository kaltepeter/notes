---
title: SQL
date: 2023-06-11
tags:
- database
- sql
---

## Basics

`LIKE '%my_string%'` find where the string contains 'my_string'


## Stats

- <https://towardsdatascience.com/how-to-derive-summary-statistics-using-postgresql-742f3cdc0f44>

- `AVG(duration_minutes) AS mean` calculate the mean
- `PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY duration_minutes) AS median` calculate the median
- `MIN(duration_minutes) AS min` calculate the min
- `MAX(duration_minutes) AS max` calculate the max
- `MAX(duration_minutes) - MIN(duration_minutes) AS range` calculate the range
- `ROUND(STDDEV(duration_minutes), 2) AS standard_deviation` calculate the standard deviation
- `ROUND(VARIANCE(duration_minutes), 2) AS variance` calculate the variance
- `ROUND(POWER(STDDEV(duration_minutes), 2), 2) AS variance_using_stddev` calculate the variance as suqare of standard deviation
- `PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY duration_minutes) AS q1` calculate the 25th percentile as q1
- `PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY duration_minutes) AS q3` calculate the  75th percentile as q3
- `PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY duration_minutes) -  PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY duration_minutes) AS iqr` calculate the IQR (difference between q3 and q1)
- `ROUND(3 * (mean - median)::NUMERIC / stddev, 2) AS skewness` calculate skewness (3 * (mean - median) / standard_deviation)
- `count(*)` count number of rows in query, including null and duplicates
- `count(col_name)` count the number of rows in a query, excluding null
- `count(DISTINCT col_name)` count the number of non-null values in the column.
