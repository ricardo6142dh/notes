---
tags:
  - course/operating-systems
  - topic/memory
  - topic/paging
course: "[[Fundamentals of Operating Systems]]"
---


# Chapter 10 – Paging, Page Tables & Swap

### Core idea

The OS uses **paging** to manage memory efficiently and transparently.

### Page tables

- Map **virtual page → physical frame**
- Stored in memory
- CPU caches translations in **TLB**

### Swap

- When RAM is full:
    - Unused pages moved to disk (swap)
- On access:
    - **Page fault**
    - OS loads page back into RAM

### Costs

- Page faults are expensive
- Disk ≪ RAM speed

### Exam traps

- Swap ≠ more RAM (it’s slower)
- TLB misses hurt performance