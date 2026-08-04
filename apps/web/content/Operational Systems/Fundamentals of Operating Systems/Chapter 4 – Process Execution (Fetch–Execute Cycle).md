---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/cpu
  - topic/instruction-execution
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 4
aliases:
  - Process Execution (Fetch–Execute Cycle)
---

up:: [[Fundamentals of Operating Systems]]
prev:: [[Chapter 3 – Programs vs Processes]]
next:: [[Chapter 5 – The Stack]]

# Chapter 4 – Process Execution (Fetch–Execute Cycle)

### Core idea

The CPU executes instructions in a **repeatable cycle**.

### Instruction lifecycle

1. **Fetch** – Load instruction from memory
2. **Decode** – Understand the instruction
3. **Execute** – Perform operation
4. **Write back** – Store result
5. **Increment PC** – Move to next instruction

### Key facts

- **Program Counter (PC)** points to current instruction
- Instructions are often fetched in **bursts** (cache lines)
- Cache is **much faster** than RAM

### Why it matters

- Explains performance differences
- Explains why locality of code is important