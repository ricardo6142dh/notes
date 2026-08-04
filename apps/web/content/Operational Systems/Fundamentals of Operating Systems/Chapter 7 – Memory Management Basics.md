---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/memory
  - topic/linux
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 7
aliases:
  - Memory Management Basics
---

prev:: [[Chapter 6 – Data Section & Heap]]
next:: [[Chapter 8 – Physical Memory & DRAM]]

# Chapter 7 – Memory Management Basics

### Core idea

Memory is a **limited, fast resource** that the OS must allocate, track, protect, and reclaim.

### Key concepts

- **RAM**
    - Fast, volatile
    - Stores active processes and data
- **Registers & caches**
    - Faster than RAM
    - Hide RAM latency
- OS responsibilities:
    - Allocate memory to processes
    - Prevent one process from accessing another’s memory
    - Reclaim memory when processes exit

### Exam angles

- Why memory is harder than CPU scheduling
- Why isolation is critical

Memória de Processos no Linux

### 🔸 **Data Section**

- Armazena variáveis globais e estáticas **inicializadas**.
- Alocada na inicialização do processo, com tamanho fixo.

### 🔸 **Alocação de Memória para um Processo**

- Inclui seções: **Text (código)**, **Data**, **BSS (não inicializados)**, **Heap**, **Stack**.
- Heap e Stack crescem dinamicamente.
- O sistema operacional define limites (via `ulimit`, `/etc/security/limits.conf`, etc.).

### 🔸 **Heap**

- Usado para alocação dinâmica de memória (`malloc`, `new`).
- Cresce para cima na memória.
- Gerenciado via `brk()` ou `mmap()`.
- Problemas comuns: *memory leak, double free, use-after-free, buffer overflow, heap corruption*.

### 🔸 **5 Problemas Mais Comuns com Heap**

1. **Memory Leak** – Memória não liberada.
2. **Double Free** – Liberação dupla da mesma área.
3. **Use-After-Free** – Acesso após `free`.
4. **Buffer Overflow** – Escrita além do espaço alocado.
5. **Heap Corruption** – Corrupção da estrutura interna do heap.

### 🔸 **Como Ver Uso de Memória de um Processo**

- `cat /proc/<pid>/status` → mostra `VmSize`, `VmRSS`, `VmData`, `VmStk`, etc.
- `cat /proc/<pid>/maps` → mostra regiões mapeadas (heap, stack, .so).
- `pmap -x <pid>` → mapa com tamanhos.
- `ulimit -a` → mostra limites configurados.

### 🔸 **Campos Comuns em `/proc/<pid>/status`**

- `VmSize` → memória virtual total.
- `VmRSS` → memória física usada.
- `VmData` → área de heap.
- `VmStk` → pilha.
- `VmExe` → código executável.
- `VmLib` → bibliotecas compartilhadas.
- `VmPeak` → pico de uso virtual.

### 🔸 **Arquivos `.so` em `/proc/<pid>/maps`**

- São **bibliotecas compartilhadas** mapeadas na memória do processo.
- São carregadas via `mmap()` e **usadas sob demanda** (lazy loading).
- Apenas páginas acessadas vão para a **RAM** — o resto continua no **disco**.
- Compartilhadas entre processos para economizar memória.

---