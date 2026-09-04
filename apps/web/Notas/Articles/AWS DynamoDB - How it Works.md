---
title: AWS DynamoDB - How it Works
source: https://www.usenix.org/conference/atc22/presentation/elhemali
created: 2026-08-26
tags:
  - source/article
  - course/system-design
  - topic/databases
  - topic/distributed-systems
  - topic/dynamodb
---

A melhor forma de lembrar DynamoDB é pensar na sequência de problemas que aparecem quando um key-value store precisa escalar:

```text
dados demais
  ↓
partitioning
  ↓
como achar a partition?
  ↓
request routing + metadata
  ↓
e se o node morrer?
  ↓
replicação
  ↓
como as réplicas concordam?
  ↓
Multi-Paxos + quorum
  ↓
como ler rápido?
  ↓
strong vs eventual consistency
  ↓
e se uma partition ficar quente?
  ↓
split + admission control
  ↓
e se o cache de routing morrer?
  ↓
MemDS + async refresh
  ↓
e se uma réplica falhar?
  ↓
log replicas + fast recovery
```

A filosofia que conecta quase tudo:

> **Predictability over maximum efficiency.**

---

## 1. Partitioning: uma máquina não basta

A `Partition Key` passa por uma função de hash interna que determina qual partition é responsável pelo item.

```text
hash(partition_key)
        ↓
      partition
```

Exemplo:

```text
user:123 → P1
user:456 → P3
user:789 → P2
```

Isso permite escalar horizontalmente.

A `Sort Key`, quando existe, organiza itens dentro da mesma Partition Key.

```text
PK = customer_id
SK = order_date
```

Então:

- **Partition Key** → onde os dados ficam.
- **Sort Key** → como os dados daquele grupo são organizados/consultados.

Importante:

> distribuição uniforme de keys não significa distribuição uniforme de tráfego.

Uma única key muito popular ainda pode criar uma **hot partition**.

---

## 2. Routing Metadata: o problema escondido do particionamento

Depois de particionar os dados, aparece uma dependência crítica.

O cliente envia:

```text
GetItem(user:123)
```

O Request Router consegue determinar a partition lógica a partir da key, mas ainda precisa responder:

> **Onde fisicamente estão as réplicas responsáveis por essa partition agora?**

Partitions mudam ao longo do tempo:

```text
split
migration
replica replacement
leader change
failure recovery
```

Então existe routing metadata semelhante a:

```text
key range X
    ↓
partition P42
    ↓
replicas A, B, C
    ↓
leader / membership atual
```

Sem metadata correto, o router não sabe para qual Storage Node enviar a request.

```text
Client
  ↓
Request Router
  ↓
Routing Metadata
  ↓
Storage Node
```

Isso torna o metadata uma infraestrutura **crítica para o data path**.

Consultar remotamente o metadata service em toda request adicionaria latência e criaria um gargalo central.

A solução natural é cache.

```text
Request Router
     ↓
Local Metadata Cache
```

Em um cache hit:

```text
key
 ↓
cache
 ↓
Storage Node
```

O lookup remoto sai do hot path.

Parece resolvido.

Só que agora criamos outro problema.

---

## 3. Cold Cache: quando uma otimização vira risco

Em operação normal:

```text
cache quente
    ↓
pouco tráfego no metadata backend
```

Agora imagine um deployment ou falha que reinicie milhares de routers.

```text
Router 1 ─┐
Router 2 ─┤
Router 3 ─┼──► Metadata Service
Router 4 ─┤
Router 5 ─┘
```

Todos começam com cache frio.

Temos um **thundering herd**.

Pior: o backend passa a possuir dois perfis completamente diferentes.

```text
NORMAL:
quase nenhum tráfego

COLD START / FAILURE:
tráfego gigantesco
```

Esse é um **comportamento bimodal**.

É perigoso porque o metadata service pode passar a maior parte do tempo pouco exercitado e receber sua maior carga justamente quando o sistema já está enfrentando uma falha.

O DynamoDB então redesenhou o backend de metadata.

---

## 6. MemDS: cache não pode ser requisito para sobrevivência

O **MemDS (Memory Data Store)** é um datastore distribuído em memória especializado em servir routing metadata.

A ideia arquitetural mais importante não é simplesmente colocar metadata em RAM.

É:

> **o backend de metadata deve conseguir sustentar a carga mesmo se os caches dos Request Routers desaparecerem.**

Ou seja:

```text
99% cache hit
```

não pode significar:

```text
backend suporta apenas 1% da carga
```

Porque no dia em que:

```text
cache hit → 0%
```

o metadata service entraria em colapso.

O cache passa a ser uma otimização de latência, e não algo necessário para o sistema sobreviver.

Mas existe outro problema: em escala DynamoDB, o mapa de partitions é gigantesco.

É aqui que entra o **Perkle**.

### Perkle Tree: Patricia + Merkle

O MemDS usa uma estrutura chamada **Perkle Tree**, combinando ideias de Patricia Trees e Merkle Trees.

```text
Patricia Tree
      +
 Merkle Tree
      ↓
 Perkle Tree
```

A **Patricia Tree** ajuda a representar o enorme espaço de routing de forma compacta, comprimindo prefixos comuns.

A parte **Merkle** adiciona hashes à estrutura.

Conceitualmente:

```text
             hash(root)
              /      \
         hash(A)    hash(B)
          /  \       /  \
        ...  ...    ...  ...
```

Se duas cópias possuem o mesmo hash para uma subtree, sabemos que aquela parte do estado é equivalente.

Se os hashes forem diferentes, podemos localizar apenas os branches divergentes.

Assim:

```text
Patricia → representação compacta
Merkle   → comparação/sincronização eficiente
```

Em vez de redistribuir um mapa gigantesco inteiro, o sistema consegue trabalhar com diferenças incrementais.

---

## 7. Async Refresh: gastar mais para tornar a falha previsível

Mesmo com MemDS dimensionado corretamente, caches ainda poderiam criar comportamento bimodal.

Uma implementação convencional faria:

```text
cache hit
   ↓
responde cliente
```

e só consultaria MemDS quando o cache expirasse ou falhasse.

O DynamoDB faz algo contraintuitivo: **asynchronous refresh mesmo em cache hits**.

```text
Request
   ↓
Router Cache
   │
   ├── HIT → responde cliente
   │
   └── async refresh → MemDS
```

Isso aparentemente desperdiça requests e banda.

Mas compare os dois cenários.

### Cache tradicional

```text
cache quente → MemDS quase ocioso
cache frio   → MemDS recebe avalanche
```

### Async Refresh

```text
cache quente:
Router ─────► MemDS

cache frio:
Router ─────► MemDS
```

O backend fica continuamente exercitado e a mudança de perfil quando caches desaparecem é muito menor.

Essa é uma das ideias centrais do paper:

> **Predictability over maximum efficiency.**

O DynamoDB conscientemente aceita trabalho redundante para evitar que uma falha transforme radicalmente o comportamento do sistema.

### E se o routing metadata estiver stale?

Partitions sofrem splits, migrações e mudanças de membership.

Logo, caches nunca estarão perfeitamente sincronizados.

Imagine:

```text
Router cache:
range X → Node A

estado atual:
range X → Node B
```

A request chega ao node errado.

```text
Router
  │
  ├── request → Node A
  │                │
  │                └── não sou mais responsável
  │
  ├── refresh metadata
  │
  └── retry → Node B
```

Em vez de exigir sincronização perfeita entre milhares de routers, o sistema aceita metadata temporariamente stale, detecta o erro e se autocorrige.

Lição:

> **stale metadata pode ser aceitável quando é detectável e existe um caminho barato de recovery.**

---

## 6. Replicação: uma partition não pode depender de um único node

Cada partition possui múltiplas réplicas distribuídas entre AZs.

Simplificando:

```text
          Partition
        /     |     \
       A      B      C
```

Se um node morrer, as outras cópias continuam disponíveis.

Mas agora aparece um problema novo:

> com três cópias do estado, quem decide qual é a versão correta?

A resposta é consenso.

---

## 7. Multi-Paxos, WAL e quorum

As réplicas formam um grupo coordenado por **Multi-Paxos**, com um leader responsável pelas writes.

```text
        Leader
       /      \
Follower    Follower
```

Uma escrita segue aproximadamente:

```text
PutItem
  ↓
Leader
  ↓
WAL / replicated log
  ↓
réplicas
  ↓
quorum
  ↓
ACK ao cliente
```

### Por que quorum 2 de 3?

Se exigíssemos `3/3`, uma única falha bloquearia writes.

Se aceitássemos `1/3`, o único node com a write poderia morrer logo depois do ACK.

Com maioria:

```text
2 de 3
```

qualquer dois quorums majoritários sempre possuem interseção.

```text
quorum 1 = A B
quorum 2 = B C
```

Sempre há pelo menos uma réplica em comum.

Essa é a base matemática da segurança do quorum.

### WAL

O sistema não precisa atualizar toda a estrutura final de dados antes de responder.

Primeiro:

```text
write
 ↓
WAL durável
 ↓
quorum
 ↓
ACK
```

Depois a mudança pode ser aplicada à estrutura de armazenamento.

Ou seja:

> **durabilidade não exige materialização completa imediata.**

---

## 8. Strong vs Eventual Consistency

Com múltiplas réplicas, temos duas opções de leitura.

### Strongly Consistent Read

Precisa garantir que o cliente veja o estado mais recente válido.

Conceitualmente passa pelo caminho autoritativo do replication group.

### Eventually Consistent Read

Pode ser servida por uma réplica que ainda esteja alguns instantes atrás.

Exemplo:

```text
Leader      x = 42
Replica B   x = 42
Replica C   x = 41
```

Uma leitura eventual em `C` pode retornar `41`.

Isso não é corrupção; é **replication lag**.

Trade-off:

```text
strong   → mais garantia
eventual → mais flexibilidade/throughput
```

---

## 9. Hot Partitions e Split for Consumption

Hash distribui keys, não requests.

```text
P1 → 10%
P2 → 10%
P3 → 60%  ← hot
P4 → 10%
P5 → 10%
```

DynamoDB pode dividir partitions com base em consumo.

```text
      P
    /   \
   P1   P2
```

Isso ajuda a espalhar carga.

Mas se toda a carga estiver concentrada em uma única Partition Key, existe um limite para o que o sistema consegue fazer.

Por isso:

> **uma boa Partition Key ainda é responsabilidade do developer.**

---

## 10. Admission Control: capacidade não deve ficar presa à partition física

Imagine uma tabela com:

```text
1000 writes/s
```

e 10 partitions.

Se cada uma tivesse rigidamente:

```text
100 writes/s
```

uma partition recebendo 500 writes/s seria throttled mesmo que as outras estivessem quase ociosas.

Isso é **throughput dilution**.

O DynamoDB evoluiu para um modelo mais global de controle de capacidade, usando **Global Admission Control (GAC)**.

A ideia:

```text
capacidade lógica da tabela
        ≠
layout físico das partitions
```

Isso permite aproveitar melhor a capacidade total.

---

## 11. Log Replicas: recuperar quorum rápido

Se temos:

```text
A ✓
B ✓
C ✗
```

ainda existe quorum.

Mas agora estamos vulneráveis: mais uma falha pode derrubar o replication group.

Reconstruir uma réplica completa pode exigir copiar muitos dados e levar tempo.

A sacada foi separar:

```text
participar do consenso
```

de:

```text
possuir todo o dataset
```

Uma **Log Replica** mantém apenas o replicated log necessário para participar rapidamente do consenso.

```text
Leader
  ├── Full Replica
  └── Log Replica
```

Primeiro o sistema restaura:

```text
quorum + safety
```

Depois reconstrói a réplica completa.

Grande lição:

> **reduzir MTTR pode ser mais importante do que tentar impedir toda falha.**

---

## 12. Gray Failures e Pre-vote

Falhas distribuídas não são apenas:

```text
alive / dead
```

Um node pode estar saudável para alguns peers e inacessível para outros.

Isso é uma **gray failure**.

Um follower isolado pode achar que o leader morreu e iniciar uma eleição desnecessária.

Para reduzir esse churn, o DynamoDB usa **pre-vote**:

```text
não vejo o leader
      ↓
pergunto aos peers
      ↓
eles também acham que precisamos de eleição?
      ↓
sim → eleição
não → provavelmente o problema é local
```

Lição:

> não transforme uma observação local de falha em decisão global imediatamente.

---

## 13. GSI e LSI

### LSI

Mesma Partition Key, Sort Key diferente.

```text
Base:
PK = customer
SK = date

LSI:
PK = customer
SK = value
```

Continua ligado ao mesmo partitioning lógico.

### GSI

Pode ter outra Partition Key completamente diferente.

```text
Base:
PK = customer_id

GSI:
PK = order_status
```

É útil pensar no GSI como:

> **uma segunda projeção distribuída dos mesmos dados.**

Como sua atualização ocorre de forma assíncrona, reads do GSI são eventualmente consistentes.

---

## 14. Streams

DynamoDB Streams funciona como CDC:

```text
INSERT
MODIFY
REMOVE
   ↓
Stream
   ↓
Lambda / analytics / indexing / downstream systems
```

O banco deixa de ser apenas armazenamento de estado e passa também a fornecer um fluxo das mudanças desse estado.

---

# Resumo final

| Problema | Solução |
|---|---|
| Dados maiores que uma máquina | Partitioning |
| Encontrar a partition | Request Router + metadata |
| Metadata no hot path | Router cache |
| Cold cache / thundering herd | MemDS + Async Refresh |
| Node pode morrer | Replicação |
| Réplicas precisam concordar | Multi-Paxos |
| Não esperar todas as réplicas | Majority quorum |
| Durabilidade rápida | WAL |
| Diferentes requisitos de leitura | Strong / Eventual consistency |
| Partition recebe tráfego demais | Split for Consumption |
| Capacidade presa ao layout físico | Global Admission Control |
| Replica recovery demora | Log Replicas |
| Falha parcial causa eleição | Pre-vote |
| Consultar por outra key | LSI / GSI |
| Reagir a alterações | Streams |

---

# O que lembrar para System Design

```text
Partitioning escala dados.
Hashing não elimina hot keys.
Replication exige consenso.
Quorum funciona pela interseção das maiorias.
WAL separa durabilidade de materialização.
Caches podem criar comportamento bimodal.
Predictability pode valer mais que eficiência.
MTTR é parte da disponibilidade.
Metadata stale pode ser aceitável se for detectável e corrigível.
```

> **A ideia central do DynamoDB não é um algoritmo específico.  
> É construir um sistema que continue previsível quando partes dele falham, escalam ou ficam quentes.**

---

## Referência

Amazon DynamoDB: A Scalable, Predictably Performant, and Fully Managed NoSQL Database Service — USENIX ATC 2022

https://www.usenix.org/system/files/atc22-elhemali.pdf

---
