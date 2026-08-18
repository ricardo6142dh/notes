---
tags:
  - course/operating-systems
  - topic/processes
  - topic/context-switching
course: "[[Fundamentals of Operating Systems]]"
---


# Chapter 14 – Context Switching

### Core idea

A **context switch** saves the state of one execution unit and restores another.

### What gets saved

- Registers
- Program Counter
- Stack Pointer
- CPU flags
- Memory mappings (if process switch)

### Types

- **Thread switch** – cheaper
- **Process switch** – more expensive

### When switches happen

- Time slice expired
- I/O blocking
- Higher-priority process ready
- System call

### Cost

- No useful work done
- Cache pollution
- TLB flush (for process switches)

### Exam angle

- Context switches are **overhead**
- Threads reduce switching cost