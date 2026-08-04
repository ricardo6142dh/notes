---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/memory
  - topic/dram
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 8
aliases:
  - Physical Memory & DRAM
---

up:: [[Fundamentals of Operating Systems]]
prev:: [[Chapter 7 – Memory Management Basics]]
next:: [[Chapter 9 – Virtual Memory]]

# Chapter 8 – Physical Memory & DRAM

### Core idea

Physical memory (DRAM) is **not uniform** and has **performance constraints**.

### DRAM basics

- **SRAM**
    - Very fast, expensive
    - Used for CPU caches
- **DRAM**
    - Slower, cheaper
    - Needs constant refresh
- Memory access happens in **bursts** (e.g. 64 bytes)

### Modern RAM

- **SDRAM** – synchronized with CPU clock
- **DDR (Double Data Rate)** – two transfers per cycle
- **DDR4 / DDR5**
    - Larger prefetch buffers
    - Higher bandwidth

### Exam traps

- RAM is not byte-by-byte accessed
- Cache line size matters for performance