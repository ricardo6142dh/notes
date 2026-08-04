---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/memory
  - topic/paging
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 10
aliases:
  - Paging, Page Tables & Swap
---

up:: [[Fundamentals of Operating Systems]]
prev:: [[Chapter 9 – Virtual Memory]]
next:: [[Chapter 11 – DMA (Direct Memory Access)]]

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