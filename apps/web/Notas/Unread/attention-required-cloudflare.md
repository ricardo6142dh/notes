---
title: Observabilidade na Vida Real
status: unread
source: https://medium.com/@valeriowillian/observabilidade-na-vida-real-reduzindo-99-do-tempo-de-resposta-0a6364e7dbd8
created: 2026-08-26
tags:
  - source/article
  - topic/observability
  - topic/sre
  - topic/incident-response
  - topic/latency
---

## TL;DR

A practical account of using observability to reduce incident response times and improve system reliability by orders of magnitude through targeted instrumentation and runbook automation.

## Summary

The author shares real-world examples where improving observability—better metrics, dashboards, tracing, and alerting—cut response time dramatically. They discuss prioritizing high-signal metrics, automating common remediation steps, and aligning alerts with actionable runbooks. The article is in Portuguese and includes practical steps and examples.

## Key Concepts

- High-signal metrics: selecting metrics that directly correlate with user impact to reduce noise.
- Tracing and distributed context: using traces to pinpoint latency sources across services.
- Runbook-driven alerts: pairing alerts with precise remediation steps to speed operator response.

## Technical Insights

- Instrumentation: focus on latency percentiles, error budgets, and user-facing SLOs; tag spans with deployment metadata to correlate regressions.
- Automation: implement automated mitigations for common failures and ensure safe rollback paths; use playbooks linked from alerts.
- Trade-offs: increased telemetry costs and noise management versus dramatic reductions in MTTR and operational overhead.

## Why This Matters

Platform teams gain faster incident response, lower customer impact, and reduced toil by investing in high-quality observability and coupling alerts to actionable remediation.

## Open Questions

- What concrete alert thresholds and SLO targets delivered the reported improvements?
- Which tooling stack and sampling strategies were used for distributed tracing?
- How were false positives reduced while maintaining sensitivity to real incidents?

## Review Points

- Audit our current alerts and map them to runbooks; remove non-actionable alerts.
- Prototype automated remediation for a frequent, low-risk alert and measure MTTR change.
- Ensure tracing is enabled across critical paths and instrument percentiles and error budgets.

## Source

https://medium.com/@valeriowillian/observabilidade-na-vida-real-reduzindo-99-do-tempo-de-resposta-0a6364e7dbd8

## Connections

- [[Cursos/Descomplicando System Design/Escalabilidade, Performance e Capacidade/Performance|Performance]]
- [[Cursos/Descomplicando System Design/Concepts/Availability|Availability]]
