---
tags:
  - course/operating-systems
  - topic/memory
  - topic/virtual-memory
course: "[[Fundamentals of Operating Systems]]"
---


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