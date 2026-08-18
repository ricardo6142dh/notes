---
status: unread
source: https://newsletter.systemdesignclassroom.com/p/safe-database-rollback-starts-before-deployment
created: 2026-08-12
tags:
- databases
---

# Safe Database Rollback Starts Before Deployment

## TL;DR
Application rollback is not database rollback; safe schema changes require compatibility planning, staged migration, observable backfills, delayed cleanup, and recovery paths before deployment.

## Subject
The article explains why production database rollbacks are harder than reverting application binaries. It focuses on schema compatibility, data preservation, staged rollout, and operational recovery.

## Author's Objective
The author argues that teams should design database changes around coexistence between old code, new code, and intermediate schema states. The goal is to prevent emergency recovery decisions during incidents.

## Brief
The central point is that production data keeps changing after deployment. Rolling back code may be easy, but the old application may not understand the new schema or the values already written by the new version.

The author warns against trusting simple up/down migration thinking in production. A down migration can restore schema shape while losing data, truncating values, or leaving records in a form older code cannot interpret.

The recommended pattern is Expand, Migrate, and Contract. Add new structures without removing old ones, deploy transitional code that writes or reads both safely, backfill existing data in bounded batches, and only later remove obsolete fields.

The article also separates deployment from release. Feature flags and canaries can reduce rollback pressure, but they must not allow new writes that older application versions cannot read while both versions are still running.

Finally, the author treats observability and recovery as part of migration design. Backfills should be idempotent, restartable, bounded, observable, and verifiable before destructive cleanup happens.

## Key Ideas
- Reverting application code does not undo production data written after a migration.
- Schema rollback is not data rollback when migrations delete, truncate, merge, rewrite, or transform information.
- Compatibility depends on deployment timing, not only on the SQL statement.
- Breaking schema changes should be split into Expand, Migrate, and Contract phases.
- Feature flags help decouple code deployment from activating risky data-writing behavior.
- Verification queries, metrics, logs, snapshots, CDC, and backups are part of the rollback strategy.

## Technical Notes
- Before deploying, verify that the previous application version can run against the new schema.
- Backfills should run in bounded, idempotent, restartable batches with progress and failure metrics.
- Do not drop old columns immediately after switching reads and writes; keep them through a defined rollback window.
- Dual writes are only straightforward when they are atomic; across services or databases they become a distributed consistency problem.
- Full database restore can destroy valid post-deployment writes, so targeted repair from backup or CDC may be safer.

## Why This Matters
Database migrations are production state transitions, not just schema edits. A rollback plan that ignores new writes, partial failures, and compatibility windows can turn a small release bug into data loss.

The useful engineering habit is to preserve options: keep old and new versions compatible, delay destructive cleanup, instrument migrations, and know the repair path before deployment.

## Review Points
- Classify each migration by whether old and new application versions can both operate safely.
- Check whether the migration discards information or writes values older code cannot parse.
- Confirm that feature flags do not bypass compatibility constraints during rolling deployments.
- Define observability for locks, lag, errors, backfill progress, retries, and verification queries.
- Decide the recovery path before release, especially for corrupted or partially migrated data.

## Source
https://newsletter.systemdesignclassroom.com/p/safe-database-rollback-starts-before-deployment
