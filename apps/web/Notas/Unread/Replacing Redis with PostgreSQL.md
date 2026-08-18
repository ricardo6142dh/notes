---
status: unread
source: https://medium.com/@dev_tips/i-replaced-redis-with-postgresql-and-it-was-faster-and-yes-i-was-surprised-too-0b07fa736bfa
created: 2026-08-05
tags:
  - postgresql
  - redis
  - database-migration
  - performance
  - tradeoffs
---

# Replacing Redis with PostgreSQL

## TL;DR

In this case study, replacing Redis with PostgreSQL simplified the stack and improved performance for the author’s workload by leveraging Postgres features and avoiding cross-process serialization overhead.

## Summary

Article unavailable or content could not be extracted. See source link for full text.

## Key Concepts

- Redis as cache vs primary store: trade-offs between in-memory speed and operational complexity.
- PostgreSQL as single source of truth: using SQL, indexes, transactions, and built-in data types to replace some Redis use cases.
- Workload characteristics: read/write mix, dataset size relative to RAM, query complexity, and contention patterns.

## Technical Insights

- Performance: author observes lower tail latency after migration; specifics depend on workload—Postgres can outperform when avoiding client-side serialization and network hops between services.
- Architecture changes: removing a separate Redis tier simplified deployment, backups, and failover operations; moved logic to Postgres queries and indexes.
- Trade-offs: Redis still wins for pure in-memory caching, pub/sub, and ephemeral high-throughput counters; Postgres adds durability and richer query semantics but may increase memory/IO pressure.

## Why This Matters

Platform teams should evaluate whether an additional in-memory tier is necessary for their workloads. For many application patterns, consolidating to Postgres reduces operational overhead and provides stronger correctness guarantees, though teams must validate latency and scaling under realistic load.

## Open Questions

- What were the exact benchmarks and request patterns (QPS, object sizes, cache hit rates) behind the author’s claim?
- How did the migration handle cache invalidation, TTLs, and high-cardinality ephemeral data?
- What Postgres extensions or data types (JSONB, hstore) were used, if any?
- How does cost compare at scale (memory vs CPU/disk) for our traffic profile?

## Review Points

- Reproduce a benchmark: mirror the author’s workload in staging with representative data and measure latency and resource use.
- Inventory Redis use cases in our systems: identify ones safe to migrate to Postgres and those that must remain in Redis.
- Prototype select endpoints using Postgres-backed patterns (upserts, indexed queries) and measure end-to-end latency.
- Consider hybrid approach: keep Redis for ephemeral high-throughput needs and migrate other logic to Postgres.

## Source

https://medium.com/@dev_tips/i-replaced-redis-with-postgresql-and-it-was-faster-and-yes-i-was-surprised-too-0b07fa736bfa
