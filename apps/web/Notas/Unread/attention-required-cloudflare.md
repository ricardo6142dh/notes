---
status: unread
source: https://medium.com/@valeriowillian/observabilidade-na-vida-real-reduzindo-99-do-tempo-de-resposta-0a6364e7dbd8
created: 2026-08-26
tags:
  - observability
  - sre
  - incident-response
  - latency
  - portuguese
---

# Attention Required! | Cloudflare

## TL;DR

A practical account of using observability to reduce incident response times and improve system reliability by orders of magnitude through targeted instrumentation and runbook automation.

## Summary

The author shares real-world examples where improving observability—better metrics, dashboards, tracing, and alerting—cut response time dramatically. They discuss prioritizing high-signal metrics, automating common remediation steps, and aligning alerts with actionable runbooks. The article is in Portuguese and includes practical steps and examples.


This website is using a security service to protect itself from online attacks. The action you just performed triggered the security solution. There are several actions that could trigger this block including submitting a certain word or phrase, a SQL command or malformed data.

You can email the site owner to let them know you were blocked. Please include what you were doing when this page came up and the Cloudflare Ray ID found at the bottom of this page.

Cloudflare Ray ID: a311c9dbb959ae55 • Your IP: Click to reveal 217.160.75.67 • Performance & security by Cloudflare


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
