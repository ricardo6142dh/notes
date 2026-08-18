---
tags:
  - course/system-design
  - topic/data-modeling
  - topic/databases
---

# Referência de Modelos de Banco de Dados

## 1. Modelos Orientados a Linhas (Modelos de Tupla)

- **Explicação técnica:** Registros (tuplas) são armazenados contiguamente no disco ou memória, mantendo todos os atributos de um único registro em sequência. Geralmente utilizam estruturas de **B-Tree** — árvores multi-nível largas e rasas — para gerenciar grandes volumes de dados e permitir buscas, atualizações e exclusões em tempo logarítmico.
- **Trade-offs:** Favorecem **operações ponto-a-ponto** em uma única entidade (leitura/escrita de um registro completo) e priorizam conformidade com **[[ACID]]**. Porém, são difíceis de escalar horizontalmente — adicionar réplicas aumenta a latência de commit porque o sistema precisa aguardar um quorum de nós confirmar a transação.
- **Casos de uso:** Sistemas transacionais críticos onde a integridade dos dados é fundamental: **bancos**, trading de ações, gestão de estoque.
- **Exemplos:** MySQL, PostgreSQL, SQL Server.

## 2. Modelos de Documento

- **Explicação técnica:** Dados são tratados como entidades autônomas armazenadas em formatos flexíveis e sem schema, como **JSON ou BSON**. Esses modelos frequentemente agrupam dados relacionados dentro do mesmo objeto para evitar JOINs custosos e usam **índices invertidos** (mapeando termos a documentos) para buscas full-text rápidas.
- **Trade-offs:** Alta **flexibilidade de schema**, permitindo que estruturas de dados evoluam sem migrações complexas. O principal risco é a potencial **inconsistência** nos tipos e contratos de dados, que deve ser tratada pela lógica da aplicação e não pelo banco.
- **Casos de uso:** Catálogos de produtos, histórico de clientes, agregadores de logs e implementações **CQRS**.
- **Exemplos:** MongoDB, Elasticsearch.

## 3. Modelos Orientados a Colunas (Colunar)

- **Explicação técnica:** Cada coluna de uma tabela é armazenada contiguamente no disco, em vez de armazenar linhas inteiras juntas. Isso permite que o motor recupere apenas os atributos específicos necessários para uma consulta, reduzindo significativamente o I/O de disco.
- **Trade-offs:** Altamente eficientes para **compressão de dados** (já que valores em uma coluna são frequentemente similares) e operações matemáticas em massa. Porém, são ineficientes para tarefas transacionais que exigem leitura ou atualização de uma linha completa.
- **Casos de uso:** **Big Data**, Data Warehousing e processos analíticos como calcular médias de vendas ou segmentar audiências.
- **Exemplos:** Amazon Redshift, Google BigQuery.

## 4. Modelos Wide-Column

- **Explicação técnica:** Mantêm o conceito de linha, mas cada registro pode conter um conjunto diferente de colunas organizadas em **famílias de colunas**. Frequentemente utilizam **LSM-Trees (Log-Structured Merge-Trees)**, onde escritas são adicionadas a um log append-only em memória antes de serem gravadas em arquivos imutáveis no disco, garantindo altíssima performance de escrita.
- **Trade-offs:** Otimizados para **escalabilidade horizontal massiva** (milhares de nós) e alto throughput de escrita. Os principais trade-offs são **consistência eventual** e suporte limitado a JOINs e transações atômicas entre diferentes famílias de colunas.
- **Casos de uso:** Dados de sensores IoT, feeds de redes sociais, trilhas de auditoria e rastreamento de séries temporais em larga escala.
- **Exemplos:** Cassandra, ScyllaDB, DynamoDB.

## 5. Modelos Chave-Valor

- **Explicação técnica:** O modelo [[NoSQL]] mais simples — armazena dados como uma coleção de chaves únicas pareadas com valores (strings, JSON ou blobs). Utilizam **hash indexing**, onde uma função hash converte uma chave em um endereço específico (bucket) para recuperação quase instantânea.
- **Trade-offs:** Oferecem **performance extrema** e são muito fáceis de distribuir em clusters para alta disponibilidade. Porém, as capacidades de consulta são limitadas a correspondências exatas na chave conhecida — não são adequados para buscas complexas por intervalo.
- **Casos de uso:** Sistemas de **cache**, gerenciamento de sessões de usuário e dados altamente voláteis que podem ser reconstruídos se perdidos.
- **Exemplos:** Redis, Memcached, Valkey.

## 6. Modelos Baseados em Grafos

- **Explicação técnica:** Esses modelos tratam **nós** (entidades) e **arestas** (relacionamentos) como objetos de primeira classe. Os relacionamentos são armazenados fisicamente, permitindo que o motor percorra redes complexas de conexões sem o custo computacional pesado dos JOINs relacionais.
- **Trade-offs:** Altamente performáticos para descobrir conexões profundas, mas a performance é sensível à **cardinalidade e complexidade** dos vértices e padrões sendo consultados.
- **Casos de uso:** **Motores de recomendação**, análise de redes sociais, detecção de fraudes e logística complexa.
- **Exemplos:** Neo4j, Amazon Neptune.
