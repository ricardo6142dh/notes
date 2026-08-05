---
tags:
  - course/operating-systems
  - topic/dma
  - topic/io
course: "[[Fundamentals of Operating Systems]]"
---


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