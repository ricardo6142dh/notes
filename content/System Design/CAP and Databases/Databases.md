---
tags:
  - area/system-design
  - topic/databases
  - type/note
type: note
aliases:
  - Databases
  - Database Types
  - Tipos de Bancos de Dados
---

up:: [[System Design]]
related:: [[Data Models]], [[Database Models Reference]], [[ACID]], [[BASE]], [[CAP Theorem]], [[PACELC]]

# Abstração de Armazenamento & Tipos de Bancos de Dados

A base do armazenamento de dados em um sistema resume-se ao fluxo de abstração do software:

> **Cliente** $\rightarrow$ **Dados** (Lógica/Software) $\rightarrow$ **Disco** (Armazenamento Físico)

## 1. Bancos de Dados Relacionais (SQL)

Modelos baseados em estruturas rígidas e previsíveis, ideais para transações complexas e dados altamente estruturados.

- **Estrutura:** Tabelas compostas por linhas (tuplas) e colunas.
    
- **Esquema:** _Schemas_ rígidos e predefinidos (exigem migrações formais).
    
- **Garantias:** Seguem estritamente as propriedades **ACID** (Atomicidade, Consistência, Isolamento e Durabilidade) para garantir integridade.
    
- **Principais Exemplos:** MySQL, PostgreSQL, Oracle, SQL Server.


## 2. Bancos de Dados Não Relacionais (NoSQL)

Modelos projetados para alta escalabilidade horizontal, flexibilidade e grande volume de dados.

- **Esquema:** _Schemas_ flexíveis ou dinâmicos.
    
- **Consistência:** Geralmente adotam **Consistência Eventual** (Teorema CAP).
    
- **Garantias:** Sem garantias estritas de ACID nativo em cenários distribuídos.


### Categorias e Exemplos:

- **Documentos:** MongoDB, Azure Cosmos DB
    
- **Busca Textual/Indexação:** Elasticsearch
    
- **Colunar (Wide-column):** Cassandra


## 3. Bancos de Dados em Memória (In-Memory)

Armazenam os dados diretamente na memória RAM em vez de discos rígidos (SSD/HDD) para atingir latências extremamente baixas (sub-milissegundos).

- **Casos de Uso:** Sistemas de Cache, gerenciamento de sessões, _leaderboards_ em tempo real e filas de mensageria rápidas.
    
- **Trade-off:** Alta velocidade vs. Volatilidade (risco de perda de dados se o servidor cair, embora muitos usem mecanismos de persistência assíncrona em disco, como AOF/RDB).
    
- **Principais Exemplos:** Redis, Memcached, Valkey.


## 4. Bancos de Dados de Séries Temporais (TSDB - Time Series)

Otimizados para armazenar e consultar fluxos de dados associados a carimbos de data/hora (_timestamps_).

- **Casos de Uso:** Telemetria de infraestrutura (métricas de CPU/Memória), monitoramento de IoT (sensores), dados financeiros (cotações de ações) e logs de auditoria.
    
- **Características:** Alta taxa de escrita de dados sequenciais (_appends_ constantes), raras atualizações de dados antigos (_updates_) e compressão agressiva de dados históricos.
    
- **Principais Exemplos:** InfluxDB, Prometheus, TimescaleDB (uma extensão do PostgreSQL).


## 5. NewSQL

Une as garantias transacionais do SQL clássico com a capacidade de escala horizontal do NoSQL.

- **Core:** Mantém propriedades **ACID** aliado à **Escalabilidade Horizontal**.
    
- **Mecanismo:** Utilizam **protocolos de consenso distribuído** para replicação e consistência.
    
    - _Protocolos:_ Raft, Paxos.
        
- **Principais Exemplos:** Google Cloud Spanner, SingleStore (antigo MemSQL), CockroachDB.
