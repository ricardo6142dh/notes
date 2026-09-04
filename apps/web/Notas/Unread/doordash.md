---
title: DoorDash Service Mesh and Data Transfer
status: unread
source: https://careersatdoordash.com/blog/staying-in-the-zone-how-doordash-used-a-service-mesh-to-manage-data-transfer-reducing-hops-and-cloud-spend/?utm_source=substack&utm_medium=email
created: 2026-08-26
tags:
  - source/article
  - topic/service-mesh
  - topic/networking
  - topic/cost-optimization
  - topic/observability
---

## TL;DR

DoorDash used a service mesh to consolidate and optimize data transfer paths, reducing network hops and cloud egress costs while improving observability and control.

## Summary

The article details DoorDash's project to reduce cross-region/zone data transfer by routing traffic through an internal service mesh, implementing smarter routing policies, and leveraging observability to identify expensive paths. It describes engineering decisions, the mesh implementation, and measured cost and latency benefits.

## Key Concepts

- Service mesh: control plane that manages service-to-service communication with policies for routing, retries, and telemetry.
- Egress and data transfer optimization: reducing cross-zone/region hops to cut cloud egress charges and latency.
- Observability-driven optimization: using telemetry to find high-cost paths and validate routing changes.

## Technical Insights

- Architecture: mesh sidecars intercept traffic, policy controller computes routing decisions to prefer local or lower-cost paths, and mesh control plane enforces those rules.
- Implementation details: strategies for gradual rollout, canarying routing policies, and handling stateful data transfers; integration with CDN and caching where applicable.
- Trade-offs: increased control-plane complexity and potential for routing-induced failures vs significant cost savings and latency reductions.

## Why This Matters

Platform teams can apply similar mesh-based routing policies to reduce cloud spend and improve latency, but must balance complexity and ensure safety via observability, testing, and rollback plans.

## Open Questions

- What specific mesh implementation (Istio, Linkerd, or custom) did DoorDash use?
- Quantitative results: exact cost savings, latency improvements, and before/after p95/p99 numbers?
- How were edge cases handled (e.g., DB replicas, cross-region consistency)?

## Review Points

- Identify our top data transfer paths and measure current egress costs.
- Prototype mesh-based routing policies in staging for non-critical services and validate metrics.
- Ensure observability captures path-level metrics and implement safe rollbacks for routing policies.

## Source

https://careersatdoordash.com/blog/staying-in-the-zone-how-doordash-used-a-service-mesh-to-manage-data-transfer-reducing-hops-and-cloud-spend/?utm_source=substack&utm_medium=email

## Connections

- [[Cursos/Descomplicando System Design/Concepts/Microservices|Microservices]]
- [[Cursos/Descomplicando System Design/Load Balancing/Load Balancing (Balanceamento de Carga)|Load Balancing]]
- [[attention-required-cloudflare|Observabilidade na Vida Real]]
