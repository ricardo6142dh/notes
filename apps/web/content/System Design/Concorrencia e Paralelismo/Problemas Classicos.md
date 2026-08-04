---
tags:
  - course/system-design
  - topic/concurrency
  - topic/synchronization
type: note
aliases:
  - Classical Concurrency Problems
  - Problemas Classicos
---

related:: [[Mutex (Mutual Exclusion)]], [[Semaforo]], [[Spinlock]]

# Problemas Clássicos de Concorrência

### 1. **Race Conditions (Condições de Corrida)**

Este fenômeno ocorre quando um recurso compartilhado (como uma variável na memória ou um registro no banco de dados) é acessado e modificado por várias tarefas simultaneamente.

- **Problema:** O estado final do recurso depende da ordem imprevisível em que as tarefas são executadas.
- **Exemplos Práticos:**
    - **Contadores:** Dois amigos tentando colocar itens em uma churrasqueira ao mesmo tempo, gerando erros na contagem final.
    - **Vendas Duplas:** Dois usuários tentando comprar o último ingresso no mesmo milissegundo; sem isolamento, o sistema pode vender o mesmo ingresso para ambos.
- **No Cenário Distribuído:** Manifesta-se como uma "race condition interprocessual", onde mensagens ou eventos (como "Pagamento Pendente" e "Pago") chegam fora de ordem devido à latência da rede, resultando em estados inconsistentes se não houver estratégias como _Last-Write-Wins_.

### 2. **Deadlocks (Impasse)**

Ocorre quando duas ou mais threads (ou processos) entram em um estado de espera permanente do qual não conseguem sair.

- **A Causa:** Existe um ciclo de dependência onde cada tarefa detém um recurso e espera por outro que está sob posse da tarefa vizinha.
- **Analogia:** Você está com o paninho de prato (controle da grelha) mas precisa da espátula; seu amigo está com a espátula mas precisa da grelha. Nenhum dos dois libera o que tem, e o churrasco para.

### 3. **Starvation (Inanição)**

Este problema acontece quando uma ou mais threads não conseguem acessar os recursos necessários por um longo período de tempo.

- **A Causa:** Geralmente é provocado por uma alocação desigual onde certas tarefas (mais rápidas ou com maior prioridade) são sempre atendidas primeiro.
- **Analogia:** Amigos mais "cara-de-pau" e ágeis ocupam a churrasqueira assim que ela libera, enquanto os amigos mais educados e lentos ficam sem conseguir assar sua comida.

### 4. **Inconsistências e Erros Operacionais**

Sem mecanismos de coordenação (como _locks_ ou mutexes), a execução concorrente descontrolada pode causar falhas graves na integridade dos dados, tais como:

- **Duplicidade de processamento:** A mesma tarefa sendo executada mais de uma vez.
- **Perda de atualização (_Lost Update_):** Uma modificação sendo sobrescrita por outra tarefa que leu um estado desatualizado.
- **Venda de estoque inexistente:** O sistema confirma uma transação para um item que já não está mais disponível.

Para mitigar esses problemas, as fontes sugerem o uso de estratégias de sincronização como **Mutexes** (exclusão mútua), **Semáforos** (controle de contagem/vagas) e diferentes tipos de **Locks** (Otimistas ou Pessimistas).
