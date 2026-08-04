---
tags:
  - course/operating-systems
  - topic/processes
  - topic/threads
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 13
aliases:
  - Processes vs Threads
---


# Chapter 13 – Processes vs Threads

### Core idea

A **process** is an isolated execution environment; a **thread** is a lightweight execution unit **inside a process**.

### Process

- Own address space
- Heavyweight
- Strong isolation
- Context switch is expensive

### Thread

- Shares process memory
- Owns:
    - Stack
    - Registers
    - Program counter
- Lightweight
- Faster context switches

### Why threads exist

- Better CPU utilization
- Parallelism
- Responsiveness (e.g. UI + background work)

### Exam traps

- Threads ≠ safer (shared memory!)
- One process can have many threads