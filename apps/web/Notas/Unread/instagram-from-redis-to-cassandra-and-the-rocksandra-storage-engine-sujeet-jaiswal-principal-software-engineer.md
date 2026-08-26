---
status: unread
source: https://sujeet.pro/articles/instagram-cassandra-migration
created: 2026-08-26
tags:
  - cassandra
  - migration
  - instagram
  - database-migration
  - scalability
---

# Instagram: From Redis to Cassandra and the Rocksandra Storage Engine — Sujeet Jaiswal - Principal Software Engineer

## TL;DR

A technical post describing Instagram's migration strategies to Cassandra, focusing on schema design, operational lessons, and scalability practices used to support massive scale.

## Summary

The article walks through Instagram's migration to Cassandra, covering data modeling choices, write/read patterns, consistency trade-offs, and operational practices like compaction, repair, and monitoring. It highlights challenges at scale and practical mitigations.


window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1Z2TP5LG65');{"@context":"https://schema.org","@type":"Article","headline":"Instagram: From Redis to Cassandra and the Rocksandra Storage Engine — Sujeet Jaiswal - Principal Software Engineer","description":"How Instagram migrated activity feed and fraud detection from Redis to Cassandra for ≈75% cost savings, then built Rocksandra (a RocksDB-based pluggable storage engine) to drop P99 reads from 60 ms to 20 ms and GC stalls by ~10x — a seven-year evolution from 12 nodes to 1,000+ across six data centres.","url":"https://sujeet.pro/articles/instagram-cassandra-migration","mainEntityOfPage":"https://sujeet.pro/articles/instagram-cassandra-migration","datePublished":"2026-02-08T00:00:00.000Z","dateModified":"2026-04-21T00:00:00.000Z","author":{"@type":"Person","name":"Sujeet Jaiswal"}}Skip to main contentSujeet JaiswalArticlesBlogsAppearanceAutoLightDarkThemePaperHigh ContrastText SizeASmall text sizeADefault text sizeALarge text sizeSeries

Instagram migrated activity feed, fraud detection, and direct-message workloads from Redis to Apache Cassandra in 2012 to escape memory-bound costs, then built Rocksandra — a pluggable storage engine that swaps Cassandra’s Java storage path for RocksDB — to reverse JVM garbage collection stalls that dominated P99 latency at 1,000+ nodes. The pattern reappears at each phase: adopt a proven distributed system, hit a structural ceiling, and replace the offending layer rather than the entire stack. This article reconstructs the seven-year evolution from primary sources — Cassandra Summit talks, the Apache JIRA, the Instagram engineering blog, and the OSDI 2018 Akkio paper — and surfaces the engineering decisions a senior engineer would want to relitigate today.

Instagram's Cassandra journey: from Redis replacement to a globally distributed, custom-storage-engine deployment spanning six data centres.

Instagram’s Cassandra story is not a single migration but a series of compounding infrastructure decisions spanning 2012 to 2019:


## Key Concepts

- Wide-row design and partitioning strategies appropriate for Cassandra workloads.
- Tunable consistency: balancing consistency vs latency using QUORUM/LOCAL_QUORUM/ONE depending on workload needs.
- Operational maintenance: compaction strategies, anti-entropy repair, tombstone management, and monitoring for read latency spikes.

## Technical Insights

- Schema design: modeling queries first, avoiding hotspots by careful partition keys, and denormalization to optimize reads.
- Performance: trade-offs with compaction settings, GC grace periods, and tombstone generation; importance of capacity planning and disk throughput.
- Failure modes: node churn, repair windows, and bootstrap impact; strategies to minimize impact during rebalancing and scaling events.

## Why This Matters

Platform teams choosing Cassandra must plan for operational complexity: schema patterns that avoid hotspots, robust repair and compaction procedures, and thorough monitoring to maintain low tail latencies at scale.

## Open Questions

- Exact schema examples and partitioning choices used at Instagram for different features?
- Measured p95/p99 latencies and compaction throughput during peak loads?
- How did migration handle backfills and historical data reconciliation?

## Review Points

- Review our current Cassandra usage patterns and identify potential hotspots or tombstone-generating operations.
- Implement monitoring for tombstones, compaction backlog, and repair progress; run drills for node replacement and rebalancing.
- Prototype partition key designs for high-volume features and load-test them in staging.

## Source

https://sujeet.pro/articles/instagram-cassandra-migration
