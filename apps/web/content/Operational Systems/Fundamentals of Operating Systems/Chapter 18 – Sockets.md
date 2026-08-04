---
tags:
  - course/operating-systems
  - area/systems
  - status/imported
  - type/course-note
  - topic/networking
  - topic/sockets
  - topic/linux
type: course-note
course: "[[Fundamentals of Operating Systems]]"
chapter: 18
aliases:
  - Sockets
---

prev:: [[Chapter 17 – I O Systems & Storage]]
next::

# Chapter 18 – Sockets

## Sockets Module (Operating Systems – Networking)

## Core idea

A **socket** is a **kernel-managed communication endpoint**.

The process does **not** see packets directly. It sees **bytes** exposed through a file descriptor.

> The kernel receives packets, processes multiple layers, maps them to a socket using the **4-tuple**, stores payload in a receive queue, and exposes data to user space through syscalls like `recv()`.
> 

---

## High-level understanding

The complete Linux networking flow is:

**Packet arrives**  

→ kernel processes Ethernet/IP/TCP layers  

→ connection is identified by **(src IP, src port, dst IP, dst port)**  

→ payload is placed into the socket’s receive queue  

→ `epoll` marks the FD as readable  

→ process calls `recv(fd, buffer)`  

→ process gets **bytes**

### Mental model

The process never receives:

- Ethernet frames
- IP packets
- TCP segments

The process only receives:

- a stream of bytes

---

## 1. Server initialization

A server such as nginx typically does:

1. `socket()`
2. `bind()`
3. `listen()`

This creates a **listening socket** in the kernel.

The process receives a **file descriptor (FD)** pointing to that kernel object.

### Important details

- At this point, **no client connection exists yet**
- There is only a **passive listening endpoint**
- Worker processes may inherit the listening FD via `fork()`

### Exam angle

> A listening socket is not the same thing as an established connection.
> 

---

## 2. Packet arrives at hardware

A packet arrives from the network:

`[Ethernet][IP][TCP][HTTP]`

The NIC (network interface card):

- validates the CRC
- copies packet data into RAM using **DMA**
- places a reference/buffer into the **RX ring**

### Important

No user process is involved here.

This is still entirely in hardware/driver/kernel territory.

---

## 3. Driver creates `sk_buff`

The NIC driver pulls the packet from the RX ring and creates a:

`struct sk_buff` (`skb`)

The `skb`:

- points to packet data
- stores networking metadata
- is the central packet wrapper used by the Linux network stack

### Important truth

Usually the kernel avoids copying packet payload at this stage.

It mostly moves **pointers**, not packet contents.

### Exam angle

> `sk_buff` is a core Linux networking structure.
> 

---

## 4. Layer-by-layer processing

### L2 — Ethernet

The kernel reads the Ethernet header:

- checks the protocol type
- determines the next protocol is IP
- advances the internal pointer

Now the packet is logically viewed as:

`[IP][TCP][HTTP]`

### L3 — IP

The kernel:

- validates the IP header
- decrements TTL
- checks whether the destination IP belongs to this machine

Now the packet is logically viewed as:

`[TCP][HTTP]`

### L4 — TCP

The kernel TCP layer:

- identifies the connection using the **4-tuple**
- validates sequence numbers
- reorders out-of-order segments
- handles reliability

The 4-tuple is:

- source IP
- source port
- destination IP
- destination port

### Critical rule

> The kernel routes packets to sockets using the **4-tuple**, not the file descriptor.
> 

---

## 5. Connection creation before `accept()`

During the TCP three-way handshake:

### Step 1 — SYN

- connection enters the **SYN backlog**
- it is half-open

### Step 2 — final ACK

- connection becomes fully established
- kernel moves it to the **accept queue**

### Important truth

At this moment:

- the connection **already exists in the kernel**
- there is **still no file descriptor for the process**
- no process “owns” that connection yet

### Exam trap

> A TCP connection exists **before** `accept()` returns.
> 

---

## 6. `accept()` — the critical moment

The server calls:

```c
accept(listen_fd)
```

The kernel then:

- removes one connection from the accept queue
- creates a `struct file`
- associates that file object with the connected socket
- assigns the **lowest available FD** in the process

Now the relation becomes:

`fd -> struct file -> socket -> TCP connection`

### Why this matters

This is the moment the process gains access to that established connection.

### Critical exam rule

> `accept()` returns a **new FD** for the connected socket.
> 

> The listening FD remains open and continues accepting future connections.
> 

---

## 7. Data arrives after the connection exists

Now another packet arrives:

`[Ethernet][IP][TCP][HTTP]`

The kernel again processes Ethernet, IP, and TCP.

Then it uses the **4-tuple** to find the correct connected socket.

After removing transport headers, what remains is the payload:

`[HTTP]`

### Important

The kernel still uses the **connection identity**, not the FD, to deliver incoming data.

---

## 8. Receive queue

The payload is placed into:

`socket -> sk_receive_queue`

This receive queue:

- belongs to the socket
- stores incoming data as `sk_buff`s
- contains ordered and validated data ready for reading

### Important distinction

- The **kernel writes** into this queue
- The **process has not read anything yet**

### Exam angle

> Receive buffers/queues are kernel-side structures, not user-space buffers.
> 

---

## 9. `epoll` notification

A scalable server usually registers the FD in an epoll instance:

```c
epoll_ctl(epfd, EPOLL_CTL_ADD, fd, ...)
```

When new data arrives for that socket:

- the kernel marks the FD as readable
- `epoll_wait()` returns that FD to user space

### Important truth

The kernel does **not** tell user space:

- “connection from 10.0.0.5:49321 is ready”

It tells user space:

- **“FD X is ready”**

### Critical rule

> `epoll` returns **file descriptors**, not “connections” directly.
> 

---

## 10. `recv()` — transition to user space

The process then calls:

```c
recv(fd, buffer, size, 0)
```

The kernel:

- resolves the socket from the FD
- removes data from the socket receive queue
- copies payload bytes into the user buffer
- updates TCP receive state

This is the key **kernel → user space transition**.

### Important

This is where copying into application memory actually happens.

---

## 11. What user space sees

At the application level, the process sees something like:

```
GET / HTTP/1.1
```

The process does **not** see:

- Ethernet headers
- IP headers
- TCP headers

It only sees:

- bytes from the application payload stream

### Core idea

> Packets are transformed by the kernel into a reliable, ordered byte stream.
> 

---

## 12. Socket vs file descriptor

This distinction is fundamental.

### Socket

A socket is the **real kernel object** that contains:

- TCP state
- protocol information
- send/receive buffers
- queues
- connection metadata

### File descriptor (FD)

An FD is:

- an integer in a process table
- a handle that refers to a kernel object
- the value used in syscalls like `read()`, `write()`, `recv()`, `close()`, `epoll_ctl()`

### Critical rule

> The FD is **not** the socket.
> 

> It is only a process-local reference to it.
> 

---

## 13. How packet delivery really works

Incoming packets are delivered based on:

- source IP
- source port
- destination IP
- destination port

That is, the **4-tuple**.

### Important consequence

- the network stack does **not** look up an FD to route packets
- FDs only matter when a process makes a syscall

### Exam trap

> FD is for **process access**.
> 

> 4-tuple is for **kernel packet demultiplexing**.
> 

---

## 14. `sk_buff` in the Linux stack

`sk_buff` is the central Linux packet structure.

It is used to:

- wrap packet data
- track protocol headers
- carry metadata through the stack
- queue packet/payload data inside networking structures

### Important mental model

The kernel often advances pointers through the same underlying packet buffer instead of copying data repeatedly.

---

## 15. Receive queue and buffering

Each connected socket has a receive-side buffering structure.

### What it does

- temporarily stores incoming data
- decouples network arrival from application consumption
- allows the kernel to accept data even if the process has not called `recv()` yet

### Why it matters

Without a receive queue, the process would have to read data exactly when it arrives.

The queue provides elasticity between kernel networking and user-space scheduling.

---

## 16. Blocking and readiness

### Blocking model

If the socket is blocking:

- `recv()` sleeps until data is available

### Non-blocking model

If the socket is non-blocking:

- `recv()` returns immediately
- event mechanisms such as `epoll` are used to know when it is worth retrying

### Exam angle

> `epoll` does not read data. It only signals readiness.
> 

---

## 17. Important truths to memorize

- A connection exists **before** `accept()`
- `accept()` links that connection to the process via a **new FD**
- The kernel delivers incoming packets to **sockets**
- The process accesses sockets through **FDs**
- `epoll` reports **FD readiness**, not packet identity
- The process sees **bytes**, not packets

---

## 18. One-glance summary table

| Concept | Key idea |
| --- | --- |
| Socket | Kernel object holding connection state, queues, and buffers |
| FD | Process-local integer used to access the socket |
| 4-tuple | How the kernel identifies a TCP connection |
| `accept()` | Creates process-visible access to an already-established connection |
| `sk_buff` | Linux packet wrapper carrying data and metadata |
| Receive queue | Kernel-side queue storing incoming data for a socket |
| `epoll` | Returns readable/writable FDs, not connection objects |
| `recv()` | Copies bytes from kernel socket queue into user memory |

---

## Final summary

The Linux kernel transforms incoming network packets into a reliable, ordered byte stream stored inside sockets.

Processes do not interact with packets directly. They interact with kernel sockets indirectly through **file descriptors** and syscalls.

**Final flow:**

1. O processo cria um socket com socket(), recebe um fd, e associa esse socket a uma porta com bind() e listen(). - 

pacote chega

if SYN:

→ lookup LISTEN socket

→ cria novo socket

else:

→ lookup 4-tuple

→ encontra socket existente

if encontrado:

→ processa

else:

→ drop ou RST

1. Quando um SYN chega, o kernel cria um socket interno (struct sock) que passa a representar a conexão desde o início do handshake.
2. Durante o handshake TCP, esse socket evolui de estado (SYN_RECV → ESTABLISHED).
3. Quando o handshake é concluído, o socket (já em ESTABLISHED) é colocado na accept queue do listening socket.
4. O epoll sinaliza ao processo que o listen_fd está pronto (readable), indicando que há conexões na accept queue.
5. O worker recebe o listen_fd via epoll_wait() e chama accept().
6. O kernel remove um socket da accept queue, cria um fd no processo do worker e associa esse fd a esse socket.
7. Quando novos dados chegam (ex: GET), o kernel identifica o socket correto usando o 4-tuple e coloca os dados na receive queue desse socket. - 

pacote chega

→ extrai 4-tuple

→ faz lookup em tabela de conexões

→ encontra socket

→ entrega dados

1. O epoll sinaliza que o fd dessa conexão está pronto para leitura.
2. O worker chama recv(fd) e lê os dados da receive queue.