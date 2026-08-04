---
tags:
  - course/operating-systems
  - topic/kernel
  - topic/system-architecture
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 2
aliases:
  - System Architecture
---


# Chapter 2 – System Architecture

### Core idea

The OS is centered around the **kernel**, which controls all system resources.

### Key components

- **CPU** – Executes instructions
- **Memory (RAM)** – Fast, volatile storage for running programs
- **Storage** – Persistent (HDD/SSD), slower than RAM
- **Network** – Communication via NIC and protocols
- **Kernel**
    - Core of the OS
    - Manages CPU, memory, devices
- **User tools**
    - Shells, GUIs, utilities (`top`, `ps`, etc.)

### Important distinctions

- **Kernel ≠ entire OS**
- OS = kernel + user-space tools

### Exam traps

- Kernel vs OS
- Who manages hardware? → **Kernel**