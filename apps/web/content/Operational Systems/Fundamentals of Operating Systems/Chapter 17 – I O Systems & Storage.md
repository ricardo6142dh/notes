---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/io
  - topic/storage
  - topic/file-systems
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 17
aliases:
  - I O Systems & Storage
  - I/O Systems & Storage
---

prev:: [[Chapter 16 – Concurrency & Synchronization]]
next:: [[Chapter 18 – Sockets]]

# Chapter 17 – I/O Systems & Storage

## File System Module

## Core idea

A **file system (FS)** is an OS layer that **organizes persistent storage** into **files and directories**, hiding disk complexity and improving performance and safety.

---

## 1. Why File Systems Exist

### Problem without a file system

- Disks are just **arrays of blocks**
- No names, no structure, no permissions
- Applications would need to manage raw blocks

### What file systems provide

- Files & directories
- Naming
- Metadata (size, owner, timestamps)
- Permissions
- Abstraction over disk layout

### Exam angle

> File systems turn **blocks into files**
> 

---

## 2. Storage Abstraction Layers (Very Exam-Relevant)

From bottom to top:

1. **Physical storage**
    - HDD / SSD
    - Physical blocks (PBAs)
2. **Logical blocks (LBAs)**
    - Exposed by disk controller
3. **File system blocks**
    - Groups of LBAs
4. **Files**
    - Logical byte streams

### Key rule

- **FS block ≥ LBA**
- **FS block ≤ virtual memory page size**

---

## 3. File System Blocks & Fragmentation

### Block size

- Common sizes: 4 KB, 8 KB
- Defined when formatting

### Trade-offs

- Large blocks:
    - Fewer metadata entries
    - More **internal fragmentation**
- Small blocks:
    - Less wasted space
    - More metadata overhead

### Exam trap

- Fragmentation exists **even with file systems**

---

## 4. FAT32 (Conceptual File System Example)

### How FAT works

- File Allocation Table (FAT)
- Each entry points to the **next block**
- End-of-chain marks file end

### Characteristics

- Simple
- No journaling
- Poor performance for large disks
- Used clusters to scale beyond size limits

### Exam angle

- FAT uses **linked allocation**
- Easy but inefficient

---

## 5. Modern File Systems (Conceptual)

### Examples

- **EXT4** – Linux default
- **XFS** – Large files, high throughput
- **APFS** – Apple
- **NTFS** – Windows
- **btrfs** – Copy-on-write, snapshots

### Common features

- Journaling
- Caching
- Delayed allocation
- Crash recovery

---

## 6. OS Page Cache (Extremely Important)

### Core idea

The OS caches file data in **memory** to avoid disk access.

### How it works

- File system blocks are mapped to **virtual memory pages**
- Reads:
    - Check page cache first
    - Disk access only on cache miss
- Writes:
    - Go to page cache first
    - Flushed later (write-back)

### Benefits

- Faster reads
- Shared cache between processes

### Dangers

- Data loss if crash before flush
- Torn writes (DBs hate this)

### Exam trap

> `write()` ≠ data on disk
> 

---

## 7. fsync(), O_SYNC, O_DIRECT

### fsync()

- Forces cache → disk
- Expensive
- Used by databases

### File open modes

- **O_SYNC** – write always flushed
- **O_DIRECT** – bypass page cache (DMA)
- **O_APPEND** – append-only writes

### Exam angle

- Too many `fsync()` calls = bad performance
- `O_DIRECT` avoids double buffering

---

## 8. File Metadata

Each file has metadata such as:

- Size
- Owner (UID/GID)
- Permissions
- Timestamps
- Block locations

Stored in:

- **Inodes** (Unix-like FS)

### Exam trap

- File name ≠ file metadata
- Directory maps **names → metadata**

---

## 9. Directories

### What a directory really is

- A file mapping:
    - **filename → inode number**

### Key idea

- Directories are files
- Kernel interprets them specially

---

## 10. Reading a File (End-to-End Flow)

1. App calls `read()`
2. Kernel checks page cache
3. If miss:
    - FS translates file offset → block
    - Block → LBAs
    - Disk read
4. Cache updated
5. Data copied to user buffer

### Exam angle

- Many layers
- Disk is last resort

---

## 11. SSD-Specific Concerns (High-Level)

### SSD behavior

- Cannot overwrite in place
- Uses:
    - Garbage collection
    - Wear leveling
    - Over-provisioning

### Performance issue

- **Write amplification**
    - One logical write → many physical writes

### Exam trap

- SSD ≠ simple fast HDD