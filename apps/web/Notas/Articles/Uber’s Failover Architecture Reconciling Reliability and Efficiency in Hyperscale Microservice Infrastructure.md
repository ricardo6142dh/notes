---
tags:
  - topic/reliability
  - topic/failover
  - topic/kubernetes
source: https://arxiv.org/pdf/2603.07345
---

# Uber’s Failover Architecture

Para chegar a esse nível de eficiência (redução de 2x para 1,3x na capacidade provisionada e aumento da utilização de CPU), a Uber implementou uma série de mudanças técnicas e organizacionais profundas na forma como seus **6.000 microserviços** interagem.

Aqui estão os pilares principais do que foi feito:

1. Mudança de "Fail-Close" para "Fail-Open"

O maior desafio técnico era que serviços críticos (como o de solicitar uma viagem) dependiam de serviços não críticos (como o de exibir uma promoção). No modelo antigo, se o serviço de promoção caísse, ele "travava" o serviço de viagem (comportamento chamado de **fail-close**).

- **O que fizeram:** A Uber utilizou análise estática de código e monitoramento em tempo real para identificar essas dependências perigosas.
- **Resultado:** Eles "blindaram" os serviços críticos para que, caso um serviço secundário seja desligado durante uma falha, o serviço principal continue funcionando normalmente (**fail-open**).

2. Superalocação Inteligente (Oversubscription)

Antes, a Uber reservava máquinas inteiras que ficavam paradas esperando uma falha. Com a UFA, eles passaram a usar esses "espaços vazios" (buffers) de forma ativa.

- **O que fizeram:** Criaram dois pools de recursos no Kubernetes: o `stateless.cpu` (para serviços críticos) e o `overcommit.cpu` (para serviços não críticos).
- **A mágica:** Em tempos normais, os serviços não críticos rodam "de carona" na CPU que está reservada para o failover dos serviços críticos. Se ocorre uma falha regional, o sistema **expulsa instantaneamente** os serviços não críticos para dar lugar ao tráfego real de viagens.

3. Uso de Clusters de "Batch" como Reserva

Em vez de comprar mais servidores para serem usados apenas em emergências, a Uber passou a "sequestrar" temporariamente seus clusters de processamento de dados (Batch), usados para análises e treinamento de IA.

- **O que fizeram:** Quando uma região cai, o orquestrador (OMG) envia um sinal para os clusters de Batch.
- **Ação rápida:** Em menos de **20 minutos**, o sistema encerra as tarefas de análise de dados (que podem esperar) e converte esses milhares de servidores em capacidade para hospedar os microserviços que foram expulsos dos clusters principais.

4. Automatização e Pré-carregamento de Imagens

Mover milhares de serviços de um lugar para outro em segundos causaria um congestionamento na rede (o efeito "manada" ou _thundering herd_).

- **O que fizeram:** Implementaram um sistema de **pré-carregamento de imagens Docker** via rede P2P (Peer-to-Peer).
- **Eficiência:** Antes mesmo de o tráfego ser movido, as imagens dos serviços já estão sendo enviadas para os novos servidores, reduzindo o tempo de inicialização em até **30%**.

5. Validação com "Drills" em Produção

Para garantir que tudo isso funcionaria em uma crise real, a Uber instituiu uma cultura de **simulações agressivas**.

- **O que fizeram:** Eles realizam testes constantes onde cortam propositalmente o tráfego de serviços não críticos em produção para ver se os serviços principais sobrevivem.
- **Resultado:** Foram mais de **43 simulações em produção** e 70 em ambientes de teste, o que permitiu identificar e corrigir mais de **4.000 dependências inseguras** antes que elas causassem problemas reais.

Em suma, eles pararam de tratar todos os serviços como "iguais" e criaram uma infraestrutura elástica que sabe exatamente o que priorizar, o que desligar e onde buscar recursos extras em segundos

Source: https://arxiv.org/pdf/2603.07345
