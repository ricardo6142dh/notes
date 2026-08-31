
O **Sharding** (ou particionamento) é uma técnica de design de sistemas distribuídos que consiste em **dividir grandes conjuntos de dados em partes menores**, chamadas de **shards ou partições**. Cada shard representa uma fração do todo, permitindo que o sistema gerencie dados de forma eficiente e segura, escalando horizontalmente a camada de persistência.

---

## 🗂️ 1. Topologias de Sharding

### A. Sharding para Segregação de Dados
* **Foco:** Distribuição de diferentes conjuntos de dados entre shards distintos (tabelas ou instâncias de bancos de dados diferentes) com base em critérios específicos.
* **Aplicações Comuns:** 
  * **Multi-tenant:** Isolar dados de clientes principais em shards dedicados para aumentar a segurança e otimizar a performance de acordo com a necessidade de cada cliente.
  * **Sensibilidade de Dados:** Separar dados sensíveis (que exigem mais auditoria e segurança) de dados comuns menos críticos.

### B. Sharding para Segregação Computacional
* **Foco:** Distribuição das cargas de trabalho de processamento (computacional), isolando operações pesadas de operações leves.
* **Aplicações Comuns:**
  * Separar tarefas de processamento intensivo (ex: cálculos pesados, machine learning) em instâncias otimizadas para CPU .
  * Alocar operações comuns de leitura/escrita rápida em shards otimizados com discos rápidos (I/O intensivo).

---

## 🗺️ 2. Estratégias de Distribuição (Sharding Keys)

A **Sharding Key** (chave de partição) é o critério usado para decidir onde um dado será guardado. A escolha deve focar em alta cardinalidade (gerar muitos valores únicos) e nos campos mais buscados.

| Estratégia              | Como funciona                                                                                               | Prós                                                                                                                         | Contras                                                                                                                                   |
| :---------------------- | :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Ranges de Iniciais**  | Divide os dados pela letra inicial de um identificador (ex: A-E, F-J).                                      | Extremamente simples de entender.                                                                                            | **Hot Partitions:** Causa desbalanceamento severo (ex: muito mais nomes com "A" do que com "Z") .                                         |
| **Ranges de IDs**       | Divide por intervalos sequenciais numéricos (ex: ID 1-3333 no Shard 1).                                     | Bom para buscas de intervalos naturais.                                                                                      | **Transbordo:** Shards antigos ficam estáticos, enquanto o shard mais novo recebe toda a carga de escrita.                                |
| **Ranges de Datas**     | Segmenta os dados por períodos de tempo (ex: transações por ano ou mês).                                    | Excelente para aplicar **Tiers de Storage** (dados recentes em disco rápido "Hot"; antigos em disco barato "Cold").          | Consultas que cruzam longos períodos de tempo exigem varredura em múltiplos shards.                                                       |
| **Hashing Modulo**      | Aplica uma função hash na chave e faz a operação de resto da divisão (`%`) pelo número de shards.           | Distribuição uniforme dos dados, evitando *hot partitions*.                                                                  | **Indisponibilidade ao alterar nós:** Se o número de servidores mudar, o cálculo do módulo muda, perdendo o roteamento dos dados antigos. |
| **Hashing Consistente** | Mapeia servidores e chaves de dados em um círculo lógico chamado **Hash Ring**.                             | Ao adicionar ou remover shards, a necessidade de redistribuição de dados é minimizada drasticamente.                         | Implementação mais complexa do que o hashing simples.                                                                                     |
| **Shuffle Sharding**    | Combina sharding tradicional com replicação, criando subconjuntos embaralhados de shards para cada cliente. | Reduz drasticamente o **blast radius** (raio de impacto). Se um shard falha, apenas uma fração mínima de clientes é afetada. | Complexidade de engenharia de nível muito avançado.                                                                                       |

---

## 🧮 3. Fórmulas de Cálculo e Exemplos

### A. Hashing Tradicional (Módulo)

Aplica-se uma função de hash sobre a chave de partição e o valor resultante é dividido pelo número de servidores disponíveis. O resto da divisão determina o shard de destino.

$$\text{Shard} = \text{Hash}(\text{Sharding Key}) \pmod{\text{Quantidade de Shards}}$$

* **Exemplo Prático:**
  * **Tenants:** `Pizzarias-Carvalho` e `Petshops-Souza`
  * **Quantidade de Shards:** 3 
  * Aplicando o cálculo do SHA-256 e convertendo para inteiro positivo :
    * `Pizzarias-Carvalho` $\rightarrow$ Hash convertido: $11.111.112$
    * `Petshops-Souza` $\rightarrow$ Hash convertido: $11.111.115$
  * **Cálculo do Shard:**
    * $11.111.112 \pmod 3 = 2$ (Alocado no **Shard 2**) 
    * $11.111.115 \pmod 3 = 1$ (Alocado no **Shard 1**)

> ⚠️ **O Problema:** Se mudarmos a quantidade de shards de 3 para 4 devido a um pico de carga, o cálculo de módulo do mesmo hash resultará em números diferentes, quebrando instantaneamente todo o roteamento de dados existentes.

### B. Hashing Consistente (Hash Ring)

Tanto os servidores (nós) quanto os dados (chaves) são mapeados em um anel de hash lógico. Os dados de um tenant são armazenados no primeiro servidor encontrado ao percorrer o anel no **sentido horário** a partir de sua posição de hash.

$$\text{Posição} = \text{Hash}(\text{ID do Nó}) \quad \text{e} \quad \text{Posição} = \text{Hash}(\text{ID do Tenant}) \quad \pmod{\text{Tamanho Máximo do Ring}}$$

* **Exemplo de Funcionamento:**
  * Se o anel possui os nós `Shard-00`, `Shard-01`, `Shard-02` e `Shard-03` mapeados em suas respectivas posições de hash.
  * O tenant `Mecanica-Dois-Irmaos` gera um hash cuja posição no anel cai logo antes do nó `Shard-02`. No sentido horário, ele é alocado no `Shard-02`.
  * Se o `Shard-02` for removido por falha, apenas os dados mapeados para ele migram para o próximo nó (ex: `Shard-00`), mantendo todos os outros tenants intocados em seus respectivos shards originais.

---

## ⚖️ 4. Trade-offs do Sharding

### ✅ Vantagens
* **Escalabilidade Horizontal de Dados:** Permite expandir a capacidade de armazenamento e processamento adicionando mais servidores baratos em vez de um único servidor gigante caro.
* **Ganho de Performance:** Operações de escrita e leitura são divididas entre recursos de hardware independentes, reduzindo gargalos.
* **Isolamento de Falhas (Blast Radius reduzido):** Se um servidor de banco de dados cair, apenas os dados pertencentes àquele shard específico ficam indisponíveis. O restante do sistema continua operacional.

### ❌ Desafios e Complexidades
* **Hot Partitions:** O risco de uma má distribuição (por padrão de uso desbalanceado ou má escolha de hash) sobrecarregar severamente um shard enquanto os outros ficam ociosos.
* **Consistência dos Dados:** Garantir transações ACID e sincronização consistente de dados entre múltiplos shards é extremamente difícil em grande escala.
* **Complexidade Arquitetural:** Exige o desenvolvimento de APIs de roteamento inteligente e middleware para gerenciar a distribuição de dados de forma transparente para a aplicação.

---