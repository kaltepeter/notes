---
title: Designing Data Intensive Applications
date: 2025-09-13
tags:
  - book
  - data
---

https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/

## Foundataions of Data Systems

### Type of Data

- Database
- Cache
- Search Index
- Stream Processing
- Batch Processing

### Reliability

The system should continue to work correctly (performing the correct function at the desired level of performance) even in the face of adversity (hardware or software faults, and even human error)

- tolerate hardware and software faults
- human error

### Scalability

As the system grows (in data volume, traffic volume, or complexity), there should be reasonable ways of dealing with that growth.

- measureing load and performance
- latency percentiles, throughput

### Maintainability

Over time, many different people will work on the system (engineering and operations, both maintaining current behavior and adapting the system to new use cases), and they should all be able to work on it productively.

- operability, siplicity, and evolveability

### Fault vs. Failure

- Fault is when it deviates from the spec.
- Failure is when the system stops responding under load.

### Latency vs. Response Time

- Latency is the time waiting to fulfill
- Response time is total time.

## Data Models and Query Languages

| SQL                                         | NoSQL                                                    |
| ------------------------------------------- | -------------------------------------------------------- |
| Impedence mismatch with OOP                 | High Locality                                            |
| Added JSON and XML later                    | Better JSON Support                                      |
| Relational                                  | Scalability on very large datasets and high write apps   |
| Strict Schema                               | Flxible or Dynamic Schema                                |
| Normalized                                  | Denormalized                                             |
| Many-to-one and Many-to-Many well supported | Limits on Many-to-Many, Embedding with doc size concerns |
| ORM reduce impedence mismatch               | ORM may help                                             |
| Index = Path                                |                                                          |
| Schema on Write                             | Schema on Read                                           |
| Functions                                   | Map Reduce                                               |
| Declarative Language                        | Declarative Language                                     |

| Hierarchical                             | Network      | Graph                                                         |
| ---------------------------------------- | ------------ | ------------------------------------------------------------- |
| 1 Parent                                 | N-Parents    | N-Edges                                                       |
| Tree                                     | Network      | Graph                                                         |
| IBM's IMS                                | CODASYL      | Neo4J, etc.                                                   |
| Stock Keeping, Business Process          |              | Social, Web, Road or Rail                                     |
| Parent/Child with schema on record types | Parent/Child | Heterogenus Relations                                         |
| One path                                 |              | Unique ids and many paths                                     |
| Ordered                                  |              | Unordered                                                     |
| Imperative queries that break            |              | Can be imparative, supports delcarative like Cypher or SPARQL |

- All Require path traversal and algorithms

### Schema on Read vs. Schema on Write

- READ (SQL)
  - Slow schema changes, especially with MySQL
- WRITE (NoSQL)
  - Different object types in same table
  - Structure is determined by external systems

### Graph

A graph consists of two kinds of objects: vertices (also known as nodes or entities) and edges (also known as relationships or arcs). Many kinds of data can be modeled as a graph

### Property Graphs

- Vertex

  - A unique identifier
  - A set of outgoing edges
  - A set of incoming edges
  - A collection of properties (key-value pairs)

- Edge
  - A unique identifier
  - The vertex at which the edge starts (the tail vertex)
  - The vertex at which the edge ends (the head vertex)
  - A label to describe the kind of relationship between the two vertices
  - A collection of properties (key-value pairs)

### Query Language

Cypher is a declarative query language for property graphs, created for the Neo4j graph database. (It is named after a character in the movie The Matrix and is not related to ciphers in cryptography

Can you build graphs in SQL?

- Yes, but the query is complex and likely slow.

### Triple-Stores and SPARQL

In a triple-store, all information is stored in the form of very simple three-part statements: (subject, predicate, object). For example, in the triple (Jim, likes, bananas), Jim is the subject, likes is the predicate (verb), and bananas is the object.

- Subject is equivelent to a vertex in a graph.
- Object is either:
  - A value in a primitive datatype, such as a string or a number. In that case, the predicate and object of the triple are equivalent to the key and value of a property on the subject vertex. For example, (lucy, age, 33) is like a vertex lucy with properties {"age":33}.
  - Another vertex in the graph. In that case, the predicate is an edge in the graph, the subject is the tail vertex, and the object is the head vertex. For example, in (lucy, marriedTo, alain) the subject and object lucy and alain are both vertices, and the predicate marriedTo is the label of the edge that connects them.
- SPARQL
  - SPARQL is a query language for triple-stores using the RDF data model. (It is an acronym for SPARQL Protocol and RDF Query Language, pronounced “sparkle.”) It predates Cypher, and since Cypher’s pattern matching is borrowed from SPARQL, they look quite similar

### Datalog

Datalog is a much older language than SPARQL or Cypher, having been studied extensively by academics in the 1980s. It is less well known among software engineers, but it is nevertheless important, because it provides the foundation that later query languages build upon.

## Storage and Retrieval

Databases need to do two things:
- When given data, it should store it
- When you ask for it again, it should give the data back to you

Optimize for two types of data:
- transactional
- log

### Indexes

- Optimize reads
- Additional structure
- Any index usually slows down writes. Choose wisely.

#### Hash Indexes

- Key/Value pairs
- If only appending to a file. Simple strategy is to track each byte offset of keys. Like Bitcask.
- Limitation: hash table must fit in memory, so if you have a very large number of keys, your out of luck. It's difficult to make on disk hash perform well. It requires a lot of random access I/O, it is expensive to grow when it becomes full, and hash collisions require fiddly logic.
- Limitation: Range queries are not efficient.

#### SSTables and LSM-Trees
- Sequence of key/value pairs is sorted by key. This is Sorted String Tabls (SSTable).
- Cannot append in any order
- Advantage: Merging segments is simple and efficient, even if the files are bigger than available memory. Similar to mergesort algorithm.
- Advantage: In order to finda  particular key in the file, you no longer need to keep an index of all the keys in memory. e.g. looking for handiwork, don't know the exact offset of that key in the segment file. You do know th eoffsets for keys handbag and handsome and it's sorted, handiwork must appear between the two. You still need in-memory index for some keys, but it can be sparse. 
- Advantage: Since read requests need to scan over several key-value pairs in the requested range anyway, it is possible to group those records into a block and compress it before writing to disk.
- 

### Log Based

- Fast writes, just appends
- Slow reads, has to iterate
- File format: CSV is not the best, faster/easier to use binary format that first encodes the length of a string in bytes, followed by the raw string.
- Delete: if you want to delete a key and it's vaule, you have to append a special deletion record to the data file, sometimes called a tombstone. When merging the tombstone tells the merge process to discard any previous values for the deleted key.
- Crash Recovery: If the database is restarted the in-memory has maps are lost. Having to rebuild from log can be slow. Bitcask speeds up recoery by storing a snapshot of each segment's hash map on disk, which can be loaded into memory more quickly. 
- Partially written records: The database may crash at any time, including halfway through appending a record to the log. Bitcask files include checksums, allowing such corrupted parts of the log to be detected and ignored.
- Concurrency control: as writes are appended to the log in a strictly sequential order, a common implementation choice is to have only one writer thread. Data file segments are append-only and otherwise immutable, so they can be read concurrently.


#### Append Only

What about when you eventually run out of disk space?

Break the log into segments of a certain size by closing a segment fille when it reaches a certain size, and making subsequent writes to a new segment file.

This makes compaction possible. This allows deleting duplicate data and merging several segments together.

## Data Models and Query Languages

### Storage and Retreival

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

