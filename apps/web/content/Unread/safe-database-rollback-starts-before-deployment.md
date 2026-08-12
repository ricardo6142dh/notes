---
status: unread
source: https://newsletter.systemdesignclassroom.com/p/safe-database-rollback-starts-before-deployment
created: 2026-08-12
tags:
  - database-rollback
  - deployment-safety
  - schema-migrations
  - sre
  - release-engineering
---

# Safe database rollback starts before deployment

## TL;DR

Prepare database rollback plans and automated safeguards before deploying schema or data changes to minimize blast radius and enable safe, fast recovery.

## Summary

The newsletter argues that safe database rollback requires planning before deployment: feature flags, backward-compatible schema changes, automated pre-merge checks, and rehearsed rollback playbooks. It highlights techniques like shadow writes, dual-read strategies, and migration patterns that avoid irreversible states.


System Design ClassroomSubscribeSign in{"@context":"https://schema.org","@type":"NewsArticle","url":"https://newsletter.systemdesignclassroom.com/p/safe-database-rollback-starts-before-deployment","mainEntityOfPage":"https://newsletter.systemdesignclassroom.com/p/safe-database-rollback-starts-before-deployment","headline":"Safe Database Rollback Starts Before Deployment","description":"Learn why safe database rollback starts before deployment, and how backward-compatible schema changes, staged migrations, feature flags, and targeted recovery keep production failures from turning into data loss.","image":[{"@type":"ImageObject","url":"https://substack-post-media.s3.amazonaws.com/public/images/8da6ab16-4550-4596-992f-04a61a3c5bff_490x490.png"}],"datePublished":"2026-07-25T12:00:54+00:00","dateModified":"2026-07-25T12:00:54+00:00","isAccessibleForFree":true,"author":[{"@type":"Person","name":"Raul Junco","url":"https://substack.com/@rauljuncov","description":"I simplify software engineering. \n\nSharing lessons to help early-career developers grow as Software Engineers. \n\nI write about Systems Design, Algorithms, Good Practices, and Machine Learning.","identifier":"user:98661477","image":{"@type":"ImageObject","contentUrl":"https://substackcdn.com/image/fetch/$s_!ue6D!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F45a92f5e-1e2e-4dfa-9ff3-45fc5ad0c57e_612x612.png","thumbnailUrl":"https://substackcdn.com/image/fetch/$s_!ue6D!,w_128,h_128,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F45a92f5e-1e2e-4dfa-9ff3-45fc5ad0c57e_612x612.png"}}],"publisher":{"@type":"Organization","name":"System Design Classroom","url":"https://newsletter.systemdesignclassroom.com","description":"A System Design Newsletter to help you build better software. ","interactionStatistic":{"@type":"InteractionCounter","name":"Subscribers","interactionType":"https://schema.org/SubscribeAction","userInteractionCount":10000},"identifier":"pub:2391457","logo":{"@type":"ImageObject","url":"https://substackcdn.com/image/fetch/$s_!Mtgs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdb90e4a-4569-433d-93c4-a4863e3d54ef_69x69.png","contentUrl":"https://substackcdn.com/image/fetch/$s_!Mtgs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdb90e4a-4569-433d-93c4-a4863e3d54ef_69x69.png","thumbnailUrl":"https://substackcdn.com/image/fetch/$s_!Mtgs!,w_128,h_128,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdb90e4a-4569-433d-93c4-a4863e3d54ef_69x69.png"},"image":{"@type":"ImageObject","url":"https://substackcdn.com/image/fetch/$s_!Mtgs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdb90e4a-4569-433d-93c4-a4863e3d54ef_69x69.png","contentUrl":"https://substackcdn.com/image/fetch/$s_!Mtgs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdb90e4a-4569-433d-93c4-a4863e3d54ef_69x69.png","thumbnailUrl":"https://substackcdn.com/image/fetch/$s_!Mtgs!,w_128,h_128,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdb90e4a-4569-433d-93c4-a4863e3d54ef_69x69.png"}},"interactionStatistic":[{"@type":"InteractionCounter","interactionType":"https://schema.org/LikeAction","userInteractionCount":55},{"@type":"InteractionCounter","interactionType":"https://schema.org/ShareAction","userInteractionCount":4},{"@type":"InteractionCounter","interactionType":"https://schema.org/CommentAction","userInteractionCount":0}]}{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"System Design Classroom","item":"https://newsletter.systemdesignclassroom.com"},{"@type":"ListItem","position":2,"name":"Safe Database Rollback Starts Before Deployment","item":"https://newsletter.systemdesignclassroom.com/p/safe-database-rollback-starts-before-deployment"}]}Safe Database Rollback Starts Before DeploymentHow to deploy schema changes without painting yourself into a corner.Raul JuncoJul 25, 2026554ShareEverybody explains how to migrate a database.

Add a column. Create an index. Rename a field. Transform existing rows. Deploy the new application version.

But few people are focused on what happens when the deployment fails after the migration has already changed production data.

Imagine that version 2 of your application introduces a new database schema. The migration completes successfully, traffic reaches the new version, and users begin creating records using the new structure.


## Key Concepts

- Backward-compatible migrations: schema changes that allow old and new code to operate concurrently.
- Shadow writes / dual writes: write to both old and new schemas or systems to validate behavior before cutover.
- Feature flags and toggles: control rollout and quickly disable new behavior without DB reversions.
- Rehearsed rollback playbooks: tested steps to revert schema/data changes safely under pressure.

## Technical Insights

- Patterns: expand-then-contract migrations, use of triggers to populate new columns, and online schema change tools that avoid long locks.
- Automation: pre-deployment checks, canary runs, and automated verification of data integrity; metrics to detect migration regressions early.
- Trade-offs: some safe patterns increase short-term complexity and storage costs (e.g., shadow writes), but reduce downtime risk and rollback pain.

## Why This Matters

For SREs and release engineers, pre-planned rollback strategies reduce MTTR and incident severity for database-related failures, enabling safer continuous delivery for data-driven systems.

## Open Questions

- Which online schema migration tools and versions are recommended for our DB engines?
- How to validate data integrity automatically after a migration at scale?
- What operational runbooks and playbooks should be added to on-call rotations and runbook drills?

## Review Points

- Audit recent schema changes and identify non-backward-compatible migrations to remediate.
- Implement shadow write tests for a candidate migration in staging and measure divergence.)
- Create and rehearse rollback playbooks with simulated failures during deployment.

## Source

https://newsletter.systemdesignclassroom.com/p/safe-database-rollback-starts-before-deployment
