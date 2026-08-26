---
tags:
  - course/system-design
  - topic/databases
---

# NoSQL

Categoria de bancos de dados que **não seguem o modelo relacional tabular** e, em geral, não usam SQL como linguagem de consulta principal. Projetados para escalabilidade horizontal, alta performance e flexibilidade de schema.

## Por que NoSQL existe

Bancos relacionais tradicionais escalam verticalmente (hardware mais poderoso). Com o crescimento massivo de dados na web (Google, Amazon, Facebook), essa abordagem ficou inviável — surgiu a necessidade de escalar horizontalmente (mais máquinas baratas).

## Características comuns

- **Schema flexível:** Não exige estrutura predefinida — cada documento/registro pode ter campos diferentes.
- **Escalabilidade horizontal:** Sharding nativo distribui dados entre múltiplos nós.
- **[[Consistency|Consistência]] eventual:** A maioria opta por disponibilidade e tolerância a partições ([[CAP Theorem|CAP]]: AP), abrindo mão de consistência forte.
- **Alta performance:** Otimizados para padrões de acesso específicos (leitura/escrita por chave, séries temporais, grafos).

## Categorias

| Tipo | Modelo | Exemplos |
|---|---|---|
| Chave-Valor | Par key→value | Redis, DynamoDB |
| Documento | JSON/BSON | MongoDB, Firestore |
| Wide-Column | Famílias de colunas | Cassandra, HBase |
| Grafo | Nós e arestas | Neo4j, Neptune |
| Série temporal | Timestamps | InfluxDB, Prometheus |
| Busca | Índice invertido | Elasticsearch |

## Quando usar NoSQL vs SQL

**Use NoSQL quando:**
- Volume de dados muito grande (escala de TB/PB)
- Schema muda com frequência (MVP, produtos em evolução)
- Padrão de acesso simples e previsível (sempre por chave, por usuário)
- Necessidade de distribuição global com baixa latência

**Prefira SQL quando:**
- Dados altamente relacionais com JOINs complexos
- Transações [[ACID]] são obrigatórias (financeiro, saúde)
- Relatórios e analytics ad-hoc complexos
- Equipe já domina SQL e o volume não justifica NoSQL

Ver [[Databases]] e [[Database Models Reference]] para comparação detalhada.
