---
status: unread
source: https://engineering.zalando.com/posts/2026/06/client-side-load-balancing.html
created: 2026-08-05
tags:
  - client-side-load-balancing
  - load-balancing
  - service-mesh
  - platform-engineering
  - zalando
---

# Client-Side Load Balancing at a Million Requests Per Second

## TL;DR

Zalando explores client-side load balancing approaches, trade-offs versus server-side LB, and practical patterns for resilient, efficient request routing in microservice architectures.

## Summary

Content could not be extracted. See source for full article.

## Key Concepts

- Client-side load balancing: routing decisions made by service clients using a local view of healthy backends obtained from service discovery.
- Service discovery integration: keeping an up-to-date set of endpoints with health status for the LB algorithm.
- Load-balancing algorithms: round-robin, least-connections, weighted, and load-aware selection.

## Technical Insights

- Architecture: clients maintain endpoint lists and choose targets; may require local circuit breakers, retry policies, and outlier detection to avoid cascading failures.
- Performance: reduces network hops and central bottlenecks but shifts complexity to clients; consistency of endpoint views and staleness are key trade-offs.
- Trade-offs: server-side LBs simplify client logic but can become bottlenecks; client-side reduces infra but complicates consistency and observability.

## Why This Matters

For SREs and platform engineers, choosing client-side vs server-side LB affects latency, fault isolation, operational surface area, and deployment complexity. Client-side LB can improve scalability but requires robust discovery and observability.

## Open Questions

- How does Zalando handle endpoint list staleness and synchronization under high churn?
- What observability tooling and metrics do they recommend for client-side choices?
- How are retries and timeouts tuned to avoid amplification during failures?

## Review Points

- Evaluate client libraries for LB algorithms and integrate health checks with our service discovery.
- Prototype client-side LB for a non-critical service and measure p95/p99 latencies and error amplification.
- Ensure tracing and metrics capture per-client routing decisions for debugging and SLOs.

## Source

https://engineering.zalando.com/posts/2026/06/client-side-load-balancing.html
