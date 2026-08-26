---
status: unread
source: https://www.sankalpjonna.com/posts/our-aws-bill-is-2-of-revenue-heres-how-we-did-it
created: 2026-08-26
tags:
  - cloud-cost
  - aws-cost-optimization
  - finops
  - cost-reduction
  - platform-engineering
---

# Our AWS bill is ~ 2% of revenue. Here's how we did it

## TL;DR

A FinOps case study detailing how the team reduced AWS spend to ~2% of revenue through rightsizing, reserved capacity, caching, and architectural cost-awareness.

## Summary

The post outlines concrete cost-optimization measures: aggressive rightsizing of instances, use of savings plans and reserved instances, improved caching and CDN usage, batching and reducing egress, and organizational practices for cost awareness. It includes operational changes like deployment patterns and cost-focused SLOs.


Server cost is usually not a concern for most funded startups, but for a boot strapped SaaS product like ours, it was important to have an AWS bill that is easy on the pocket and a little more proportional to the MRR.

To that end, when we started building our product, one of the first things I did was to find ways to consume the least amount of resources on the cloud. We currently serve a traffic of > 250 requests per second with our AWS setup. Here is a link to the app if you want to check it out.

I will now go through each of these resources and talk about both the expensive way and the cheap way to implement them

When it comes to compute instances, most people go with AWS EC2 instances. EC2 instances are the safest choice to make for running server applications as they are highly configurable, scalable and you can change the configuration on demand according to your needs. However, sometimes you do not really need this level of control on your compute instances and that brings us to AWS Lightsail.


## Key Concepts

- Rightsizing: matching instance types and sizes to actual workload needs, downsizing overprovisioned resources.
- Commitment discounts: using savings plans or reserved instances for predictable workloads.
- Caching and CDN: reduce compute and egress costs by caching frequently accessed content closer to users.
- Cost-aware architecture: design choices that trade marginal latency for large cost reductions (batching, async processing, tiered storage).

## Technical Insights

- Actions: automated cost alerts, tagging for chargeback, regular audits of idle resources, lifecycle policies for backups and snapshots.
- Measurements: track cost per feature, cost per customer, and map spend to business metrics to prioritize optimization.)
- Trade-offs: some optimizations increase operational complexity or slightly worsen latency; report-back mechanisms ensure SLOs aren't violated.

## Why This Matters

For platform teams, aligning infrastructure cost to business metrics enables sustainable growth; concrete operational practices and architecture changes can significantly reduce cloud spend without harming user experience when done carefully.

## Open Questions

- Exact numbers: breakdown of savings by category (compute, storage, egress) and time to realize ROI?
- Which savings plans/reservations mix provided the best ROI for their workload?
- How did they detect regressions where cost optimizations impacted performance or reliability?

## Review Points

- Run a cost audit mapping spend to features and identify top 20% of costs driving 80% of spend.
- Pilot savings plans for predictable workloads and implement automated rightsizing policies in staging.
- Evaluate caching/CDN opportunities and set cost-aware SLOs for features with large egress.

## Source

https://www.sankalpjonna.com/posts/our-aws-bill-is-2-of-revenue-heres-how-we-did-it
