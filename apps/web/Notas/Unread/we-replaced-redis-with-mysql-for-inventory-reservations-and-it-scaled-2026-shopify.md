---
title: "Shopify: replacing Redis with MySQL for inventory reservations"
status: unread
source: https://shopify.engineering/scaling-inventory-reservations
created: 2026-09-08
tags:
  - source/article
  - topic/mysql
  - topic/inventory
  - topic/databases
  - topic/concurrency
  - topic/scalability
---

## TL;DR

Shopify moveu reservas temporárias de estoque do Redis para o mesmo MySQL usado pelo inventory ledger. Design usa uma linha por unidade, `SELECT ... FOR UPDATE SKIP LOCKED`, pool limitado a 1.000 unidades por item/local e transações `READ COMMITTED`. Gargalo final não era query nem CPU, mas conexões retidas por outros processos do checkout.

## Problema

Durante pagamento, Shopify reserva estoque por alguns minutos para impedir duas compras da mesma unidade. Depois do pagamento, operação de claim deduz quantidade permanentemente do inventory ledger.

Sistema antigo mantinha reservas no Redis e ledger no MySQL. Reserve era rápido com `DECR`/`INCR`, mas claim precisava atualizar dois sistemas sem transação atômica:

- atualizar MySQL e falhar ao limpar Redis podia causar underselling;
- limpar Redis e falhar ao atualizar ledger podia causar overselling;
- modelo também não representava estoque distribuído entre locais;
- cluster Redis adicionava operação separada.

Objetivo: manter reserva e ledger no mesmo banco para usar ACID sem perder throughput de pico.

## Modelo com SKIP LOCKED

Primeira tentativa, uma linha por item com coluna de quantidade, concentrava contenção. Novo modelo representa cada unidade vendável como uma linha.

Reservar três unidades significa selecionar três linhas disponíveis e movê-las numa transação. `SKIP LOCKED` ignora linhas já bloqueadas por outras transações, permitindo que chamadas concorrentes escolham outras unidades sem esperar pelo mesmo row lock.

```sql
SELECT ...
FOR UPDATE SKIP LOCKED;
```

Criar uma linha para todo estoque seria caro. Item com 50 mil unidades em dez locais poderia gerar 500 mil linhas. Shopify mantém pool limitado a 1.000 linhas por combinação item/local, abastecido a partir do ledger.

Se pool esvazia durante flash sale, reserve dispara replenishment inline. Lock garante um único replenisher; demais transações esperam em vez de criar thundering herd. Latência daquele reserve aumenta, mas estoque disponível não aparece falsamente como esgotado.

## Decisões de locking

### Composite primary key

Protótipo usava ID auto-incremental. InnoDB bloqueava secondary index usado no filtro e clustered primary index: dois locks por unidade.

Primary key composta por `shop_id`, `inventory_item_id`, `inventory_group_id` e `id` colocou colunas de busca no índice primário e reduziu custo para um lock por row.

### READ COMMITTED

Com `REPEATABLE READ`, query vazia podia adquirir gap lock no pseudo-record `supremum`, impedindo replenishment de inserir novas linhas e criando deadlocks.

Para essas transações, Shopify mudou isolamento para `READ COMMITTED`, reduzindo gap locking e permitindo inserts do replenishment.

### Ordem consistente

Reserve e claim tocavam tabelas em ordens diferentes, formando ciclos de espera. Fluxo foi padronizado:

1. reserve remove rows da tabela de unidades;
2. reserve insere em `reserved_quantities`;
3. claim toca somente `reserved_quantities`.

Mesma ordem de aquisição eliminou deadlocks circulares observados.

### Batching

Carrinhos com vários itens usam `UNION ALL` para buscar unidades em uma ida ao banco. Menos round trips reduziram latência sob carga.

## Gargalo real: conexões

Produção atingiu teto de throughput com P90 aceitável, CPU disponível e queries otimizadas. Sintomas:

- threads esperando no MySQL;
- CPU subindo quando fila era liberada;
- conexões esgotadas nos backends atrás do ProxySQL.

Equipe adicionou comentário em cada SQL para identificar processo de negócio:

```sql
/* conn_tag:checkout_completion */
```

ProxySQL passou a agregar tempo de retenção de conexão por caller. Instrumentação mostrou que outros processos do checkout mantinham transações abertas; reservations apenas consumiam últimas conexões disponíveis.

Limpeza do checkout removeu 50% das reads e 33% das transações no primary. Revisão de configuração aumentou InnoDB thread concurrency, limite antigo que não acompanhava hardware e workload atuais. Depois disso, writer CPU ficou abaixo de 50% e reader CPU abaixo de 16% mesmo em flash sales de alto volume.

## Migração

Cutover usou shadow mode:

1. toda reserva era escrita em Redis e MySQL;
2. Redis continuava source of truth;
3. resultados e desempenho eram comparados em tráfego real;
4. source of truth mudou gradualmente para MySQL, pod por pod;
5. kill switch permitia voltar ao Redis enquanto dual write mantinha estado completo.

Como ambos rodaram simultaneamente, não foi necessário migrar reservas em voo.

## Lições

- Feature nova do banco pode invalidar decisão arquitetural antiga.
- Primary key e isolation level alteram quantidade e tipo de locks.
- CPU baixa com fila alta aponta para recurso diferente, como conexão.
- Métrica agregada de pool não identifica caller; atribuição precisa atravessar app e proxy.
- Protótipo pequeno com observação direta de locks ensinou mais que abstração completa.
- Banco relacional pode atender coordenação de alto throughput quando schema, transações e observabilidade refletem workload.

## Fonte

[We replaced Redis with MySQL for inventory reservations - and it scaled](https://shopify.engineering/scaling-inventory-reservations) - Emilie Noel, Shopify Engineering

## Connections

- [[Cursos/Descomplicando System Design/CAP and Databases/Databases|Databases]]
- [[Cursos/Descomplicando System Design/Cache/Definicao de Cache|Cache]]
- [[Cursos/Descomplicando System Design/Concorrencia e Paralelismo/Mutex (Mutual Exclusion)|Mutex]]
- [[Cursos/Descomplicando System Design/Concepts/Consistency|Consistency]]
- [[Cursos/Descomplicando System Design/Escalabilidade, Performance e Capacidade/Performance|Performance]]
