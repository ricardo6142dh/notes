---
tags:
  - course/operating-systems
  - topic/os-basics
  - topic/posix
  - topic/linux
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 1
aliases:
  - Introduction to Operating Systems
  - Operating Systems Introduction
  - OS Introduction
---


# Chapter 1 – Introduction to Operating Systems

### Core idea

An **Operating System (OS)** is software that **manages hardware resources** and provides **abstractions** so applications can run safely and efficiently.

### POSIX, Linux, and libc

**POSIX** is a **standard** that defines how an operating-system interface should behave from the program’s point of view.

It helps answer questions like:

- what `open()` is supposed to do
- what `read()` should return
- how processes, files, and permissions should behave

### Important distinction

POSIX defines the **behavior/contract**, not the internal Linux implementation.

That means:

- POSIX can say how `open()` should behave
- but POSIX does **not** require that the internal Linux kernel entry point itself must literally be named `open`
- what matters is that the exposed interface behaves according to the standard

### How Linux uses POSIX

Linux is **largely POSIX-compatible**, which is one of the reasons many Unix-style programs can run on it with little change.

In practice:

- applications are often written against a POSIX-style interface
- Linux provides kernel mechanisms that can satisfy that contract
- the exact internal syscall names and kernel structures are Linux implementation details

### Role of libc

The **libc** (such as glibc) is the user-space library that exposes familiar functions like:

- `open()`
- `read()`
- `write()`
- `close()`

It acts as a **translation/adaptation layer** between application code and the Linux kernel.

### Key idea

Your C program may call:

```c
open("file.txt", O_RDONLY)
```

But libc is the layer that translates that call into the appropriate kernel-facing interface.

So the model is:

**program → libc → kernel**

### Why this matters

This is why:

- programmers code against a stable API
- Linux can keep internal implementation freedom
- standards and implementations are not the same thing

### Mental model

> POSIX says **what** the interface must do.
> 

> Linux decides **how** to implement it.
> 

> libc translates what programs call into what the kernel expects.
> 

### Key points

- OS is **software**, not hardware
- Manages:
    - CPU
    - Memory
    - Storage
    - Network
- Applications **never talk to hardware directly** → they talk to the OS
- OS provides **APIs** that abstract hardware differences
- Most OSs are **general-purpose**

### Why this matters (exam angle)

- Explains *why apps are portable*
- Justifies **scheduling, isolation, and protection**