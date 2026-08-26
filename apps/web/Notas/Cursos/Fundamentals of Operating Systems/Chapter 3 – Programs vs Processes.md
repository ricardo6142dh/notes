---
tags:
  - course/operating-systems
  - topic/processes
course: "[[Fundamentals of Operating Systems]]"
---


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