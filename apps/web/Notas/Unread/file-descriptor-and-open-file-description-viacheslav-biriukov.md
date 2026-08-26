---
status: unread
source: https://biriukov.dev/docs/fd-pipe-session-terminal/1-file-descriptor-and-open-file-description/
created: 2026-08-26
tags:
  - file-descriptor
  - unix
  - os
  - file-io
  - systems
---

# File descriptor and open file description | Viacheslav Biriukov

## TL;DR

Explains the distinction between file descriptors and open file descriptions on Unix-like systems, and how they relate to process I/O, shared state, and resource management.

## Summary

The article defines file descriptors as per-process integer handles and open file descriptions as kernel-level objects representing the open file state (offsets, status flags). It covers dup/dup2/dup3 behavior, fork semantics, and how pipes and sessions interact with descriptors and file descriptions.


First of all, I want to touch on the two fundamental concepts of working with files:

These two abstractions are crucial for understanding the internals of a process creation, communication, and data transition.

The first concept is a file descriptor or fd. It’s a positive integer number used by file system calls instead of a file path in order to make a variety of operations. Every process has its own file descriptor table (see Image 1 below). The main idea of a file descriptor is to decouple a file path (or, more correctly, an inode with minor and major device numbers) from a file object inside a process and the Linux kernel. This allows software developers to open the same file an arbitrary number of times for different purposes, with various flags (for instance: O_DIRECT, O_SYNC, O_APPEND, etc.), and at different offsets.

For example, a program wants to read from and write to one file in two separate places. In this case, it needs to open the file twice. Thus, two new file descriptors will refer to 2 different entries in the system-wide open file description table.


## Key Concepts

- File descriptor: per-process integer that refers to an open file description.
- Open file description: kernel object holding file state like file offset and flags; multiple descriptors can reference the same description.
- dup/fork semantics: duplicating descriptors shares the open file description; forked child inherits copies referencing the same description.
- Pipes and sessions: how unnamed pipes create connected file descriptions and how terminal sessions manage controlling TTYs.

## Technical Insights

- Behavior: reading/writing on duplicated descriptors affects shared offsets; closing a descriptor only releases the reference; last close frees the description.
- Edge cases: O_APPEND semantics, file offset races across threads/processes, and atomicity guarantees of pipe writes under PIPE_BUF.
- Trade-offs: sharing descriptors simplifies IPC but requires careful synchronization to avoid races; per-thread open descriptions can be used to isolate offsets.

## Why This Matters

Understanding descriptors vs open file descriptions is essential for system programming, debugging I/O bugs, and designing robust inter-process communication in SRE and platform contexts.

## Open Questions

- How do modern kernels optimize open file description lifetime and caching?
- What are best practices to avoid offset races in multi-threaded servers?
- How do these semantics map to high-level runtime abstractions (Go, Java, Python)?

## Review Points

- Audit critical services for unsafe shared-offset patterns and add tests simulating concurrent descriptor use.
- Prefer O_APPEND for independent writers when appropriate and document any assumptions about atomic writes.
- Teach developers the distinction to reduce bugs from incorrect dup/fork usage.

## Source

https://biriukov.dev/docs/fd-pipe-session-terminal/1-file-descriptor-and-open-file-description/
