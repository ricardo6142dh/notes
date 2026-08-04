---
tags:
  - area/system-design
  - topic/cap
  - topic/distributed-systems
type: note
aliases:
  - CAP Combinations
  - CP AP CA
---

related:: [[Consistency]], [[Availability]], [[Partition Tolerance]], [[PACELC]]

# CAP Combinations

## CP (Consistency and Partition tolerance)

This choice prioritize [[Consistency]] and [[Partition Tolerance]]
The system keep consistency thought all the nodes that keep working during an outage, when a partition occurs between 2 or more nodes, the system should be able to remove inconsistency nodes, turning then unavailable 

Eg: Financial systems, credit calculations, ticket booking, stock
### Examples

- [MongoDB](https://www.mongodb.com/)
- [Cassandra - Depending specific config](https://cassandra.apache.org/)
- [Couchbase](https://www.couchbase.com/)
- [Etcd](https://etcd.io/)
- [Consul](https://www.consul.io/)


## AP (Availability and Partition tolerance)

Within this module, our system prioritize high availability and partition tolerance sacrificing consistency.

When a network partition occurs, all nodes remain available for queries, regardless of their update status. Even during resynchronization processes, all nodes continue to respond to requests, potentially serving either up-to-date or outdated data.

### Examples
	
- [CouchDB](https://couchdb.apache.org/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [Cassandra - Depending specific config](https://cassandra.apache.org/)
- [SimpleDB](https://aws.amazon.com/simpledb/)

### CA

In this configuration, the system prioritizes consistency and request availability but becomes sensitive to network partitions. In other words, if a network failure or partition occurs, the system may become completely inoperable.

### Examples

- [MySQL/MariaDB](https://www.mysql.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Oracle](https://www.oracle.com/database/)
- [SQL Server](https://www.microsoft.com/sql-server/)
- [Redis Standalone](https://redis.io/)
- [Memcached Standalone](https://memcached.org/)
