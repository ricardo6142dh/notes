---
tags:
  - area/system-design
  - topic/concurrency
type: note
aliases:
  - Concurrency
  - Concorrência
---

related:: [[Paralelismo]], [[Mutex (Mutual Exclusion)]], [[Semaforo]], [[Spinlock]], [[Problemas Classicos]]

# Concorrência

De acordo com as fontes, a **concorrência** é a capacidade de um sistema ou aplicação de **lidar com várias tarefas ao mesmo tempo**, mas não necessariamente de forma simultânea.

Abaixo estão os pontos principais para entender esse conceito:

### 1. Funcionamento Técnico

A concorrência envolve o gerenciamento da **intercalação** (_interleaving_) de múltiplas unidades de execução, como threads ou processos. Em um processador de núcleo único (single-core), o sistema alterna tão rapidamente entre as tarefas que cria a **ilusão de simultaneidade** para o usuário. Esse processo de alternância é tecnicamente chamado de _**context switching**_ (troca de contexto).

### 2. Analogia do "Mundo Real"

As fontes utilizam o exemplo de um **churrasco preparado por uma única pessoa** para ilustrar a concorrência:

- Imagine que você está sozinho organizando o evento.
- Você precisa cortar a carne, preparar os vegetais, fazer caipirinhas e gelar a cerveja.
- Você não faz tudo isso ao mesmo tempo (não tem quatro braços), mas **alterna entre as tarefas**: trabalha um pouco na carne, para e vai gelar a cerveja, volta para a salada, e assim por diante.
- No final, todas as tarefas progridem de maneira independente, dando a impressão de que tudo está sendo feito "ao mesmo tempo".

### 3. Diferença entre Concorrência e Paralelismo

É comum confundir os dois termos, mas as fontes estabelecem uma distinção clara:

- **Concorrência:** É sobre **lidar** com muitas coisas ao mesmo tempo. É um problema de estruturação e gerenciamento de tarefas que podem ser executadas de forma independente.
- **Paralelismo:** É sobre **fazer** muitas coisas ao mesmo tempo. Ele exige hardware com múltiplos núcleos de CPU para que as instruções sejam executadas literalmente no mesmo instante.

### 4. Concorrência em Outros Contextos

- **Multithreading:** É uma técnica que facilita a concorrência em sistemas de núcleo único ao permitir fluxos de execução independentes dentro de um processo.
- **Bancos de Dados:** O conceito de **Isolamento** no modelo **ACID** existe justamente para garantir que transações concorrentes (que acontecem ao mesmo tempo) não interfiram umas nas outras, utilizando mecanismos como "locks" para organizar a fila de acesso.
- **Programação:** Em linguagens como Go, a concorrência é implementada através de recursos como **Goroutines**, que permitem gerenciar essas tarefas em segundo plano de forma eficiente.
