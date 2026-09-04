---
title: "CQRS (Command Query Responsibility Segregation)"
---

# CQRS (Command Query Responsibility Segregation)

## 📌 Visão Geral

O **CQRS** (Command Query Responsibility Segregation) é um padrão arquitetural projetado para separar as responsabilidades de **escrita** (*Commands*) e **leitura** (*Queries*) de um sistema. 

Em sistemas tradicionais de grande escala, utilizar o mesmo modelo de dados para escrita e leitura gera gargalos de concorrência, baixa performance e acoplamento. O CQRS resolve essa limitação permitindo que cada operação utilize modelos e infraestruturas totalmente otimizados para suas respectivas finalidades.

---

## 🏗️ Conceitos Fundamentais

### 1. Commands (Escrita)
* **Objetivo:** Alterar o estado do sistema através de operações imperativas (Criar, Atualizar, Deletar).
* **Foco:** Garantir consistência, integridade e conformidade com regras de negócio.
* **Modelagem:** Geralmente utiliza **Rich Domain Model** (Modelos de Domínio Ricos), onde a lógica de negócio reside dentro das entidades.
* **Banco de Dados:** Utiliza bancos transacionais (frequentemente **SQL**) normalizados para garantir propriedades **ACID**.

### 2. Queries (Leitura)
* **Objetivo:** Recuperar dados sem alterar o estado do sistema (*side-effect free*).
* **Foco:** Performance de resposta, alta disponibilidade e baixa latência.
* **Modelagem:** Estruturas desnormalizadas ou visões pré-computadas (materializadas) adaptadas diretamente para o payload exigido pela UI ou consumidores.
* **Banco de Dados:** Réplicas de leitura, bancos **NoSQL** (Documento/Chave-Valor) ou tabelas analíticas desnormalizadas no próprio SQL.

---

## 🛠️ Modelos de Implementação

A complexidade do CQRS varia desde estratégias simples na mesma base de dados até ecossistemas distribuídos desacoplados por eventos:

### 1. CQRS por Réplicas de Leitura (Read Replica)
* **Cenário:** Otimização simples dentro de uma infraestrutura SQL sem necessidade de alterar o modelo de dados.
* **Funcionamento:** Separa o banco principal (Primary/Master), focado exclusivamente em escritas, de uma ou mais **instâncias read-only** (Read Replicas). A replicação do banco de dados sincroniza os dados da base primária para as réplicas.
* **Vantagem:** Alivia a concorrência e carga de processamento na instância principal, permitindo escalar leituras horizontalmente.
* **Atenção:** Apresenta pequenos atrasos inerentes à replicação do motor do banco de dados (*replication lag*).

### 2. CQRS SQL com Views Materializadas
* **Cenário:** Mesma base de dados ou instâncias SQL separadas.
* **Funcionamento:** O modelo de escrita mantém tabelas normalizadas com relacionamentos estritos. A leitura consulta tabelas desnormalizadas ou views pré-computadas para evitar a necessidade de JOINs complexos em tempo de execução.
* **Vantagem:** Baixa complexidade inicial, eliminando agregamentos pesados na hora da busca.

### 3. CQRS Assíncrono com Eventos e Filas
* **Cenário:** Sistemas distribuídos desacoplados com alto volume de operações.
* **Funcionamento:** Após persistir no modelo de escrita, a aplicação publica um evento em um mensageiro (ex: RabbitMQ, Apache Kafka, AWS SQS). Um consumidor assíncrono processa o evento e atualiza o banco de leitura (NoSQL ou réplica).
* **Consistência:** Introduz o modelo de **Consistência Eventual** (*Eventual Consistency*).

### 4. Sincronização Síncrona vs Dual-Write (Anti-Pattern)
* **Dupla Escrita (*Dual-Write*):** Tentar escrever em dois bancos na mesma transação de código da aplicação é vulnerável a falhas parciais (se a segunda escrita falhar, os bancos ficam inconsistentes).
* **Abordagem Correta:** Utilizar padrões como **Transactional Outbox** + **CDC (Change Data Capture)** ou gerenciamento de rollback com **Saga Pattern**.

---

## 📊 Matriz de Comparação: Command vs. Query

| Aspecto | Command (Escrita) | Query (Leitura) |
| :--- | :--- | :--- |
| **Responsabilidade** | Alterar estado e executar regras de negócio | Recuperar dados otimizados |
| **Modelagem de Dados** | Normalizado (3NF), focado em integridade | Desnormalizado ou Réplica Read-Only |
| **Padrão de Domínio** | Rich Domain Model, DDD | Anemic / Data DTOs |
| **Consistência** | Consistência Forte (*Strong Consistency*) | Consistência Eventual (*Eventual Consistency*) |
| **Tecnologias Típicas** | PostgreSQL, MySQL, Oracle | Redis, Read Replicas, Elasticsearch, MongoDB |

---

## ⚡ Prós e Contras

### ✅ Vantagens
* **Escalabilidade Independente:** Leitura e escrita podem ser escaladas separadamente conforme a carga (geralmente leituras superam escritas em larga escala).
* **Otimização de Schemas:** O banco de leitura reflete exatamente o que a UI precisa, eliminando agregações custosas.
* **Separação de Preocupações (SoC):** Código de negócio limpo e isolado de operações pesadas de consulta.
* **Flexibilidade Tecnológica:** Liberdade para usar a melhor ferramenta para cada necessidade (ex: SQL para escrita, Read Replicas ou NoSQL para leitura).

### ❌ Desafios e Complexidade
* **Consistência Eventual:** O modelo de leitura/réplica pode apresentar pequenos atrasos (*replication lag*) até que a sincronização ocorra.
* **Overhead Operacional:** Aumenta a complexidade de infraestrutura e monitoramento.
* **Riscos de Dessincronização:** Falhas na pipeline de mensageria ou na replicação exigem estratégias robustas de reprocessamento.

---

## 🔗 Relação com Outros Padrões Arquiteturais

* **Event Sourcing:** Frequentemente combinado com CQRS. Em vez de salvar o estado atual no Command, salvam-se os eventos de mudança. O modelo Query consome essa sequência de eventos para montar a leitura (Projections).
* **[[system-design/sharding|Sharding]]:** Enquanto o Sharding particiona horizontalmente os dados para distribuir carga por chaves, o CQRS particiona os dados funcionalmente por tipo de acesso (Leitura vs. Escrita). Ambos podem coexistir para escala extrema.
* **Transactional Outbox & CDC:** Utilizados para garantir a publicação confiável de eventos sem incorrer nos problemas do *Dual-Write*.
