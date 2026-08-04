---
tags:
  - topic/parallelism
type: note
aliases:
  - Parallelism
  - Paralelismo
---

related:: [[Concorrência]], [[Paralelismo Interno X Externo]]

# Paralelismo

Diferente da concorrência, que lida com o gerenciamento e a alternância de múltiplas tarefas, o **paralelismo** envolve a **execução literal e simultânea** de várias operações ou instruções. Enquanto a concorrência pode ocorrer em um único núcleo de processamento através da troca rápida de contexto, o paralelismo requer obrigatoriamente hardware com **múltiplos núcleos de CPU** para que cada núcleo processe diferentes threads ou tarefas no mesmo instante.

Abaixo, detalho os principais aspectos do paralelismo conforme as fontes:

### 1. Funcionamento e Requisitos

- **Simultaneidade Real:** No paralelismo, as tarefas progridem ao mesmo tempo, dividindo a carga de trabalho entre os recursos físicos disponíveis.
- **Hardware:** É uma técnica que depende diretamente da arquitetura do processador (multi-core ou multiprocessadores) para permitir que fluxos de execução independentes ocorram sem competir pelo mesmo ciclo de processamento de um único núcleo.

### 2. Analogia do Churrasco com Amigos

Para facilitar a compreensão, as fontes utilizam a analogia de um churrasco onde você **tem amigos para ajudar**:

- Uma pessoa corta a carne, outra acende a churrasqueira, outra gela a cerveja e uma quarta prepara drinks.
- Como cada pessoa (núcleo de CPU) é responsável por uma parte do processo de forma independente, todas as ações acontecem **paralelamente**, acelerando a entrega final do evento.


### 3. Desafios Técnicos

Apesar de otimizar o desempenho e a eficiência, o paralelismo introduz complexidades de coordenação e sincronização:

- **Condições de Corrida (Race Conditions):** Ocorrem quando várias tarefas tentam modificar o mesmo recurso compartilhado ao mesmo tempo, podendo gerar resultados inconsistentes.
- **Mecanismos de Proteção:** Para garantir a integridade dos dados, é necessário utilizar ferramentas como **mutexes** (exclusão mútua), **semáforos** e **locks**, que organizam o acesso aos recursos, embora possam aumentar a complexidade do código e do debugging.

### Resumo Comparativo

- **Concorrência:** É sobre **lidar** com muitas coisas ao mesmo tempo (gestão de tarefas).
- **Paralelismo:** É sobre **fazer** muitas coisas ao mesmo tempo (execução simultânea).
- **Relação:** O paralelismo é geralmente concorrente, mas nem toda concorrência é paralela.
