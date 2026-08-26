---
status: unread
source: https://transactional.blog/how-to-learn/disk-io
created: 2026-08-26
tags:
  - disk-io
  - storage
  - performance
  - systems
  - sre
---

# Userland Disk I/O

## TL;DR

Practical primer on disk I/O: underlying device behavior, latency vs throughput trade-offs, queuing, and how these factors shape system design and performance tuning.

## Summary

The article explains core disk I/O concepts: block devices, seek and rotational latency (for HDDs), SSD characteristics, IOPS vs throughput, and the role of queues and OS buffering. It provides actionable guidance for benchmarking, observing, and tuning storage performance in production systems.


Posted 2024-11-0610 minute reading timeMandatory Legal Disclaimer:Opinions expressed are solelymy own and do not express theviews or opinions of my employer.

With thanks to Thomas Munro for the Windows corrections, and Pratyush Mishra for the F_NOCACHE correction.

In database land, most databases open(2) their WAL and data files with O_DIRECT so that write(2)/writev(2)/pwritev(2) perform unbuffered IO, maintain their own page cache, and utilize fdatasync() for durability. Doing so gives the most control over what data maintained in the page cache, allows directly modifying cached data, and using O_DIRECT then skips the kernel’s page cache when reading and writing data from or to disk. O_SYNC/O_DSYNC allow a single write() with O_DIRECT to be equivalent to a write() followed by a fsync()/fdatasync(). In the Linux world, the existence of O_DIRECT is surprisingly controversial, and Linus has some famous rants on the subject illustrating the OS/DB world view mismatch.

There are some notable examples of databases that rely on buffered IO and the kernel page cache (e.g. RocksDB, LMDB). Relying on the kernel’s page cache can be polite in the context of an embedded database meant to be used within another application and co-exist with many other applications on a user’s computer. Leaving the caching decisions to the kernel means that more memory for the page cache can be easily granted when the system has the memory to spare, and can be reclaimed when more available memory is needed. If using buffered IO, preadv2/prwritev2’s flags can be helpful. pwritev2() has also gained support for multi-block atomic writes, which is conditional on filesystem and drive support[1]. [1]: Drive support means a drive for which Atomic Write Unit Power Fail (awupf) in nvme-cli id-ctrl returns something greater than zero. I’ve never actually seen a drive support this though.


## Key Concepts

- IOPS vs throughput: IOPS (operations/sec) targets random access workloads; throughput (MB/s) targets streaming reads/writes.
- Latency components: device latency, queueing delay, scheduler overhead, and OS buffering.
- Block sizes and alignment: how IO size and alignment affect performance and write amplification.
- Device types: HDD vs SSD vs NVMe — different performance profiles and failure modes.

## Technical Insights

- Benchmarking: use fio and representative workloads to measure IOPS, latency distributions (p50,p95,p99) and throughput; avoid synthetic tests that misrepresent real access patterns.
- OS tuning: elevator/scheduler choices, read-ahead, queue-depth, and fsync behavior significantly affect observed latency and durability trade-offs.
- Architecture: use caching, tiered storage, and appropriate replication strategies to mask device limitations; design for tail-latency by limiting contention and isolating noisy neighbors.
- Trade-offs: consistency and durability (fsync) vs write latency; higher parallelism increases throughput but can worsen p99 latency without careful scheduling.

## Why This Matters

SREs and platform engineers must understand disk I/O to choose storage types, configure OS parameters, and design systems that meet latency and throughput SLOs under realistic workloads.

## Open Questions

- What representative fio job parameters best match our workload (block size, rand/seq mix, queue depth)?
- How do our cloud providers storage performance guarantees map to observed p99 latencies for our dataset sizes?
- Which caching or tiering strategies reduce cost without violating SLOs?

## Review Points

- Run fio benchmarks in staging with production-like datasets and capture p50/p95/p99 latency and throughput.
- Review current fsync and write-back settings; test impact of changing queue depth and IO scheduler on tail latency.
- Evaluate using NVMe ephemeral or provisioned IOPS volumes for latency-sensitive workloads.

## Source

https://transactional.blog/how-to-learn/disk-io
