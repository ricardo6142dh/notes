---
status: unread
source: https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo
created: 2026-08-26
tags:
  - sli
  - slo
  - sre
  - observability
  - reliability
---

# Why bother with SLI and SLO?

## TL;DR

SLIs and SLOs focus engineering teams on user-impacting measures, turning vague reliability goals into measurable targets and guiding investment in reliability work.

## Summary

The post argues for practical use of Service Level Indicators (SLIs) and Service Level Objectives (SLOs) to prioritize engineering effort. It explains how SLIs quantify user experience, SLOs set acceptable targets, and error budgets enable trade-offs between feature velocity and reliability. The article includes examples and recommendations for choosing meaningful indicators.


SubscribeSign in{"@context":"https://schema.org","@type":"NewsArticle","url":"https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo","mainEntityOfPage":"https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo","headline":"Why bother with SLI and SLO?","description":"Explore the world of Service Level Indicators (SLIs) and Objectives (SLOs) in this comprehensive blog post. Learn why SLIs and SLOs are essential for ensuring system reliability in large organizations. Understand the difference between SLIs and SLOs, their role in measuring and communicating system performance, and how they contribute to effective risk management. Discover practical insights, including tips and tricks, for setting and using these metrics effectively. Ideal for tech professionals and teams looking to optimize system reliability and performance","image":[{"@type":"ImageObject","url":"https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0f75e88d-e53b-4983-bd7d-85a1e9650d7c_500x500.png"}],"datePublished":"2023-05-31T19:59:44+00:00","dateModified":"2023-05-31T19:59:44+00:00","isAccessibleForFree":true,"author":[{"@type":"Person","name":"Alex Ewerl\u00F6f","url":"https://substack.com/@alexewerlof","description":"Writes about technical leadership, growth mindset, and system reliability engineering. Senior Staff Engineer, MSc Systems Engineering from KTH, Stockholmer, dad, amateur artist. Read more here: https://www.alexewerlof.com/who","identifier":"user:87732486","sameAs":["https://twitter.com/alexewerlof"],"image":{"@type":"ImageObject","contentUrl":"https://substackcdn.com/image/fetch/$s_!IRtW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2713990-da82-481b-b579-01a7aaa5b85b_560x560.jpeg","thumbnailUrl":"https://substackcdn.com/image/fetch/$s_!IRtW!,w_128,h_128,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2713990-da82-481b-b579-01a7aaa5b85b_560x560.jpeg"}}],"publisher":{"@type":"Organization","name":"Alex Ewerl\u00F6f Notes","url":"https://blog.alexewerlof.com","description":"Technical Leadership, Reliability Engineering, Growth","interactionStatistic":{"@type":"InteractionCounter","name":"Subscribers","interactionType":"https://schema.org/SubscribeAction","userInteractionCount":10000},"identifier":"pub:1002265","logo":{"@type":"ImageObject","url":"https://substackcdn.com/image/fetch/$s_!_Ur2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c58cb07-9341-402b-bcdb-9fa767c2cdac_500x500.png","contentUrl":"https://substackcdn.com/image/fetch/$s_!_Ur2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c58cb07-9341-402b-bcdb-9fa767c2cdac_500x500.png","thumbnailUrl":"https://substackcdn.com/image/fetch/$s_!_Ur2!,w_128,h_128,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c58cb07-9341-402b-bcdb-9fa767c2cdac_500x500.png"},"image":{"@type":"ImageObject","url":"https://substackcdn.com/image/fetch/$s_!_Ur2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c58cb07-9341-402b-bcdb-9fa767c2cdac_500x500.png","contentUrl":"https://substackcdn.com/image/fetch/$s_!_Ur2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c58cb07-9341-402b-bcdb-9fa767c2cdac_500x500.png","thumbnailUrl":"https://substackcdn.com/image/fetch/$s_!_Ur2!,w_128,h_128,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c58cb07-9341-402b-bcdb-9fa767c2cdac_500x500.png"},"sameAs":["https://twitter.com/alexewerlof"]},"interactionStatistic":[{"@type":"InteractionCounter","interactionType":"https://schema.org/LikeAction","userInteractionCount":25},{"@type":"InteractionCounter","interactionType":"https://schema.org/ShareAction","userInteractionCount":0},{"@type":"InteractionCounter","interactionType":"https://schema.org/CommentAction","userInteractionCount":2}]}{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Alex Ewerl\u00F6f Notes","item":"https://blog.alexewerlof.com"},{"@type":"ListItem","position":2,"name":"Why bother with SLI and SLO?","item":"https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo"}]}Reliability EngineeringWhy care about service level?Is there really any value in setting service level indicators and objectives?Alex EwerlöfMay 31, 2023252ShareThe conversation about service levels quickly jumps into:

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
