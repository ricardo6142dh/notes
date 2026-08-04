---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/memory
  - topic/heap
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 6
aliases:
  - Data Section & Heap
---

prev:: [[Chapter 5 – The Stack]]
next:: [[Chapter 7 – Memory Management Basics]]

# Chapter 6 – Data Section & Heap

## Data Section

### Core idea

Stores **global and static variables**.

### Key properties

- Fixed size
- Exists for entire process lifetime
- Shared by all functions
- Can be read-only or read-write

### Exam angle

- Globals ≠ stack variables
- Concurrency risks (shared data)

## Heap

### Core idea

The **heap** is for **dynamic memory allocation**.

### Characteristics

- Allocated via `malloc`, `free`, `new`
- Grows **low to high**
- Accessible by all functions
- Persists until explicitly freed

### Common problems

- **Memory leaks** – allocated but never freed
- **Dangling pointers** – pointer to freed memory
- **Double free** – freeing same memory twice

### Performance notes

- Stack is faster (better cache locality)
- Heap is flexible but slower

### Exam traps

- Losing a pointer ≠ freeing memory
- Freeing memory ≠ clearing pointers