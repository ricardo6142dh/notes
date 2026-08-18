---
tags:
  - course/system-design
  - topic/data-modeling
---

# Modelos de Dados

Um modelo de dados define **como os dados são organizados, armazenados e relacionados entre si**. A escolha do modelo impacta diretamente performance, escalabilidade e complexidade do sistema.

## Principais Modelos

### Relacional
Dados organizados em tabelas com linhas e colunas. Relacionamentos expressos por chaves estrangeiras e JOINs. Schema rígido e predefinido.

- **Forte em:** Integridade referencial, consultas complexas, transações [[ACID]].
- **Fraco em:** Escalabilidade horizontal, dados não estruturados.
- **Exemplos:** PostgreSQL, MySQL.

### Documento
Dados armazenados como documentos (JSON/BSON). Cada documento é autocontido — dados relacionados ficam juntos no mesmo objeto.

- **Forte em:** Flexibilidade de schema, dados hierárquicos, iteração rápida.
- **Fraco em:** Relacionamentos complexos entre entidades distintas.
- **Exemplos:** MongoDB, Firestore.

### Chave-Valor
Par simples de chave → valor. Acesso por lookup direto.

- **Forte em:** Latência ultra-baixa, cache, sessões.
- **Fraco em:** Consultas complexas, relacionamentos.
- **Exemplos:** Redis, DynamoDB.

### Colunar / Wide-Column
Dados agrupados por coluna, não por linha. Otimizado para leitura de poucos atributos em muitas linhas.

- **Forte em:** Analytics, Big Data, séries temporais.
- **Fraco em:** Transações, leitura de linhas completas.
- **Exemplos:** Cassandra, BigQuery.

### Grafos
Entidades como nós, relacionamentos como arestas com propriedades.

- **Forte em:** Relacionamentos complexos e profundos, traversal de redes.
- **Fraco em:** Dados sem relacionamentos ricos.
- **Exemplos:** Neo4j, Amazon Neptune.

## Como escolher

| Critério | Relacional | Documento | Chave-Valor | Colunar | Grafo |
|---|---|---|---|---|---|
| Schema definido | Sim | Flexível | Nenhum | Semi | Flexível |
| Transações ACID | ✓ | Parcial | ✗ | ✗ | Parcial |
| Escala horizontal | Difícil | Fácil | Fácil | Fácil | Moderado |
| Relacionamentos complexos | JOINs | Embedding | ✗ | ✗ | Nativo |

Ver [[Database Models Reference]] para detalhes de implementação.
