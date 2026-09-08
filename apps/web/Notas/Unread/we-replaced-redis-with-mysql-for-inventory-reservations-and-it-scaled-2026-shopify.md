---
status: unread
source: https://shopify.engineering/scaling-inventory-reservations
created: 2026-09-08
tags:
  - mysql
  - inventory
  - reservations
  - scalability
  - shopify
---

# We replaced Redis with MySQL for inventory reservations—and it scaled (2026) - Shopify

## TL;DR

Shopify replaced Redis with MySQL-backed reservations for inventory and achieved scalability by optimizing locking, schema, and operational practices to handle high concurrency.

## Summary

How we used SKIP LOCKED, composite primary keys, and connection visibility to hit our scale targets.

The article explains why Shopify moved inventory reservation logic from Redis to MySQL: to gain stronger consistency, easier operational tooling, and simplified data pipelines. It details schema changes, transaction strategies (optimistic/pessimistic locking), batching, and techniques to reduce contention and improve throughput. The post includes benchmarks, migration steps, and lessons learned during rollout.


StartStart your business.Build your brandCreate your website.Online store editorCustomize your store.Store themesFind business apps.Shopify app storeOwn your site domain.Domains & hostingExplore free business tools.Tools to run your businessSellSell your products.Sell online or in personCheck out customers.World-class checkoutSell online.Grow your business onlineSell across channels.Reach millions of shoppers and boost salesSell globally.International salesSell wholesale & direct.Business-to-business (B2B)MarketMarket your business.Reach & retain customersMarket across social.Social media integrationsChat with customers.Shopify InboxNurture customers.Shopify MessagingKnow your audience.Gain customer insightsManageManage your business.Track sales, orders & analyticsMeasure your performance.Analytics and ReportingManage your stock & orders.Inventory & order managementAutomate your business.Shopify FlowShopify Developers.Build with Shopify's powerful APIsPlus.A commerce solution for growing digital brandsAll Products.Explore all Shopify products & featuresPricingResourcesHelp and supportHelp and support.Get 24/7 supportBusiness courses.Learn from proven expertsPopular topicsWhat is Shopify?.How our commerce platform worksEssential toolsBusiness name generator .Logo maker.Stock photography.QR code generator.What’s newChangelog.Your source for recent updatesNewsroom.All company news and press releasesEngineering BlogAI & Machine LearningMobileInfrastructureCultureLatestMore topicsSecurityDeveloper ToolingData Science EngineeringSearchType something you're looking forLog inStart for freeblog|InfrastructureWe replaced Redis with MySQL for inventory reservations—and it scaledHow we used SKIP LOCKED, composite primary keys, and connection visibility to hit our scale targets.

During checkout, when a buyer clicks "Complete purchase," we need to guarantee the items they're buying are still available. If we get this wrong in one direction, two buyers purchase the same last unit: the merchant has to cancel an order, send an apology email, and eat the support cost. If we get it wrong in the other direction, we tell a buyer something is sold out when it isn't, and the merchant loses a sale they should have made.

At Shopify's scale, either failure compounds fast. On Black Friday 2025, merchants on our platform hit a record $5.1 million in sales per minute at peak. Every one of those transactions touches inventory.

Our oversell protection system handles this by reserving inventory during payment processing—a short hold that prevents two concurrent checkouts from claiming the same unit. For years, this ran on Redis. When we moved toward a unified database strategy, we had to answer a hard question: could MySQL handle the same scale?


## Key Concepts

- Inventory reservation: temporary allocation of stock for pending orders to prevent overselling.
- Reservation store: moving from Redis (in-memory, fast) to MySQL (durable, transactional) for stronger consistency guarantees.
- Locking strategies: use of row-level locks, optimistic updates with versioning, and minimizing lock scope to reduce contention.

## Technical Insights

- Schema: normalized tables for SKUs and reservations, indexes for fast lookups, and compact representations to reduce I/O.
- Transactions: careful use of short transactions, retry loops, and idempotent writes to handle contention and avoid long-held locks.
- Performance: batching writes, using read replicas for non-critical reads, and partitioning/sharding to spread load; measured p50/p95 latencies and throughput improvements.
- Trade-offs: MySQL adds IO and potential latency vs Redis, but reduces operational complexity and makes backups, restores, and analytics simpler.

## Why This Matters

For platform teams, this case shows that a durable relational store can replace an in-memory tier for certain coordination workloads when paired with careful schema and transaction design, yielding better consistency and simpler operations at scale.

## Open Questions

- Exact benchmarks: what QPS and p99 latencies did they observe before and after migration?
- How did they handle failover and replica lag during peak traffic?
- What migration strategies were used to move live traffic without customer-visible regressions?

## Review Points

- Review our reservation use-cases and test MySQL-backed patterns in staging with representative contention.
- Prototype short transactions with optimistic locking and measure retry rates under load.
- Plan operational runbooks for failover, replica lag mitigation, and rollbacks during migration.

## Source

https://shopify.engineering/scaling-inventory-reservations
