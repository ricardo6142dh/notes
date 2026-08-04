---
tags:
  - area/system-design
  - type/note
  - topic/concurrency
  - topic/synchronization
type: note
aliases:
  - Mutex
  - Mutual Exclusion
---

up:: [[Concorrência]]
related:: [[Semaforo]], [[Spinlock]], [[Problemas Classicos]]

# Mutex (Mutual Exclusion)

O **Mutex** é uma abreviação para **Exclusão Mútua** e representa uma estratégia de sincronização fundamental para controlar o acesso a recursos compartilhados em ambientes de multithreading, paralelismo ou concorrência.

### 1. Objetivo Principal

- Sua função primordial é evitar **Race Conditions** (condições de corrida), garantindo que apenas uma única thread ou processo possa acessar um recurso específico em um determinado momento.
- Ele assegura a **integridade, consistência e a ordem lógica** das operações sobre dados que podem ser lidos ou alterados por múltiplas unidades de execução.

### 2. Mecanismo de Funcionamento

- **Lock (Bloqueio):** Quando uma thread precisa acessar um recurso, ela solicita o "lock". Se o recurso estiver livre, ele é bloqueado para uso exclusivo dessa thread.
- **Unlock (Liberação):** Após concluir a tarefa, a thread deve realizar o "unlock" para permitir que o próximo item da fila acesse o recurso.
- **Propriedade:** Por regra, apenas a thread que bloqueou o recurso tem a permissão de desbloqueá-lo.
- **Analogia:** É como uma pessoa em um churrasco que assume o controle da grelha (recurso compartilhado); ela assa um alimento por vez e só libera o espaço quando termina, evitando que todos tentem usar a grelha simultaneamente e causem confusão.

### 3. Mutex vs. Outros Mecanismos

- **Vs. Spinlock:** Enquanto no Mutex a thread geralmente entra em estado de espera (_sleep_) se o recurso estiver ocupado, no **Spinlock** a thread permanece ativa em um loop, perguntando constantemente se o recurso foi liberado.
- **Vs. Semáforo:** O Mutex funciona como um **semáforo binário** (apenas 1 posição), enquanto o semáforo contador permite que um número definido de threads (como em um _worker pool_) acesse o recurso simultaneamente.

### 4. Locks Distribuídos (Paralelismo Externo)

Em arquiteturas de microserviços ou sistemas distribuídos, o Mutex é aplicado para garantir **idempotência e atomicidade** em operações como consumo de filas ou processamento de mensagens.

- Utiliza-se uma **base de dados centralizada** (como **Redis** ou **Zookeeper**) para manter o estado do lock acessível a todas as réplicas.
- No Redis, por exemplo, o sistema verifica se a chave do recurso existe: se existir, descarta o processamento; se não, cria a chave (lock), processa e depois a deleta.

### 5. Riscos e Tradeoffs

- **Deadlock (Impasse):** É o principal risco, ocorrendo quando duas ou mais threads esperam permanentemente por recursos que estão sob posse uma da outra, criando um ciclo de dependência que trava o sistema.
- **Performance:** O uso de locks pode criar gargalos em cenários de alta concorrência, pois as threads precisam esperar sua vez, aumentando a latência.
- **Locks Pessimistas:** O Mutex é a base do lock pessimista, que assume que conflitos serão frequentes e bloqueia o recurso antes mesmo de começar a agir.
