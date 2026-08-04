---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/processes
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 3
aliases:
  - Programs vs Processes
---

prev:: [[Chapter 2 – System Architecture]]
next:: [[Chapter 4 – Process Execution (Fetch–Execute Cycle)]]

# Chapter 3 – Programs vs Processes

### Core idea

A **program** is static; a **process** is a program **in execution**.

### Program

- Compiled executable file
- Lives on disk
- CPU-architecture specific
- At rest

### Process

- Program loaded into memory
- Has:
    - PID (process ID)
    - Program Counter (PC)
    - Registers
    - Memory layout
- Multiple processes can run **the same program**

### Memory layout (conceptual)

- Text (code)
- Data (globals/statics)
- Heap
- Stack