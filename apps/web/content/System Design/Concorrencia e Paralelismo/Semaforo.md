---
tags:
  - topic/concurrency
  - topic/synchronization
type: note
aliases:
  - Semaphore
  - Semáforo
  - Semaforo
---

related:: [[Mutex (Mutual Exclusion)]], [[Spinlock]], [[Problemas Classicos]]

# Semáforo

Um **semáforo** é um mecanismo de sincronização utilizado na programação paralela e concorrente para controlar o acesso a recursos compartilhados, com o objetivo de evitar **Race Conditions** (condições de corrida) e inconsistências de dados.

Existem dois tipos principais de semáforos descritos nas fontes:

### 1. Tipos de Semáforos

- **Semáforo Binário:** Possui apenas duas posições e funciona de forma similar ao **Mutex**.
- **Semáforo Contador:** Permite gerenciar o acesso a um recurso que possui múltiplas unidades ou vagas disponíveis.

### 2. Funcionamento Básico (Operações Atômicas)

O controle do semáforo é feito através de duas operações principais:

- **Wait (Ocupar):** É utilizada para adquirir um recurso. Ao executar essa operação, o contador do semáforo é decrementado. Se o contador chegar a zero, as próximas threads precisam esperar até que uma vaga seja liberada.
- **Signal (Liberar):** É a operação oposta, utilizada para liberar o recurso após a conclusão de uma tarefa. Ela incrementa o contador, permitindo que outra thread que estava em espera possa ocupar o lugar.

### 3. Aplicação: Worker Pools

Os semáforos são ferramentas essenciais para implementar o padrão de **Worker Pools**, que consiste em limitar o número de threads (trabalhadores) que executam tarefas simultaneamente.

- **Exemplo Prático:** Em um sistema de mensageria, uma aplicação pode usar um semáforo de 10 posições para garantir que processará apenas 10 mensagens por vez. Se o limite for atingido, as novas mensagens ficam travadas na memória até que algum processo termine e execute o sinal de liberação.

### 4. Analogia do Churrasco

As fontes utilizam a analogia de uma **grelha grande** para explicar o semáforo contador:

- Imagine uma grelha que suporta até **3 pedaços de carne** simultaneamente.
- Cada pedaço colocado na grelha "ocupa" uma vaga do semáforo (decrementa o contador).
- Quando a grelha está cheia (contador em 0), ninguém mais pode colocar carne.
- Assim que um pedaço é retirado, uma vaga é liberada (incrementa o contador), permitindo que o próximo alimento seja assado.

Diferente do **Mutex**, que é focado em exclusividade total (um por vez), o **Semáforo Contador** foca em **capacidade limitada**.
