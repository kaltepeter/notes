---
title: "FEM: Fullstack System Design"
date: 2025-11-06
tags:
  - workshop
  - front-end-masters
  - 
---

https://frontendmasters.com/workshops/fullstack-system-design/

## Tools

- https://app.diagrams.net/

## Diagramming

### Pizza Shop

1. Customer places an order
1. Resteraunt receives the order
1. Staff takes the order after completing other orders
1. If missing ingredients, has to prepare/acquire them
1. Order ready: delivery or in store
1. Customer receives order

Pizza Ordereed

```mermaid
graph TD
   A1[Cusomter Places Phone Order] --> C{Order Received}
   A2[Cusomter Places Website Order] --> C{Order Received}
   A3[Cusomter Places In Store Order] --> C{Order Received}
   B[Take Payment]
   C[Staff Receives Order]
   C --> |Staff Busy| C
   C --> |Has Ingredients| D
   C --> |Missing Ingredients| D
   D[Staff Makes Order] --> E
   E[Counter or Delivery Receives Complete Order]
   E --> |Paid| F
   E --> |Needs payment| B --> E
   F[Customer Gets Order]
   G[Acquire/Prepare Ingredients] --> D

```

### Flow

```mermaid
graph TD
    A[Client]
    A --> |Cache Hit| C
    A --> |Cache Miss| B(Send Request)
    B[Load Balancer or CDN] --> D
    C@{ shape: diamond, label: "Cache" } --> A
    D[Server]
    D --> |Cache Hit| A
    D --> |Cache Miss| F(Return Data)
    E@{ shape: diamond, label: "Cache" }
    F@{shape: cyl, label: 'Database'} --> E
```

## Translating Business Requirements

### TODO App

- What is actually needed?

- Create a TODO
- Read a TODO or list
- Update a TODO
- Complete a TODO
- Delete a TODO


### Mobile Banking

- How realtime?
- 

- Manage Users: CRUD
- Authenticate a User
- Authorize a User
- Display recent transactions
- Display historical transactions
- Make a payment
- Transfer money
- Withdraw money
- Show Balance
- Apple/Google Pay

Non-functional

- performant, very fast
- live data
- secure

### URL Shortener

Questions:
- Can users customize the shortened URL?
- How long are short URLs persisted?
- What about keys/duplicates?
- What happens if the site is no longer available?
- How long is too long for short?
- HTTPS?
- Performance expectations
- Can a URL change?
- Can a URL be deleted?

Functional:
- Users should be able to convert long URL's into shortened versions
- 

### TODO App

Functional
- tasks can only be text
- users should be able to:
    - read their todos
    - edit todos
    - create new todos
    - mark a todo as complete
    - delete a todo
    - reorder todos
    - create a list
    - edit list
    - filter or sort
    - delete a list
    - ~~share a list~~
    - create account
    - login

non-functional
- only authenticated users can access tasks
- task oeprations must complete within 1000ms
- 

## CAP Theorem

- Realiability: ability for a system to function correctly over time
- Availability: proportion of time a system is operational and accessible
- Resiliency: how well does the system handle failures
- Consistency: how do we ensure that all the users see the same data at the same time

Distributed systems can only guarentee 2 of 3 at a time.

Consistency: every read receives the most recent write on error
Availability: a request for data gets a response, even if one or more nodes are dow
Partition Tolerance: the cluster must continue to work despite any number of communication breakdowns between nodes in the system.

- ~~C + A: only works without network issues~~
- C + P: Always show the latest data but unreliable performance
- A + P: Always responds but might who outdated data

## Non-functional Requirements

### Mobile Banking

- How many MAU's?
- How many transactions per user?
- How often do users have to transfer money, i.e. write through the app
- How often do the users use the app per month?
- 

Non-functional
- the system should have 4 nines of availability
- transactions should be backed up daily
- transaction data must be encrpyted in transit at rest
- transactions cannot be lost
- every transaction and user action must be audited

### URL Shortener

- How many MAUs?
- What is the average requests per second?
- What is the maximum latency allowed?
- What is the max length of the URL?
- Do URL's expire?

Non-functional
- Redirects should happen in no more than 500ms
- the system should support 1 million RPS
- long URLS can be at most 3kb
- short urls can at most 0.3kb
- 

## Modeling

```mermaid
graph LR
  A[Requirements] --> B
  B[Entity Modeling] --> C
  C[API Design] --> D
  D[Endpoints Optional]
```

Entities

```mermaid
erDiagram
    USER ||--o{ TASK : has
    USER ||--o{ LIST : has
    USER {
        string username
        string password
        string id
    }
    TASK {
        string contents
        string status
        string id
    }
    LIST }|..o{ TASK: contains
    LIST {
        string description
        string tasks
        string id
    }
```

## Protocols
- HTTP: stateless, simple, human readable, supported by all browsers
- Websockets: bi-directional communication, peristent connection
- Server Side Events: one way communication (server to client), human readable
- gRPC: binary protocol (HTTP/2), Strongly-types contracts
- REST: multiple endpoints, human readable, supported by all, stateless
- GraphQL: single endpoint, precise data retrieval, self documenting API, strongly typed

```mermaid
graph LR
    A[Is this internal service-to-service communication?] --> |Yes| E
    A --> |No| B
    B[Do you read need realtime updates?] --> |Yes| C
    B --> |No| D
    C[Do you need bi-directional communication?] --> |Yes| F
    C --> |No| G
    D[Do you have complex data from many sources?] --> |Yes| H
    D --> |No| I
    E[consider gRPC]
    F[WebSockets]
    G[Server-Sent Events]
    H[GraphQL]
    I[REST]
```

## Database Scaling

### Partiioning

- Same DB
- Easier
- Transactional guarentees
- Queries span multiple tables

### Sharding

- Load balanced over different machines
- 

## Replication

- making copies of your data across multiple servers or locations
- increases fault tolerance
- increases read performance

### Primary / Replica

- All writes go to the primary server
- Replicas copy data from the primary and handle read requests
- If the primary fails, a replica can take over

```mermaid
graph LR
    A[Service] --> |READ| D
    B[Service] --> |WRITE| E
    C[Service] --> |READ| F
    D[Replica] --> |READ| E
    E[Primary]
    F[Replica] --> |READ| E
```

### Primary / Primary

- Multiple servers acept reads/writes
- Data is synchonized between all servers

```mermaid
graph LR
    A[Service] --> |READ/WRITE| D
    B[Service] --> |READ/WRITE| E
    C[Service] --> |READ/WRITE| F
    D[Primary] <--> E
    E[Primary] 
    F[Primary] <--> E
```

### Peer to Peer

- Every server can read and write
- Changes are shared with all other servers

```mermaid
graph LR
    A[Peer A] <--> D
    B[Peer B] <--> C
    C[Peer C]
    D[Peer D]
    A <--> B & C <--> D
```

### Strategies

- Transactional
- Snapshotting
- Merging

## Caching

### Cache Aside (Lazy Loading) READ

1. Cache miss
2. Read from database
3. Update Cache


```mermaid
graph LR
  A[Service] --> |3 WRITE| B
  A --> |2 READ| C
  B@{ shape: diamond, label: "cache" } --> |1| A
  C@{ shape: database, label: "database" }
```

### Cache Aside (Lazy Loading) WRITE

1. Write to database
1. Write to cache

```mermaid
graph LR
  A[Service] --> |1 WRITE| C
  A --> |2 WRITE| B
  B@{ shape: diamond, label: "cache" } 
  C@{ shape: database, label: "database" }
```

### Write Through

1. Write to cache
2. Write to DB

```mermaid
graph LR
  A[Service] --> |1 WRITE| B
  B@{ shape: diamond, label: "cache" } 
  B --> |2 WRITE| C
  C@{ shape: database, label: "database" }
```

### Read Through

1. Read from cache
2. on miss, read from db
3. write to cache

```mermaid
graph LR
  A[Service] --> |1 READ| B
  B --> |cache hit| A
  B@{ shape: diamond, label: "cache" }  --> |2 READ| C
  C@{ shape: database, label: "database" }
  C --> |3| B
```

### Write Behind

1. write to cache
2. immediately return
3. asynchronously, write to db

```mermaid
graph LR
  A[Service] --> |1 WRITE| B
  B --> |2| A
  B@{ shape: diamond, label: "cache" }  --> |3 WRITE| C
  C@{ shape: database, label: "database" }
```

### Cache Invalidation

- Time-based expiration (TTL)
- Event-based
- Version tagging
- Refresh ahead

### Cache Eviction

LRU is a double linked used.

- FIFO: first in first out
- LIFO: last in first out
- LRU: least recently used
- MRU: most recently used
- LFU: least frequently used
- RR: random replacement

## Estimations

- help ground vague requirements in reality
- helps you think about the speficis of the system components
- shows the interviewer your thought process
- don't have to be precise

### Strategy

- clarify
    - what are you estimating?
        - users, requests, storage
    - ask or make reasonable assumptions
        - how many users?
    - validate your assumptions
        - write it down
- do the math
- sanity check the results

## TODO System Design

Questions
- 

Requirements
- 

```mermaid
graph LR
    A@{shape: curv-trap, label: 'client'} -->B
    A -->|client| FEC
    FEC@{shape: diamond, label: 'cache'}
    B[reverse proxy] -->GO
    B -->WC
    subgraph GO
        direction TB
        D[web server]
        E[web server]
    end
    GO -->F
    F[load balancer]
    F --> C1
    F --> C2
    F --> C3
    WC[cache] --> AUS
    AUS[autoupdate server] -->F
    C1@{shape: diamond, label: 'redis cache'} -->|READ| DBR1
    C2@{shape: diamond, label: 'redis cache'}  -->|WRITE| DBW1
    C3@{shape: diamond, label: 'redis cache'}  -->|READ| DBR2
    DBR1@{shape: database, label: 'database'}
    DBR1 -->|READ| DBW1
    DBW1@{shape: database, label: 'database'}
    DBR2@{shape: database, label: 'database'}
    DBR2 -->|READ| DBW1
```

## Security

SSL./tls

- option 1: termination at load balancer
    - most common
    - application receives http
- option 2: termination at application layer
    - load balancer passes through encrypted traffic
    - each application instance handles decryption
- option 3: re-encryption
    - terminate at load balancer
    - re-encrypt between load balancer and applications

### Authentication 

Who are you?

### Authorization

Determines permissions, what can you do?

## Asynchorinicity

- help adders the challenge of working with computationally expensive tasks
- keep the system responsive

### Expensive Tasks

- uploading and processing a large video file
- generating a report
- processing payments
- image resizing or thumbnail creation

### Components

- message broker
    - rabbitMQ
    - kafka
- message queue
    - rabbitMQ
    - Amazon SQS
- worker management
    - kubernetes

## Video Upload Service

- supported resolutions / formats?
- is there a size limit?
- do we need generated thumbnails?
- how many users are uploading at once?
- do we need to process videos?
- do we need captions / subtitles
- do we need to process audio?

features

- up to 4k
- max filesize 4g
- 1 upload per user / day @ 1000 users
- yes thumbnails
- no trim/edit
- not today for captions
- yes on audio
- audio track is separate
- no perf metrics on upload speed

entities

```mermaid
erDiagram
    USER ||--o{ MANIFEST : has
    USER ||--o{ VIDEO  : uploads
    METADATA ||--o{ VIDEO : has
    METADATA ||--o{ AUDIO : has
    METADATA ||--o{ THUMBNAILS : has
    VIDEO
    THUMBNAILS
    AUDIO
    METADATA
    MANIFEST

    USER {
        string username
        string password
        string id
    }
```

- user gives a title
- user starts uploading a video
- user is notified when upload is successful
- process video
- user notified when processing complete
- 

```mermaid
graph TD
    C[client] -->|POST videos| W
    W[web server] -->|video| SV
    W --> MDB
    SV[source video storage] --> N
    N[notification service] -->|notify| P
    N -->|notify| C
    P[video processing service]
    subgraph B["`
        convert to 4k
        convert to HD
    `"]
        B1[queue]
        B2[queue]
    end
    B --> W
    MDB@{shape: database, label: "database"}
    MDB --> A
    A@{shape: database, label: 'audio'}
    subgraph W ["video broker"]
        W1[worker]
        W2[worker]
    end
    subgraph AB ["audio broker"]
        B1[queue]
        B2[queue]
    end
    AB --> AW
    subgraph AW
        W1[worker]
        W2[worker]
    end
    PV[processed video storage]
    PV -->|get video| SV
    PV --> B
```