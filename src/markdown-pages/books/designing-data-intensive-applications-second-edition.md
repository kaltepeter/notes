---
title: Designing Data Intensive Applications Second Edition
date: 2026-02-23
tags:
  - book
  - data
---

https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/

## Trade-Offs in Data Systems

> We call an application data-intensive if data management is one of the primary challenges in developing the application [1]. While in compute-intensive systems the challenge is parallelizing a very large computation, in data-intensive applications we usually worry more about things like storing and processing large data volumes, managing changes to data, ensuring consistency in the face of failures and concurrency, and making sure services are highly available. --https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/ch01.html

- Store data. Databases
- Cache. Remember results of expensive operations
- Search and Indexing
- Stream/event processing.
- Batch processing. Periodically crunch a large amount of accumulated data

Challenges

- Different people need to do different things with data

### Operational vs. Analytical Systems

`Operational`: systems consisting of backend services and data infrastructure where data is created. Typically read and write for applicaitons.

`Analytical`: used by business analysts and data scientists, usually read only data and optimized for gaining insights.

### Characterizing Transaction PRocessing and Analytics

`transactions`: come from the days of banking and data processing, making a sale, placing an order, etc. It now wraps datga that is low-latency reads and writes.

`OTLP`: Online Transaction Processing is a pattern of a query to filter data, user interacting to read or update data.

`OLAP`: Online Analytical Processing is a pattern of using aggregaqte data and queries to analyze larger amounts of data. e.g. BI tools

| Property             | OTLP                                          | OLAP                                      |
| -------------------- | --------------------------------------------- | ----------------------------------------- |
| Main read pattern    | Point queries (fetch by key)                  | aggregate over large number of records    |
| Main write pattern   | Create, update, and delete individual records | Bulk import (ETL) or event stream         |
| Human user example   | End user of web/mobile application            | Inernal analyst, for decision support     |
| Machine user example | Checking if an action is authorized           | Detecting fraud/abuse patterns            |
| Type of queries      | Fixed, predefined by application              | Artibraty, ad-hoc exploration by analysts |
| Query volume         | Lots of small queries                         | Few queries, each is complex              |
| Data represents      | Latest state of data (current point in time)  | History of events that happened overtime  |
| Dataset size         | Gigabytes to terabytes                        | Terabytes to petabytes                    |

### Data Warehouses

Using the same databases for OTLP and OLAP can cause bottlenecks and be difficult. Overtime data warehouses became more common.

Reasons Data Analysts shouldn't query OTLP:

- The data of interest might be spread across systems
- The kinds of schemas and layou7ts are not good for analytics
- Analytical queries can be expensive and impact other users
- The OTLP systems might reside in a separate network.

Using ETL (Extract-Transform-Load) tools we can aggregate many data sources into a data warehouse. These can be automated and periodically synced. Hybrid transactional/analytical processing (HTAP) can support both but it's still common to separate the use cases.

THere are many people using SQL and relational for ML, though it's not usually preferred by data scientists and others. Datalakes are the next level when relational databases aren't as useful.

`data lake`: a centralized data repository that holds a copy of any data that might be useful for analysis, obtained from operational systems via ETL processes.

ETL processes are a pipeline to get data into a datalake. Datalakes also contain raw data.

https://dataopsmanifesto.org/en/ - manifesto on data ops, governance, etc.
  - Continually satisy your customer
  - Value working analytics
  - Embrace change
  - It's a team sport
  - Daily interactions
  - Self organixe
  - Reduce heroism
  - Reflect
  - Analytics in code
  - Orchistrate
  - Make it reproducible
  - Disposable environments
  - Simplicity
  - Analytics in manufacturing
  - Quality is paramount
  - Monitor quality and performance
  - Reuse
  - Improve cycle times
  - Start with your data journey

Streams of data open more doors.

Reverse ETL invovles getting data into an operational system. e.g. ML model that was trained on analytical data deployed to production.

### System of Record and Derived Data

`system of record`: source of truth, is the original data. When updated, derived data will need an update.

`derived data`: is the result of taking existing data from another system and transforming or processing it in some way. Redundent, but optimized.

### Cloud vs. Self Hosting

A business decision.

> Ultimately, this is a question about business priorities. A common rule of thumb is that things that are a core competency or a competitive advantage of your organization should be done in-house, whereas things that are non-core, routine, or commonplace should be left to a vendor [20]. To give an extreme example, most companies do not fabricate their own CPUs, since it is cheaper to buy them from the semiconductor manufacturers. --https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/ch01.html#sec_introduction_derived

Cloud is usually cheaper/easier overall. The exception is existing infrastructure and teams. The downside is less control over features and cost.

Cloud native provides things you could self host through cloud providers.

| Operational | MySQL, PostgreSQL, MongoDB | AWS Aurora, Azure SQL DB Hyperscale, Google Cloud Spanner |
| Analytical | Teradata, ClickHouse, Spark | Snowflake, Google BigQuery, Azure Synapse Analytics |

Usually use other cloud storage such as S3, Blob Storage and Cloudflare for large files. 

Traditional compute has durable storage, cloud does not.

### Distributed Systems

- Inherit distribution
- Requsts between cloud services
- Fault taulerance/high availability
- Scalability
- Latency
- Elasticity
- Specialized hardware
- Legal compliance
- Sustainability

Distibuted systems have to daal with failures between systems, debugging can be harder.

### Microservices and Serverless

- Original SOA morphed into microservices and serverless
- API management is a challenge
- Serverless is FaaS (Function as a Service), smaller yet

### Supercomputing

- HPC, high performance computing
- Standard practice if a node fails is pause, restore, and pickup from that point
- Shared memory, requirs high trust
- Special network topologies

### Data Systems, Law, and Society

- Since 2018, GPDR has given Europeans more rights on data
- We store data when we think the costs of storage are less than the value
- Storing data has legal risks if sensitive

## Defining Nonfuctional Requirements

https://grugbrain.dev/

https://www.sitepoint.com/did-rails-sink-twitter/

`repsonse time`: the elapsed time from the moment when a user makes a request until they receive the answer

`throughput`: number of requests per second, or the data volume per second.

`service time`: duration in which the service is actively processing

`queuing delays`: waiting for I/O

`latency`: catall term during which a request is not actively processed

If a server is crushed by throughput, that can be made worse with a rety storm of pending requests. To reduce issues these patterns may help:

- exponential backoff
- circuit breaker
- token bucket alogrithm
- load shedding
- backpressure
- queueing and load balancing

Users usually care about response time, compute usually cares about throughput. 

### Average, Median, and Percentiles

Average response time is often meaningless, it's the mean. Percentiles will give distributions of P50, P95, P99, and P9999. 

Slow Response times can affect purchases or conversion rates.

Set your Service Level Objectives (SLOs) for endpoints in dashboards and monitoring tools.

### Reliability and Fault Tolerance

`fault`: occurs when a particular part of a system stops working correctly.

`failure`: occurs when the whole system stops providing the required service to the user, violating the SLO

`fault tollerant`: means the system can handle various faults

`single point of failure`: a single fault takes the system down

Testing invovles deliberately creating faults or chaos testing.

Hardware faults can be tolerated with redundency

Use blameless post mortems to find root causes. 

Be suspicious of simple answers

Poor testing can cause legal issues or law suits. 

### Scalability

The ability for a system to cope with increased load.

Understanding load is critical to understanding scalability. 

Determine if the DB is read or write heavy. 

### Shared-Memory, Shared-Disk, and Shared-Nothing

Shared-memory or vertical scaling increase threads and CPU

Shared-disk shared fast disk and nothing else

Shared-nothing is horizontal scaling and common with distributed systems



