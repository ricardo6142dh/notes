---
tags:
  - course/system-design
  - topic/concurrency
  - topic/synchronization
type: note
aliases:
  - Spinlock
---

related:: [[Mutex (Mutual Exclusion)]], [[Semaforo]]

# Spinlock

O **spinlock** é um mecanismo de sincronização utilizado em ambientes de programação concorrente para proteger o acesso a recursos compartilhados. Diferente de um Mutex, que coloca a thread em estado de espera (_sleep_) quando o recurso está ocupado, o spinlock mantém a **thread ativa em um loop de verificação** (girando) até que o bloqueio seja liberado.

Abaixo estão os detalhes sobre seu funcionamento e aplicações:

### 1. Mecanismo de Funcionamento

- **Verificação Ativa:** A thread continua sendo executada pela CPU e pergunta repetidamente se o recurso está disponível.
- **Ausência de Bloqueio Tradicional:** Não ocorre a suspensão da thread pelo sistema operacional, o que elimina o custo de processamento (_overhead_) de troca de contexto que acontece quando uma thread é bloqueada e posteriormente desbloqueada.

### 2. Analogia do "Mundo Real"

As fontes comparam o spinlock a uma situação em um churrasco onde, em vez de formar uma fila e aguardar sua vez (como no Mutex), cada pessoa fica **parada ao lado da grelha perguntando a todo instante se ela está livre**. Assim que a grelha é liberada, a pessoa que estiver verificando naquele exato momento assume o controle.

### 3. Tradeoffs (Prós e Contras)

- **Eficiência em Esperas Curtas:** Essa abordagem é muito eficaz se o tempo de espera pelo recurso for **relativamente curto**, pois a thread retoma o trabalho imediatamente após a liberação sem precisar ser "acordada" pelo sistema.
- **Desperdício de CPU em Esperas Longas:** Caso o recurso permaneça bloqueado por períodos extensos, o spinlock torna-se ineficiente, pois a thread **continua consumindo recursos de CPU** de forma improdutiva enquanto "gira" no loop.

### 4. Casos de Uso

O uso de spinlocks é geralmente recomendado para cenários onde a **latência de decisão deve ser baixa** e o tempo de processamento da tarefa que detém o lock é extremamente rápido, garantindo que outras threads não percam tempo em estados de inatividade profunda.
