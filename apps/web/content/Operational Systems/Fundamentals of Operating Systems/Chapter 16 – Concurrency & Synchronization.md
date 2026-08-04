---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/concurrency
  - topic/synchronization
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 16
aliases:
  - Concurrency & Synchronization
---


# Chapter 16 – Concurrency & Synchronization

### Core idea

Concurrency introduces **race conditions** when shared data is accessed.

### Problems

- **Race condition** – outcome depends on timing
- **Critical section** – code accessing shared state
- **Deadlock** – circular waiting

### Synchronization tools

- **Mutex** – mutual exclusion
- **Semaphore** – counting access
- **Spinlock** – busy waiting
- **Condition variable** – waiting for state

### Deadlock conditions

1. Mutual exclusion
2. Hold and wait
3. No preemption
4. Circular wait

### Exam angles

- Concurrency bugs are **hard to reproduce**
- Deadlocks require all four conditions