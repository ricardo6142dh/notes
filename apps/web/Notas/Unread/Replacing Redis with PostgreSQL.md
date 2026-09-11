---
title: Replacing Redis with PostgreSQL
status: unread
source: https://medium.com/@dev_tips/i-replaced-redis-with-postgresql-and-it-was-faster-and-yes-i-was-surprised-too-0b07fa736bfa
created: 2026-08-05
tags:
  - source/article
  - topic/postgresql
  - topic/redis
  - topic/databases
  - topic/performance
  - topic/tradeoffs
---

## TL;DR
The article claims Redis was not the bottleneck by default, but the accessible source text is too limited to validate the performance argument or rewrite a reliable technical summary.

## Subject
The visible portion frames the article as a case study about replacing Redis with PostgreSQL after observed latency did not match the author's expectations.

The article is a Medium member-only post, and the available extraction only exposes the title, subtitle, metadata, introduction, and reader comments.

## Author's Objective
The author appears to challenge the assumption that Redis automatically improves performance in every backend architecture.

The intended argument seems to be that measurement should decide whether a cache tier helps, rather than treating Redis as an unquestioned default.

## Brief
This note should not pretend to know the full implementation. The current accessible text does not expose the benchmark, schema, workload, Redis usage pattern, PostgreSQL design, or migration details.

The important signal is the premise: a system had latency that did not improve as expected, and the author reconsidered whether the Redis layer was helping or adding overhead.

That is a useful engineering instinct. Redis is fast, but every extra tier adds network hops, serialization, invalidation rules, operational state, failure modes, and cognitive load.

Without the full article, the responsible conclusion is narrow: evaluate Redis as a workload-specific optimization, not as a reflex. Do not infer that PostgreSQL generally beats Redis.

## Key Ideas
- Redis can be the right tool and still be unnecessary for a specific workload.
- A cache layer should be justified by measured end-to-end latency, not component reputation.
- PostgreSQL may be simpler when the workload benefits more from locality, transactions, indexes, and a single durable source of truth.
- Extra infrastructure can add overhead through serialization, network calls, invalidation, and operational complexity.
- The visible source does not provide enough evidence to validate the claimed performance win.

## Technical Notes
- Treat this article as a prompt for investigation, not as proof that PostgreSQL is faster than Redis.
- Before removing Redis, measure cache hit rate, payload size, request latency, database CPU, locks, I/O, and tail latency.
- Compare end-to-end paths, including application serialization and network overhead, not just database or cache command latency.
- Preserve Redis for workloads where it is clearly appropriate: ephemeral state, hot counters, queues, pub/sub, rate limiting, or high-throughput cache patterns.
- A PostgreSQL-only design may reduce operational complexity, but it can also increase pressure on the primary database.

## Why This Matters
Cache layers are often added because they feel like responsible architecture. In practice, they are only responsible when they reduce real user-facing latency or protect a constrained dependency.

For platform and backend teams, the lesson is measurement discipline: prove the cache earns its complexity before keeping it in the critical path.

## Review Points
- Find the complete article before treating this as a case study.
- Rebuild the argument only if the source provides workload, benchmark, and architecture details.
- Audit local Redis usage for cases where it exists by convention rather than evidence.
- Identify which Redis use cases are cache, coordination, queueing, rate limiting, or session storage.
- Design a benchmark that compares the full request path, not just Redis vs PostgreSQL in isolation.

## Source
https://medium.com/@dev_tips/i-replaced-redis-with-postgresql-and-it-was-faster-and-yes-i-was-surprised-too-0b07fa736bfa

## Connections
- [[Cursos/Descomplicando System Design/CAP and Databases/Databases|Databases]]
- [[Cursos/Descomplicando System Design/Cache/Definicao de Cache|Cache]]
- [[Cursos/Descomplicando System Design/Escalabilidade, Performance e Capacidade/Performance|Performance]]
