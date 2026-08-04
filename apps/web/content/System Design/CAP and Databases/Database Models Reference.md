---
tags:
  - topic/data-modeling
  - topic/databases
type: note
aliases:
  - Database Models
  - Database Model Types
---

related:: [[Databases]], [[ACID]], [[BASE]]

# Database Models Reference Note


## 1. Row-Oriented Models (Tuple Models)

- **Technical Explanation:** Records (tuples) are stored contiguously in disk or memory, keeping all attributes of a single record in sequence. They typically utilize **B-Tree** structures—multi-way trees that are wide and shallow—to manage large volumes of data and allow for searches, updates, and deletions in logarithmic time.
- **Tradeoffs:** They favor **point-to-point operations** on a single entity (reading/writing a full record) and prioritize **[[ACID]]** compliance (Atomicity, Consistency, Isolation, Durability). However, they are difficult to scale horizontally; adding more replicas increases commit latency because the system must wait for a quorum of nodes to confirm the transaction.
- **Use Cases:** Critical transactional systems where data integrity is paramount, such as **banking**, stock trading, and inventory management.
- **Examples:** MySQL, PostgreSQL, SQL Server.

## 2. Document Models

- **Technical Explanation:** Data is treated as autonomous entities stored in flexible, schema-less formats like **JSON or BSON**. These models often group related data within the same object to avoid expensive JOINs and frequently use **inverted indices** (mapping terms to documents) to enable fast full-text searches.
- **Tradeoffs:** They offer high **schema flexibility**, allowing data structures to evolve without complex migrations. The primary risk is potential **inconsistency** in data types and contracts, which must be handled by the application logic rather than the database engine.
- **Use Cases:** Product catalogs, customer history, log aggregators, and **CQRS** (Command Query Responsibility Segregation) implementations.
- **Examples:** MongoDB, Elasticsearch.

## 3. Column-Oriented (Columnar) Models

- **Technical Explanation:** Each column of a table is stored contiguously in storage, rather than storing entire rows together. This allows the engine to retrieve only the specific attributes needed for a query, significantly reducing disk I/O.
- **Tradeoffs:** They are highly efficient for **data compression** (since values in a column are often similar) and performing bulk mathematical operations. However, they are inefficient for transactional tasks that require reading or updating a single complete row.
- **Use Cases:** **Big Data**, Data Warehousing, and analytical processes like calculating sales averages or segmenting audiences.
- **Examples:** Amazon Redshift, Google BigQuery.

## 4. Wide-Column Models

- **Technical Explanation:** These maintain the row concept, but each record can contain a different set of columns organized into **column families**. They often utilize **LSM-Trees (Log-Structured Merge-Trees)**, where writes are added to an append-only log in memory before being flushed to immutable files on disk, ensuring very high write performance.
- **Tradeoffs:** Optimized for **massive horizontal scalability** (thousands of nodes) and high write throughput. The main tradeoffs are **eventual consistency** and limited support for JOINs and atomic transactions across different column families.
- **Use Cases:** IoT sensor data, social media feeds, audit trails, and large-scale time-series tracking.
- **Examples:** Cassandra, ScyllaDB, DynamoDB.

## 5. Key-Value Models

- **Technical Explanation:** The simplest [[NoSQL]] model, storing data as a collection of unique keys paired with values (strings, JSON, or blobs). They use **hash indexing**, where a hash function converts a key into a specific address (bucket) for near-instant retrieval.
- **Tradeoffs:** They provide **extreme performance** and are very easy to distribute across clusters for high availability. However, query capabilities are limited to exact matches on the known key; they are not suited for complex range searches.
- **Use Cases:** **Caching** systems, user session management, and highly volatile data that can be reconstituted if lost.
- **Examples:** Redis, Memcached, Valkey.

## 6. Graph-Based Models

- **Technical Explanation:** These models treat **nodes** (entities) and **edges** (relationships) as first-class objects. Relationships are stored physically, allowing the engine to traverse complex networks of connections without the heavy computational cost of relational JOINs.
- **Tradeoffs:** Highly performant for discovering deep connections, but performance is sensitive to the **cardinality and complexity** of the vertices and patterns being queried.
- **Use Cases:** **Recommendation engines**, social network analysis, fraud detection, and complex logistics.
