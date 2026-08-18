---
status: unread
source: https://engineering.zalando.com/posts/2026/06/client-side-load-balancing.html
created: 2026-08-12
tags:
- load-balancing
- kubernetes
- performance
- reliability
---

# Client-Side Load Balancing at a Million Requests Per Second

## TL;DR
Zalando moved hot internal fan-out routing from shared ingress infrastructure into a client-side library, preserving cache locality while improving latency, operability, rollout control, and cost efficiency.

## Subject
The article describes how Zalando redesigned internal routing for its Product Read API. The focus is consistent-hash client-side load balancing at very high request volume.

## Author's Objective
The author wants to explain the engineering tradeoffs behind replacing shared router hops with in-process routing. The article also documents rollout mechanics, correctness constraints, and later algorithmic improvements.

## Brief
Zalando's Product Read API serves critical commerce paths across European markets. Because batch requests fan out into many downstream product calls, tail latency was heavily affected by the slowest routing hop.

The team kept Skipper for edge traffic but moved internal fan-out routing into the calling process. This required exact hash-ring compatibility with Skipper to avoid cache splits and increased DynamoDB load.

The rollout depended as much on delivery discipline as algorithm design. CI/CD improvements, traffic toggles, canary groups, and fallback paths made it possible to shift more than one million requests per second safely.

Once the team owned the routing algorithm, they added improvements such as ring fade-in during scale-up and bounded-load routing based on occupancy rather than simplistic request counts.

The result was better load distribution, fewer pods, higher CPU thresholds, and meaningful daily infrastructure savings.

## Key Ideas
- Shared infrastructure can become a latency and ownership bottleneck on hot internal paths.
- Exact consistent-hash parity was required to preserve pod-local cache behavior.
- Kubernetes endpoint discovery moved to watch-based informers with last-good retention.
- Rollout safety came from traffic ramps, fallbacks, and observable cache metrics.
- Load should be estimated from time occupied, not only request counts or in-flight requests.
- Owning the routing logic enabled faster iteration and cost reduction.

## Technical Notes
- The client library uses xxHash64, 100 virtual nodes per endpoint, and binary search over a 64-bit ring.
- Unit tests assert hash-ring parity with Skipper.
- Endpoint discovery uses Kubernetes informers with debounce and last-good endpoint sets.
- N-ring fade-in gradually introduces new pods over 30 seconds after scale events.
- Bounded-load routing uses sliding-window occupancy, in-flight protection, latency weighting, and a capped ring walk.

## Why This Matters
At very high request rates, routing architecture becomes application architecture. Removing a shared hop can reduce tail latency, but only if correctness, rollout safety, and observability are treated as first-order requirements.

The article is also a strong example of infrastructure ownership: once the team controlled the algorithm, they could tune it for workload-specific cache locality, scale-up behavior, and cost.

## Review Points
- Verify how hash-ring compatibility was tested against Skipper during ongoing changes.
- Consider whether client-side routing increases library coupling across services.
- Review failure behavior when endpoint discovery becomes stale or inconsistent.
- Examine bounded-load tuning under partial outages or shared dependency slowdowns.
- Revisit AZ-aware routing once cache fragmentation and degradation handling are solved.

## Source
https://engineering.zalando.com/posts/2026/06/client-side-load-balancing.html
