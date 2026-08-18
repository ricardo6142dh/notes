---
status: unread
source: https://www.cncf.io/blog/2026/07/15/hami-becomes-a-cncf-incubating-project/
created: 2026-08-12
tags:
- kubernetes
- gpu
- cncf
- ai-infrastructure
---

# HAMi Becomes a CNCF Incubating Project

## TL;DR
HAMi moved to CNCF incubation by addressing a concrete AI infrastructure problem: fragmented accelerator capacity, heterogeneous vendors, and Kubernetes-native scheduling for fractional GPU and accelerator workloads.

## Subject
The article announces HAMi's acceptance as a CNCF incubating project. It explains the project's role as cloud native middleware for virtualizing and scheduling GPUs and other accelerators in Kubernetes.

## Author's Objective
The author aims to show why HAMi has matured beyond sandbox status. The piece highlights adoption, architecture, ecosystem integrations, and roadmap signals that support CNCF incubation.

## Brief
AI infrastructure teams often waste expensive accelerator capacity because workloads are allocated whole devices even when they need only fractions. This becomes harder across mixed GPU, NPU, DCU, MLU, and other accelerator environments.

HAMi provides a Kubernetes-native virtualization layer that lets platform teams slice accelerators by memory, core, or device count while keeping application manifests largely unchanged. It also enforces runtime isolation between workloads sharing physical hardware.

The project differentiates itself through a multi-vendor model and a consistent operational interface, rather than being tied to one hardware vendor's device plugin ecosystem.

Its incubation case is supported by production adoption, a large contributor base, multiple CNCF case studies, and integrations with Kubernetes scheduling projects such as Kueue and Volcano.

## Key Ideas
- HAMi targets accelerator fragmentation and underutilization in AI infrastructure.
- It virtualizes GPUs and other accelerators for Kubernetes workloads.
- Scheduling supports binpack, spread, and topology-aware placement.
- Runtime isolation limits memory and compute usage for shared devices.
- The project emphasizes vendor neutrality and a consistent platform interface.
- CNCF incubation reflects stronger adoption, governance, and ecosystem maturity.

## Technical Notes
- HAMi uses an admission webhook to rewrite scheduler fields and resource requests for virtualized devices.
- Its scheduler filters, scores, and binds pods to nodes and accelerator devices.
- Vendor plugins register accelerator resources and allocate fractional device capacity.
- NVIDIA support includes in-container virtualization through CUDA driver interception.
- Observability includes dashboards, metrics endpoints, and Grafana examples.

## Why This Matters
Accelerator efficiency is now a platform-level concern. As AI workloads grow, organizations need ways to increase utilization without forcing every application team to understand hardware-specific allocation details.

HAMi's CNCF incubation suggests that GPU virtualization and accelerator-aware scheduling are becoming part of the mainstream cloud native infrastructure stack.

## Review Points
- Validate how HAMi's isolation guarantees compare across different accelerator vendors.
- Examine operational complexity introduced by admission rewriting and custom scheduling.
- Review compatibility with Kubernetes Dynamic Resource Allocation as that ecosystem matures.
- Assess whether fractional GPU sharing fits latency-sensitive inference workloads.
- Track roadmap items such as gang scheduling, preemption, autoscaling, and AMD support.

## Source
https://www.cncf.io/blog/2026/07/15/hami-becomes-a-cncf-incubating-project/
