---
tags:
  - course/system-design
  - topic/distributed-systems
---

# Disponibilidade

No contexto do [[CAP Theorem|Teorema CAP]], disponibilidade significa que **todo nó que não falhou responde a toda requisição** — sem garantia de que a resposta contém os dados mais recentes.

## Ideia Central

Um sistema altamente disponível nunca recusa uma requisição válida. Pode retornar dados desatualizados, mas sempre retorna _algo_.

## Métricas

Disponibilidade é medida em "noves":

| Disponibilidade | Downtime anual |
|---|---|
| 99% (2 noves) | ~87,6 horas |
| 99,9% (3 noves) | ~8,76 horas |
| 99,99% (4 noves) | ~52,6 minutos |
| 99,999% (5 noves) | ~5,26 minutos |

## Trade-off com Consistência

Segundo o Teorema CAP, durante uma [[Partition Tolerance|partição de rede]], o sistema deve escolher entre:

- **Disponibilidade:** Responde com dados possivelmente desatualizados
- **[[Consistency|Consistência]]:** Recusa responder até garantir dados atualizados

## Técnicas para alta disponibilidade

- **Replicação:** Múltiplas cópias dos dados em nós diferentes
- **Failover automático:** Redireciona tráfego ao detectar falha
- **Load balancing:** Distribui carga entre instâncias saudáveis
- **Circuit breaker:** Evita cascata de falhas

## Casos de uso que priorizam disponibilidade

Redes sociais, plataformas de streaming, sites de conteúdo — onde dados ligeiramente desatualizados são aceitáveis.
