---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/memory
  - topic/virtual-memory
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 9
aliases:
  - Virtual Memory
---

prev:: [[Chapter 8 – Physical Memory & DRAM]]
next:: [[Chapter 10 – Paging, Page Tables & Swap]]

# Chapter 9 – Virtual Memory

### Core idea

Each process sees its **own private address space**, regardless of physical memory layout.

### Why virtual memory exists

- Solves **fragmentation**
- Provides **process isolation**
- Allows **large programs** to run
- Enables **sharing** (code, libraries)

### Paging

- Memory divided into **pages** (usually 4 KB)
- Virtual pages mapped to physical frames
- Mapping stored in **page tables**
- CPU uses **MMU** for translation

### Benefits

- Same virtual address ≠ same physical address
- Code can be shared, data isolated

### Exam angles

- Virtual ≠ physical memory
- Page tables are per process