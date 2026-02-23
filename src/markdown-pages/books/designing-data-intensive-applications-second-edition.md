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

## Storage and Retreival

This is fundamental to databases.

An important tradeoff in storage systems: well-chosen indexes speed up read queries, but every index slows down writes. This is why developers have to choose carefully.

### Hash Indexes

Much like a key value dictionary. 

- Simplest is to keep an in-memory hash map where every key is mapped to a byte offset in the data file. 
- Every append updates the hashmap.
- Used in Bitcask
- Eventually disk space is an issue. Breaking into segments is a good solution. 

Compaction can keep sizes in check. When it reaches a certain sizxe, merging into a new file simplifies. 

- Segments are never modified are write
- The merging and compaction is done in a background thread, and reads are served from old files.
- After merging is complete, the reads are switched over

Issues to Solve:

- File format: CSV is not the best format for a log. It's faster and simpler to use a bianry format that first encodes the length of a string in bytes, followed by the raw string (without a need for escaping)
- Deleting records: If you want to delet ea key and its associated value, you have to append a special deletion request record, sometimes called a tombstone. Then segments are merged, the tombstone tells the mergin gprocess to discard any previous values for the deleted key. 
- Crash recovery: If the DB is restarted, the in-memory hash maps are lost. In principle, you can restore each segments hash map by reading the entire segment file from beginning to end and noting the offset of the most recent valu7es for each key. That's slow. Bitcask speeds this up by storing a snapshot of each segments hashmap on disk.
- Partially written records: The DB may crash at any time, including halfway through appending a record. Bitcask included checksums, allow corrupted logs to be ignored.
- Concurrency control: As writes are appended to the log in sequential error, a common choice is only one writer thread. This is append-only, immutable writes, so they can be read concurrently.

Limitations:

- The hash table must fit in memory
- Range queries are not efficient

## SSTables and LSM-Trees

SSTables requires a sort of the keys, making lookups faster.

- Merging segments is simple and efficient. Even when larger than memory. Using mergesort, you start reading the file on both sides and look at the first key in each file, copy the lowest kkey to the output file and repeat. 
- Because each segment contains all values written to the db during some period of time, all values in one imput segment are more recent than another. We can keep more recent and discard old. 
- You no longer need to keep aqn index of all keys in memory. Just chosen ones.
- Memory index can be sparse
- Since read requests need to scan over several key-value pairs in the requested range anyway, it's possible to group those records into a block and compress it before writing to disk. Reducing I/O bandwidth.

Constructing and Maintaining SSTables

- Maintaining on disk is possible, but in-memmory is easier
- Well known data structures such as red-black trees or AVI trees

- When a write comes in, add it to an in-memory balanced tree data structure
- When the memtable gets biggert than some threshold, write to disk as an SSTable (typcially a few MB)
- In order to serve a read request, first try to find the key in the memtable, then in most recent on-disk segment
- From time to time, run a merging and compaction process

Limiations

- If db crashes, the most recent writes, are lost. In order to avoid that keep a separate log on disk to which every write is immediately appended, just like before. 

### Making an LSM-tree out of SSTables

- This describes what LevelDB and RocksDB use. 
- LevelDB can be used in Riak as an alternative to Bitcask.
- Similar storage engines are used in Cassandra and HBase. Both inspoired by Google's BitTable paper. 
- Originally descirbed in a paper by Patrick O'Neil under the name Log-Structured Merge-Tree or LSM-Tree
- Lucene, an indexing engine for full-text search, used by ElasticSearch and Solr, use a similar method for storing it's term dictionary

### Performance Optimizations

LSM can be slow looking up keys that do not exist in the DB. Engines often use Bloom filters to optimize. 

There are also strategies to determine: the order and timing of how SSTables are compacted and merged. 

## B-Trees

- The more common type of index.
- Sorted by key
- Breaks the DB down into fixed size blocks or pages. Traditionally 4kb in size. Reed one page at a time.
- Each page can be identified using an address or location, which allows one page to refer to another, similar to a pointer. On disk isntead of memory.
- Page references can contruct a tree of pages.
- The root node knows the child pages, pagtes contain several keys and references to child pages.
- The number of references to child pages in one page of the B-tree is called the branching factor.
- To update a value, find the leaf page containing the key and update. The references are maintained.
- To add a new key, fidn the page whose range encompasses the new key and add it to the page. If there isn't enough free space, split it into two half-full pages and the parent is updated to account for the new subdivison. 
- Ensures trees are balanced. Always a depth of O(log n).
- Most db can fit a B-tree that is 3-4 levels dep. A four level tree of 4KB pages with a branching factor of 500 can store up to 250TB

Making B-trees reliable. 

- The basic underlying write operation of a B-tree is to overwrite a page on disk with new data. 
- It is assumed that the overwrite does not change the location of the page.
- Some operations require several pages to be overwritten. This is dangerous if the db crashes. 
- Using a WAL-log (write-ahead log) or a redo log, helps with recovery
- Has to be threadsafe, usually with a lock or latches. 

Optimizations

- Instead of overwriting pages and maintaining a WAL, some like LMDB, use a copy on write scheme. 
- We can save space in pages by not storign the entire key, but abbreviating it. Higher branching factor, and fewer levels. 
- Pages can be positioned anywhere on disk, laying out in sequential order on disk can help but be difficult to maintain.
- Additional pointers have been added to the tree.
- Fractal trees borrow some log-structured ideas to reduce disk seeks

## Comparing B-trees and LSM trees

- LSM is newer 
- LSM has faster writes, b-trees are faster for reads
- B-trees have to write twice and sometimes save twice.
- LSM has write amplificaiton, which impacts the lifetime of an SSD
- Write heavy is IO bound
- LSM compresses better
- Many SSDs use log structured algorithm to turn random writes into sequential writes on the underlaying chips
- Compaction process of LSM can sometimes interfere with the performance of ongoing reads and writes
- LSM compaction can impact disk throughput
- B-trees align with transactional, cache key exists in one place
- 

## Storing values within the index

The value can be one of two things: actual row or a reference to where it's stored. In the latter case, it's stored in a heap file in no particular order. 

- When updating without changing a key, it can be efficient. 
- Sometimes the extra heap hop is too slow
- A compromise between a clustered and non-clustered index is known as a covering index. Some use the index alone. 

## In-memory

- Memcached is in-memory key-value, intended for caching only
- Research indicates that in-memory can be larger than memory with an anti-caching approach

## Stars and Snowflakes

- Data warehouse techniques
- Dimensional modeling with a fact table is star
- Snowflake is a variation, where they are broken down into sub-dimensions

## Column based

- Don't store all the values from one row together, but store each column together instead. 

### Column Compression

- Compressing data is well supported
- Use a bitmap
- Column families are not the same. Used in Cassandra and HBase

### Sorting

- Doesn't matter too much

## Aggregation and Materialized Views

- Used in data warehouses
- Denormmalizes data for faster reads
- Writes update mutliple locations



