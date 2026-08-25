---
status: unread
source: https://aws.amazon.com/blogs/database/migrating-mission-critical-payments-at-nubank-to-amazon-aurora-postgresql/
created: 2026-08-25
tags:
  - aurora-postgresql
  - database-migration
  - payments
  - high-availability
  - nubank
---

# Migrating mission-critical payments at Nubank to Amazon Aurora PostgreSQL | AWS Database Blog

## TL;DR

Nubank migrated mission-critical payments workloads to Amazon Aurora PostgreSQL, focusing on resilience, migration strategy, and achieving production-grade performance and availability.

## Summary

The post describes the migration plan, including schema compatibility, cutover strategy, replication, testing, and operational controls used to ensure minimal disruption for payments processing. It highlights Aurora-specific features leveraged, such as read replicas, fast crash recovery, and automated backups.


Filter: All English Contact us AWS Marketplace Support My account re:Invent Discover AWS Products Solutions Pricing Resources Search

Filter: All Sign in to console Create account Explore topics Event Register now for AWS re:Invent 2026 Data Migration On-prem databases weren't built for agentic AI. Amazon RDS is Independent Software Vendors AI for software & tech: build, scale, and monetize AI for Small Businesses Solutions designed for your business. Delivered by AWS Partners Artificial Intelligence (AI) Accelerate AI from experimentation to production with AWS AI agents AgentCore: One platform to build, connect and optimize agents News & announcements AWS blog About AWS AWS is the world's most comprehensive cloud, enabling organizations to accelerate innovation, reduce costs, and scale more efficiently

Analytics Application Integration Artificial Intelligence Business Applications Compute Customer Experience Databases Developer Tools End User Computing Game Tech Management Tools Media Services Migration & Modernization Multicloud & Hybrid Networking & Content Delivery Operations Security & Identity Storage Supply Chain Browse all products Featured Products Get started with one of these featured services or browse all

Transform Eliminate tech debt with agentic AI to modernize legacy systems and code Aurora Serverless relational database service for PostgreSQL, MySQL, and DSQL Amazon Bedrock The end-to-end platform for building generative AI applications and agents Amazon Connect Customer AI-native solution for delivering exceptional experiences across customer interactions EC2 Secure and resizable compute capacity for virtually any workload Nova Foundation models delivering frontier intelligence and top price performance OpenSearch Service Real-time search, observability, and security analytics S3 Virtually unlimited secure object storage for AI, analytics, and archives What’s new Explore new capabilities and the latest technologies Customer success stories Learn how customers around the world accelerate their cloud By industry By organization type Solutions Library Industry solutions on AWS Transform your industry with AWS cloud solutions. Access proven architectures, compliance guides, and success stories of customers using AWS products tailored to your sector. Explore AWS solutions for your industry.


## Key Concepts

- Amazon Aurora PostgreSQL: a managed, MySQL/PostgreSQL-compatible relational database with distributed storage and automated HA features.
- Zero-downtime migration patterns: replication-based cutovers, dual-write strategies, and canary verification.
- Data integrity and transactional guarantees: ensuring ACID properties during migration for payments workloads.
- Resilience features: read replicas, failover, backups, and point-in-time recovery.

## Technical Insights

- Architecture: use of logical replication or DMS for data movement, staging environments for schema validation, and traffic routing for cutover.
- Performance: tuning parameters, instance sizing, and IOPS considerations for payment throughput; discussion of observed latency and throughput improvements.
- Trade-offs: operational reliance on managed services vs full control; considerations for compliance and latency-sensitive workflows.

## Why This Matters

For SREs and platform engineers, the case shows how to migrate critical transactional systems with minimal risk by leveraging managed DB features, thorough testing, and staged rollouts; it provides a template for other teams considering similar moves.

## Open Questions

- What exact replication tools and settings did Nubank use (DMS, pglogical, native replication)?
- What were the observed p99 latencies before and after migration under peak loads?
- How were compliance and auditing requirements handled during and after migration?

## Review Points

- Review our payment schemas for Aurora compatibility and identify migration blockers.
- Plan a staged migration with a rehearsal in staging using production-like traffic.
- Define monitoring and rollback hooks focusing on transaction integrity and latency SLOs.

## Source

https://aws.amazon.com/blogs/database/migrating-mission-critical-payments-at-nubank-to-amazon-aurora-postgresql/
