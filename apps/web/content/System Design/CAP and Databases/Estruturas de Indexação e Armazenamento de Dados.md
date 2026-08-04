---
tags:
  - area/system-design
  - topic/databases
  - topic/indexing
  - topic/storage
type: note
aliases:
  - Indexação de Dados
  - Storage Engines
  - Índices de Banco de Dados
---

related:: [[Database Models Reference]], [[ACID]], [[BASE]]

# Estruturas de Indexação e Armazenamento de Dados

## Conceitos fundamentais

Existem dois conceitos que não devem ser confundidos:

- **Estrutura de indexação:** mecanismo utilizado para localizar dados rapidamente.
- **Estrutura de armazenamento (Storage Engine):** forma como o banco organiza e persiste os dados.


Exemplos:

- **PostgreSQL** → Heap + índices (B-Tree, Hash, GIN, GiST, BRIN...)
- **MySQL/InnoDB** → Dados armazenados em uma B+Tree clustered
- **Cassandra / RocksDB** → Storage baseado em LSM-Tree
- **Milvus / Qdrant** → Storage otimizado para vetores + índices ANN (HNSW, IVF...)


## Principais tipos de índice

## B-Tree (padrão)

É o índice de propósito geral utilizado pela maioria dos bancos relacionais.

**Melhor para:**

- igualdade (`=`)
- consultas por intervalo (Range Queries)
- ordenação (`ORDER BY`)
- Primary Keys
- Foreign Keys
- datas, números e textos

**Regra prática**

> Se não houver um motivo específico, utilize B-Tree.

---

## Hash

Baseado em função hash.

**Melhor para:**

- buscas por igualdade


**Não indicado para:**

- intervalos
- ordenação
- buscas por prefixo

**Regra prática**

> Utilize Hash apenas quando todas as consultas forem por igualdade.

---

## GIN (Generalized Inverted Index)

Índice invertido para estruturas compostas.

**Melhor para:**

- JSONB
- Arrays
- Full-text Search

**Ideia principal**

Em vez de indexar um documento inteiro, indexa cada elemento existente dentro dele.

---

## GiST

Framework para índices especializados.

**Melhor para:**

- dados geográficos
- consultas espaciais
- ranges
- busca por proximidade

---

## BRIN

Índice extremamente compacto baseado em resumos de blocos.

**Melhor para:**

- tabelas muito grandes
- logs
- séries temporais
- dados naturalmente ordenados

**Vantagem**

Ocupa pouquíssimo espaço.

---

## LSM-Tree

LSM (**Log-Structured Merge Tree**) **não é, em geral, um tipo de índice como B-Tree ou GIN**.

Ela é principalmente uma **arquitetura de armazenamento (Storage Engine)**.

Fluxo simplificado:

```text
Write
 ↓
WAL / Commit Log
 ↓
MemTable
 ↓
SSTables
 ↓
Compaction
```

Objetivo:

- otimizar escritas
- transformar muitas escritas pequenas em grandes escritas sequenciais

É utilizada por bancos como:

- Cassandra
- ScyllaDB
- RocksDB
- LevelDB
- Pebble

---

## Relação entre LSM-Tree e indexação

Embora não seja um índice criado pelo usuário, a LSM-Tree também organiza as chaves para permitir buscas eficientes.

Ela incorpora internamente:

- MemTables ordenadas
- índices das SSTables
- Bloom Filters
- Compaction

Ou seja:

> **LSM-Tree é principalmente uma arquitetura de armazenamento que já incorpora mecanismos internos de indexação.**

---

## Bancos Vetoriais

Bancos vetoriais armazenam **embeddings** (vetores numéricos) e são utilizados em aplicações de IA como:

- RAG
- busca semântica
- recomendação
- similaridade entre documentos


A consulta deixa de ser:

> "Encontre exatamente este registro."

e passa a ser:

> "Encontre os vetores mais parecidos com este."

## Índices mais comuns

### HNSW (Hierarchical Navigable Small World)

É o índice mais utilizado atualmente.

**Melhor para:**

- alta velocidade
- alta precisão
- buscas aproximadas por similaridade (ANN)


Usado por:

- Qdrant
- Weaviate
- Chroma
- pgvector
- Milvus

---

### IVF (Inverted File Index)

Divide os vetores em grupos (clusters), pesquisando apenas nos grupos mais promissores.

Bom para bases muito grandes.

---

### Product Quantization (PQ)

Comprime vetores para reduzir consumo de memória.

Muito utilizado em conjunto com IVF.

---

### DiskANN

Otimizado para conjuntos enormes armazenados parcialmente em disco.

Muito utilizado em ambientes de larga escala.

---

## Comparação geral

|Estrutura|Principal objetivo|
|---|---|
|B-Tree|Igualdade, range e ordenação|
|Hash|Igualdade|
|GIN|JSON, Arrays e Full-text|
|GiST|Geoespacial, ranges e proximidade|
|BRIN|Grandes tabelas ordenadas|
|LSM-Tree|Arquitetura de armazenamento otimizada para escrita|
|HNSW|Busca por similaridade entre vetores|
|IVF|Busca aproximada em grandes bases vetoriais|
|PQ|Compressão de vetores|
|DiskANN|Busca vetorial em datasets gigantes|

---

## Bancos mais comuns e suas estruturas

|Banco|Estrutura principal|
|---|---|
|PostgreSQL|Heap + B-Tree (padrão)|
|MySQL/InnoDB|B+Tree Clustered|
|SQL Server|Heap ou Clustered B+Tree|
|Oracle|Heap + B-Tree|
|SQLite|B-Tree|
|MongoDB|B+Tree (WiredTiger)|
|Cassandra|LSM-Tree|
|ScyllaDB|LSM-Tree|
|RocksDB|LSM-Tree|
|Redis|Hash Tables + estruturas especializadas|
|Elasticsearch|Índice Invertido (Lucene)|
|Milvus|HNSW, IVF, PQ, DiskANN|
|Qdrant|HNSW|
|Weaviate|HNSW|
|Pinecone|Índices ANN proprietários|
|pgvector|HNSW ou IVFFlat|

---

## Resumo mental

```text
B-Tree
→ Índice de uso geral
→ Igualdade + Range + Ordenação

Hash
→ Igualdade

GIN
→ JSON, Arrays e Full-text

GiST
→ Espaço, Geometria e Proximidade

BRIN
→ Grandes tabelas naturalmente ordenadas

LSM-Tree
→ Storage Engine otimizado para escrita
→ Contém mecanismos internos de indexação

HNSW
→ Busca por similaridade entre vetores
→ "Qual vetor é mais parecido com este?"

IVF
→ Divide o espaço vetorial em clusters

PQ
→ Comprime vetores para economizar memória

DiskANN
→ Busca vetorial em datasets gigantes armazenados em disco
```

## Regra de ouro

Sempre pergunte primeiro:

**"Estou escolhendo um índice ou uma arquitetura de armazenamento?"**

- Se for um banco relacional (PostgreSQL, MySQL, SQL Server), normalmente você escolhe **o tipo de índice** (B-Tree, GIN, GiST, BRIN, etc.).
    
- Se estiver escolhendo um banco como Cassandra ou RocksDB, a decisão já envolve **uma arquitetura de armazenamento baseada em LSM-Tree**.
    
- Se estiver trabalhando com IA e embeddings, a escolha principal passa a ser **o índice vetorial** (HNSW, IVF, PQ...), responsável por buscas de similaridade.
