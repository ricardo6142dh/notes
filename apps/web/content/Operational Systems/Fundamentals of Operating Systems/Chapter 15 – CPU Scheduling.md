---
tags:
  - course/operating-systems
  - topic/cpu
  - topic/scheduling
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 15
aliases:
  - CPU Scheduling
---


# Chapter 15 – CPU Scheduling

### Core idea

Scheduling decides **which process or thread runs next**.

### Goals

- Fairness
- High throughput
- Low latency
- Predictability

### Scheduling types

- **Preemptive** – OS can interrupt
- **Non-preemptive** – task yields voluntarily

### Common algorithms

- **FCFS** – First Come, First Served
- **SJF** – Shortest Job First
- **Round Robin** – Time slices
- **Priority scheduling**

### Key metric

- **Time slice**
    - Too small → overhead
    - Too large → poor responsiveness

### Exam traps

- SJF is optimal *but impractical*
- Preemption improves responsiveness