---
status: unread
source: https://www.linkedin.com/pulse/como-escalei-um-encurtador-de-url-para-100-milh%C3%B5es-mesquita-estrela-vsfaf/
created: 2026-08-05
tags:
  - scaling
  - url-shortener
  - performance
  - architecture
  - brazil
---

# Como escalei um encurtador de url para 100 milhões de escritas diárias usando meu Homelab.

## TL;DR

A first-hand post-mortem describing how an author scaled a URL shortener to handle 100 million requests per month, focusing on performance bottlenecks, caching, and horizontal scaling strategies.

## Summary

The article explains practical steps taken to scale a URL shortener: profiling hotspots, using caches effectively, adopting async workers for background tasks, and optimizing database access patterns. It provides concrete operational lessons rather than abstract theory.


LinkedIn respects your privacy
          
            
              LinkedIn and 3rd parties use essential and non-essential cookies to provide, secure, analyze and improve our Services, and to show you relevant ads (including professional and job ads) on and off LinkedIn. Learn more in our Cookie Policy.

Select Accept to consent or Reject to decline non-essential cookies for this use. You can update your choices at any time in your settings.

By clicking Continue to join or sign in, you agree to LinkedIn’s User Agreement, Privacy Policy, and Cookie Policy.


## Key Concepts

- URL shortening service: mapping long URLs to short codes with low-latency redirects.
- Cache tier: using in-memory caches (Redis or memcached) to avoid DB lookups on the hot path.
- Asynchronous processing: background workers for analytics, link validation, or link expiration tasks.

## Technical Insights

- Architecture moves: split read/write paths, introduce cache with appropriate TTLs, use consistent hashing or sharding for stateful stores, and scale web frontends behind a load balancer.
- Trade-offs: cache invalidation complexity vs read performance; cost of strong consistency on writes; choosing between single-node DB optimizations and distributed stores.

## Why This Matters

Platform teams running high-throughput web services can apply the same incremental steps: measure, cache, decouple, and scale horizontally. Small services like URL shorteners reveal common issues (hot keys, burst traffic) that general platforms must handle.

## Open Questions

- Exact metrics: what were QPS, p95/p99 latencies, cache hit rates, and dataset size?
- Storage choices: which database and schema adjustments were used for performance?
- Operational tooling: how were rollouts, monitoring, and alerting configured?

## Review Points

- If relevant, profile our redirect endpoints and identify hot keys for caching.
- Prototype TTL and cache invalidation strategies in staging with representative traffic.
- Evaluate background worker patterns for analytics and non-blocking work.

## Source

https://www.linkedin.com/pulse/como-escalei-um-encurtador-de-url-para-100-milh%C3%B5es-mesquita-estrela-vsfaf/