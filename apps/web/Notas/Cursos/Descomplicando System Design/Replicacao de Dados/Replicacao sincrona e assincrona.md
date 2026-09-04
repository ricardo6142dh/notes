---
title: "Replicacao sincrona e assincrona"
---

> [!quote] Definicao
> Replicação se refere ao ato de **criar uma ou mais cópias do mesmo dado em locais diferentes**. Essa é uma prática recomendada especialmente em sistemas onde a consistência, a disponibilidade e a tolerância a falhas são requisitos mandatórios para o ciclo de vida do produto.


## Replicação Primary-Replica

**Um nó primário receba todas as operações de escrita e, em seguida, replique essas operações para um ou mais nós secundários.**


## Replicação Primary-Primary - Multi-Master

A Replicação Primary-Primary, **também conhecida como Multi-Master Replication**, é uma **arquitetura em que múltiplos nós podem atuar simultaneamente como primários, recebendo tanto operações de leitura quanto de escrita**.

## Replicação Síncrona

Na replicação síncrona, presume-se que **todas as alterações nos dados devem ser replicadas em todos os nós antes que a operação seja considerada concluída para o solicitante**. Isso **garante consistência forte entre os nós**, pois **um valor escrito ou atualizado só estará disponível para leitura após todos os nós confirmarem que escreveram o mesmo com sucesso**, ou seja, todos eles responderão com os mesmos dados em qualquer momento, independentemente de qual deles receber a solicitação de leitura.

## Replicação Assíncrona

Na replicação assíncrona, **as alterações de dados são enviadas a um dos nós de um cluster e replicadas para os outros nós de forma eventual**, o que **significa que a operação pode ser considerada bem-sucedida sem que todas as réplicas tenham sido atualizadas**. Isso resulta em **maior desempenho nas operações de escrita**, pois **o sistema não precisa esperar pelas confirmações de todos os nós**.

## Replicação Semi-Síncrona

A Replicação Semi-Síncrona **combina aspectos da replicação síncrona e assíncrona**. Nesse modelo, **pelo menos uma réplica, ou um pequeno subconjunto de réplicas, deve confirmar a gravação dos dados** antes que a operação seja considerada bem-sucedida. As demais réplicas podem ser atualizadas de forma assíncrona.
## Replicação por Logs 

A Replicação por Logs **é uma abordagem em que todas as operações realizadas em um sistema são registradas em um log de operações sequenciais**, e **esse log é então replicado para outros nós do cluster, que executam as mesmas operações**. Em vez de replicar o estado completo dos dados, o sistema replica as mudanças, **permitindo que as réplicas apliquem essas alterações localmente e mantenham seus dados consistentes**.
