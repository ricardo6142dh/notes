---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/memory
  - topic/stack
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 5
aliases:
  - The Stack
---

up:: [[Fundamentals of Operating Systems]]
prev:: [[Chapter 4 – Process Execution (Fetch–Execute Cycle)]]
next:: [[Chapter 6 – Data Section & Heap]]

# Chapter 5 – The Stack

### Core idea

The **stack** manages function calls and local variables.

### Stack characteristics

- Grows **from high to low memory**
- Each function call gets a **stack frame**
- Stores:
    - Local variables
    - Return address
    - Saved registers

### Important registers

- **SP (Stack Pointer)** – Top of the stack
- **BP (Base / Frame Pointer)** – Fixed reference for variables
- **LR (Link Register)** – Return address
- **PC** – Next instruction

### Function calls

- Caller saves state
- Callee gets new stack frame
- On return:
    - Stack is popped
    - Execution resumes via return address

### Exam traps

- Stack is **limited**
- Stack overflow = deep recursion or large locals
- Stack variables **die when function returns**