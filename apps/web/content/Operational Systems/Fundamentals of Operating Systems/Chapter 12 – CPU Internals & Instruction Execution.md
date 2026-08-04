---
tags:
  - course/operating-systems
  - topic/cpu
  - topic/instruction-execution
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 12
aliases:
  - CPU Internals & Instruction Execution
---


# Chapter 12 – CPU Internals & Instruction Execution

### Core idea

Understanding the CPU explains **why OS design choices exist**.

### CPU components

- **ALU** – arithmetic & logic
- **CU** – fetch, decode, control
- **Registers** – ultra-fast storage
- **MMU** – virtual → physical translation
- **Caches**
    - L1 (fastest, smallest)
    - L2
    - L3 (shared)

### Instruction lifecycle

1. Fetch
2. Decode
3. Execute
4. Memory access (optional)
5. Write back

### Performance techniques

- **Pipelining** – overlap stages
- **Parallelism** – multi-core
- **Hyper-threading** – logical cores
- **SIMD** – one instruction, many data

### Exam traps

- CPU mostly waits on memory
- Cache misses dominate performance cost