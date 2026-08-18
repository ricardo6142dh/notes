---
tags:
  - course/system-design
  - topic/distributed-systems
---

# Partição (Sharding)

Técnica de dividir um conjunto de dados em **subconjuntos menores (shards/partições)** distribuídos entre múltiplos nós. Cada nó é responsável por uma fração dos dados, permitindo escalar horizontalmente além dos limites de uma única máquina.

## Por que particionar

Uma única máquina tem limites de CPU, memória e disco. Quando o volume de dados ultrapassa esses limites, particionar distribui a carga.

## Estratégias de Particionamento

### Hash Partitioning
A chave é passada por uma função hash; o resultado determina o shard.

```
shard = hash(user_id) % num_shards
```

- **Vantagem:** Distribuição uniforme dos dados.
- **Desvantagem:** Range queries são ineficientes (dados adjacentes ficam em shards diferentes). Adicionar shards exige re-hashing.

### Range Partitioning
Dados são divididos por intervalos de valores (ex: A-F no shard 1, G-M no shard 2).

- **Vantagem:** Range queries eficientes — dados adjacentes ficam no mesmo shard.
- **Desvantagem:** Hotspots — se um intervalo recebe muito mais carga, um shard fica sobrecarregado.

### Directory-Based Partitioning
Um serviço de lookup mantém um mapa de chave → shard.

- **Vantagem:** Flexibilidade total para mover dados entre shards.
- **Desvantagem:** O serviço de lookup vira um ponto único de falha e gargalo.

## Problemas do Sharding

- **Cross-shard queries:** JOINs entre shards são caros — exigem scatter/gather.
- **Rebalanceamento:** Adicionar ou remover nós requer mover dados.
- **Hotspots:** Chaves populares (ex: celebridade em rede social) sobrecarregam um shard.
- **Transações distribuídas:** Transações que atravessam shards requerem protocolos complexos (2PC).

## Relação com [[Partition Tolerance]]

[[Partition Tolerance|Tolerância a Partições]] no contexto CAP refere-se a **partições de rede** (falha de comunicação entre nós), não a sharding de dados — são conceitos distintos com terminologia similar.
