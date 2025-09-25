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



- 
