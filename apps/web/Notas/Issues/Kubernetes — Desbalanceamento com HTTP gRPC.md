
## O problema

Um `Service` comum do Kubernetes faz load balancing em **L4 (TCP)**.

A escolha do Pod acontece quando uma **conexão TCP é criada**. Depois disso, aquela conexão continua associada ao mesmo Pod.

```text
Client
  │
  │ TCP connection
  ▼
Kubernetes Service
  │
  └──────────► Pod A
               ├── request 1
               ├── request 2
               ├── request 3
               └── ...
```

Portanto:

> **Kubernetes Service balanceia conexões, não requests.**

## HTTP/1.1

Com `keep-alive`, uma conexão TCP pode ser reutilizada para várias requests.

```text
Connection 1 ──► Pod A ── 100 requests
Connection 2 ──► Pod B ── 20 requests
Connection 3 ──► Pod C ── 10 requests
```

Mesmo com três conexões distribuídas entre três Pods, a carga pode ficar desigual porque **as conexões não necessariamente carregam a mesma quantidade de requests**.

## HTTP/2 e gRPC

O problema pode ficar ainda mais evidente.

HTTP/2 permite **multiplexar vários streams dentro de uma única conexão TCP**.

```text
1 TCP connection
      │
      ├── stream 1
      ├── stream 2
      ├── stream 3
      ├── stream 4
      └── stream N
      │
      ▼
    Pod A
```

Como o Kubernetes enxerga apenas a conexão TCP, todos esses streams podem acabar no **mesmo Pod**.

gRPC normalmente usa HTTP/2 e mantém conexões persistentes, então é especialmente suscetível a esse comportamento.

## Scaling

Isso também aparece quando novos Pods são adicionados:

```text
Antes:

connections ──► Pod A
            └─► Pod B

Scale-out:

connections ──► Pod A
            └─► Pod B

                Pod C ← quase sem tráfego
```

As conexões existentes **não são rebalanceadas**. O novo Pod começa a receber tráfego principalmente quando novas conexões são abertas.

## Ambient Mesh

O `ztunnel` do Ambient Mesh continua trabalhando em **L4**, portanto sozinho não resolve esse problema.

Com um **Waypoint Proxy**, temos processamento em **L7**:

```text
Client
  │
  ▼
ztunnel
  │
  ▼
Waypoint (L7)
  │
  ├── request/stream ──► Pod A
  ├── request/stream ──► Pod B
  └── request/stream ──► Pod C
```

O Waypoint entende HTTP/gRPC e pode fazer load balancing em nível de aplicação, reduzindo a concentração causada por conexões persistentes.

## TL;DR

```text
Kubernetes Service
        ↓
Load balancing por conexão TCP
        ↓
Keep-alive / HTTP2 / gRPC
        ↓
Muitas requests na mesma conexão
        ↓
Mesmo Pod
        ↓
Possível desbalanceamento
```

**Service Kubernetes → balanceia conexões.**

**Ambient + ztunnel → continua L4.**

**Ambient + Waypoint → L7, podendo balancear requests/streams.**