---
status: unread
source: https://aws.amazon.com/blogs/containers/using-amazon-ec2-spot-instances-with-karpenter/
created: 2026-08-12
tags:
- kubernetes
---

# Using Amazon EC2 Spot Instances with Karpenter

## TL;DR
Karpenter can run EKS workloads on EC2 Spot capacity cost-effectively, but reliability depends on diversified NodePools, interruption handling, graceful shutdown, consolidation, and monitoring.

## Subject
The article explains how to configure Karpenter to provision EC2 Spot Instances for Amazon EKS workloads. It focuses on capacity selection, interruption handling, resilience, consolidation, and monitoring.

## Author's Objective
The authors want to show how Karpenter and EC2 Spot can reduce Kubernetes compute cost while preserving operational reliability. They also emphasize the engineering practices needed because Spot capacity is interruptible.

## Brief
Karpenter watches for unscheduled Kubernetes pods and provisions nodes that satisfy their scheduling constraints. For Spot usage, the key configuration is a NodePool that allows Spot capacity and defines enough instance-type and Availability Zone flexibility.

The article stresses diversification. Karpenter sends a broad set of feasible instance types to EC2 Fleet, which then chooses capacity using the Price Capacity Optimized strategy for Spot.

Spot interruption handling is treated as an operational requirement, not an optional add-on. Karpenter can cordon and drain nodes when it receives interruption warnings, but this requires EventBridge, SQS, and the interruption queue configuration.

The authors also cover consolidation and monitoring. Underused nodes can be deleted or replaced, while Prometheus, Grafana, CloudWatch Logs, and Karpenter logs help detect pending pods, provisioning failures, quota issues, and unavailable Spot capacity.

## Key Ideas
- Karpenter provisions compute for pending Kubernetes pods by observing unscheduled events and creating NodeClaims.
- Spot NodePools should be flexible across instance categories, sizes, and Availability Zones to increase usable capacity pools.
- For Spot, Karpenter uses EC2 Fleet with the Price Capacity Optimized allocation strategy, prioritizing available capacity before price.
- If Spot capacity is unavailable in specific pools, Karpenter temporarily avoids those pools and searches alternatives across the NodePool.
- Native interruption handling depends on forwarding AWS interruption events through EventBridge and SQS to Karpenter.
- Monitoring should include pod scheduling state, Karpenter controller logs, provisioning failures, limits, and interruption-related behavior.

## Technical Notes
- Set `karpenter.sh/capacity-type` to `spot` or allow both `spot` and `on-demand` when defining NodePool requirements.
- Avoid overly narrow NodePool constraints; narrow instance or AZ selection increases interruption and provisioning risk.
- Configure `--interruption-queue-name` after creating the SQS queue and EventBridge rules for interruption events.
- Applications should handle SIGTERM correctly because Kubernetes drains interrupted nodes before SIGKILL.
- Use Grafana and CloudWatch Logs to watch pending pods and Karpenter provisioning errors such as Spot quota exhaustion.

## Why This Matters
Spot can materially reduce EKS compute cost, but it changes the failure model. The cluster must tolerate unavailable pools, reclaimed instances, pending pods, and replacement capacity decisions.

Karpenter makes Spot practical when the platform team designs for flexibility, interruption handling, and observability from the start.

## Review Points
- Revisit NodePool requirements before using Spot in production.
- Confirm interruption handling infrastructure exists and Karpenter is configured to consume it.
- Check whether workloads tolerate node drains and handle SIGTERM gracefully.
- Review consolidation settings and Spot-to-Spot consolidation behavior for the deployed Karpenter version.
- Validate monitoring for pending pods, provisioning failures, and Spot account limits.

## Source
https://aws.amazon.com/blogs/containers/using-amazon-ec2-spot-instances-with-karpenter/
