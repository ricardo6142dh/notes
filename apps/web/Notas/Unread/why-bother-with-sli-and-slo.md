---
title: Why Bother with SLI and SLO?
status: unread
source: https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo
created: 2026-08-26
tags:
  - source/article
  - topic/sre
  - topic/observability
  - topic/reliability
  - topic/slo
---

## TL;DR

SLIs and SLOs focus engineering teams on user-impacting measures, turning vague reliability goals into measurable targets and guiding investment in reliability work.

## Summary

The post argues for practical use of Service Level Indicators (SLIs) and Service Level Objectives (SLOs) to prioritize engineering effort. It explains how SLIs quantify user experience, SLOs set acceptable targets, and error budgets enable trade-offs between feature velocity and reliability. The article includes examples and recommendations for choosing meaningful indicators.

But let’s step back and answer why are we doing this? Why service levels is the right approach to reliability and risk in general?

There are as many ways to measure reliability as there are people who want to measure:

All of these are valid ways to measure reliability (and there are technical terms for them that we’ll discuss in upcoming articles) but without a common language, it’s hard to communicate expectations between teams that own dependent systems.

## Key Concepts

- SLI: a quantitative measure of some aspect of user-perceived service quality (latency, availability, correctness).
- SLO: a target value or range for an SLI over a time window (e.g., 99.9% availability per month).
- Error budget: allowable deviation from the SLO used to guide risk-taking for releases and changes.
- Measuring user impact: choose SLIs that reflect actual user journeys rather than internal metrics.

## Technical Insights

- Implementation: instrument critical user paths to compute SLIs, aggregate at appropriate dimensions, and compute rolling-window SLO compliance.
- Trade-offs: too many SLIs dilute focus; choose a small set tied to business outcomes. Balancing alerting sensitivity vs noise is critical.
- Operationalization: integrate error budgets into release processes, automate enforcement where possible, and visualize trends for teams.

## Why This Matters

For SRE and platform teams, adopting SLI/SLO practices aligns reliability work with user impact, provides clear signals to prioritize engineering effort, and structures conversations about acceptable risk.

## Open Questions

- Which SLI definitions best reflect our top user journeys?
- What SLO windows and targets balance velocity and reliability for our products?
- How to integrate error budget policies into our CI/CD and release gating?

## Review Points

- Identify 1–3 SLIs for a critical service and implement dashboards and alerts for them.
- Define error budget policies and pilot them on a single team to observe effects on velocity.
- Create runbooks mapping SLO breaches to concrete actions and responsible roles.

## Source

https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo

## Connections

- [[Cursos/Descomplicando System Design/Concepts/Availability|Availability]]
- [[Cursos/Descomplicando System Design/Escalabilidade, Performance e Capacidade/Performance|Performance]]
