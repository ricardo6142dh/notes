---
status: unread
source: https://www.lmpeixoto.com/posts/building-adamastorx/
created: 2026-08-12
tags:
- sre
- ai-engineering
- platform-engineering
- observability
---

# Building AdamastorX: An SRE Experiment with AI Doing the Typing

## TL;DR
AdamastorX tests AI-assisted engineering under realistic SRE constraints, showing that code generation can be cheap while architecture, coherence, operations, and accountability remain human responsibilities.

## Subject
The article describes AdamastorX, a realistic SRE platform experiment built mostly through AI-generated code. It runs on constrained hardware and deliberately creates production-like operational problems.

## Author's Objective
The author wants to examine what happens when AI is allowed to build much of a complex system. The central question is where human engineering judgment remains indispensable.

## Brief
AdamastorX is not presented as a product. It is a deliberately realistic platform designed to produce real operational pressure: capacity limits, failed deploys, noisy alerts, scaling problems, and documentation drift.

The system runs on a single-node k3s cluster on an old laptop, using Terraform, ArgoCD, Kafka, PostgreSQL, Redis, Prometheus, Grafana, Loki, Tempo, Pyroscope, Spring Boot, and Python services.

The workloads are intentionally substantial. They include clinical variant annotation with millions of ClinVar records and a market sentiment pipeline using streaming data, sentiment scoring, Kafka Streams, and dashboards.

AI agents write much of the code, but the human owner controls architecture, review, operations, and final responsibility. ADRs, small PRs, canonical docs, incident learning, and stronger model reviews are used to keep the system coherent.

The main lesson is that AI reduces the cost of building, but increases the cost of maintaining conceptual integrity across the system.

## Key Ideas
- AI autonomy worked because it was bounded to implementation, not ownership.
- Realistic constraints exposed failures that toy projects would hide.
- Operational signals such as SLOs and canary aborts mattered more than infrastructure health alone.
- Documentation drift became a primary risk as AI-generated changes accumulated.
- Strong engineering process was needed to prevent divergent conventions and stale decisions.
- The scarce resource shifted from typing code to maintaining coherence.

## Technical Notes
- The platform uses single-node k3s with Terraform provisioning and ArgoCD GitOps.
- Observability includes Prometheus, Grafana, Loki, Tempo, and Pyroscope.
- KEDA scales workers from Kafka consumer lag instead of CPU utilization.
- Canary deployments abort based on error rate and latency budget burn.
- CI checks were added to detect undocumented live components and corrupted backlog state.

## Why This Matters
The article is a useful correction to simplistic AI coding narratives. The bottleneck in serious systems is not only producing code, but keeping architecture, operations, documentation, and decisions aligned over time.

For senior engineers, the experiment reinforces that AI can accelerate implementation while making review discipline, system boundaries, and operational ownership even more important.

## Review Points
- Distinguish between AI-generated code volume and system maintainability.
- Evaluate whether ADRs and canonical docs are sufficient to contain design drift.
- Review how incident learnings are converted into automated checks.
- Watch for hidden single-node assumptions that would fail in multi-node production.
- Assess where human review should block AI autonomy rather than merely inspect it.

## Source
https://www.lmpeixoto.com/posts/building-adamastorx/
