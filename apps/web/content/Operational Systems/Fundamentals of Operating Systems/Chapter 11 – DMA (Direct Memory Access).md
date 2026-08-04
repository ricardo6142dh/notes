---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/dma
  - topic/io
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 11
aliases:
  - DMA (Direct Memory Access)
---

prev:: [[Chapter 10 – Paging, Page Tables & Swap]]
next:: [[Chapter 12 – CPU Internals & Instruction Execution]]

# Chapter 11 – DMA (Direct Memory Access)

### Core idea

DMA allows devices to transfer data **directly to RAM**, bypassing the CPU.

### Why DMA exists

- CPU is too slow for large I/O copies
- Example:
    - Disk → RAM
    - Network → RAM

### How it works

- DMA controller handles transfer
- CPU sets it up, then continues working

- Interrupt signals completion

### Limitations

- Uses **physical addresses**
- Doesn’t understand virtual memory
- Requires pinned (non-swappable) memory
- Security risks → **IOMMU**

### Exam angles

- DMA improves throughput
- CPU still involved in setup and completion