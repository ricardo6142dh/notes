---
title: "Outbox Pattern"
---

# Outbox Pattern

## Problema

Qualquer sistema que precisa salvar estado **e** notificar outros serviços tem um gap de atomicidade:

```
[Service A]
  │
  ├─ 1. INSERT INTO orders ...    ← transação no DB
  │
  └─ 2. publish("order.created") ← rede/broker separado
```

Entre os passos 1 e 2: crash, timeout, partição de rede. Resultado: dado salvo, evento perdido. Ou pior — evento publicado antes do commit, consumidor lê estado ainda inexistente.

---

## Solução

Mover a publicação **dentro da transação** usando uma tabela intermediária:

```
┌─────────────┐    transaction     ┌─────────────┐
│  orders     │ ←────────────────→ │   outbox    │
│  (domain)   │                    │  (staging)  │
└─────────────┘                    └─────────────┘
                                         │
                                   Outbox Relay
                                         │
                                         ▼
                                   ┌──────────┐
                                   │  Broker  │
                                   └──────────┘
```

**Regra:** nunca publicar direto no broker. Sempre escrever no outbox dentro da mesma transação do dado.

---

## Fluxo

```
1. BEGIN TRANSACTION
2.   INSERT INTO orders (id, status) VALUES (...)
3.   INSERT INTO outbox (topic, payload) VALUES ('order.created', {...})
4. COMMIT

5. Relay detecta nova row no outbox
6. Relay publica no broker
7. Broker confirma → relay deleta/marca row como entregue
```

Se o relay cair entre os passos 6–7: na próxima execução, row ainda está no outbox → retry. **Nenhuma mensagem é perdida.**

---

## Como o relay detecta novas rows

### Polling

```sql
SELECT * FROM outbox WHERE state = 'PENDING' ORDER BY id LIMIT 100
```

Simples. Latência = intervalo do poll (tipicamente 1–5s).

### CDC (Change Data Capture)

```
DB binlog → relay (registrado como replica) → broker
```

Latência < 100ms. Mais complexo. Ferramentas: Debezium, Maxwell.

---

## Schema mínimo do outbox

```sql
CREATE TABLE outbox (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic       VARCHAR(255),
    payload     BLOB,
    headers     BLOB,
    created_at  BIGINT,        -- ms since epoch
    state       VARCHAR(50) DEFAULT 'PENDING'
);
```

---

## Garantias e limitações

| Aspecto | Comportamento |
|---|---|
| Entrega | **At-least-once** — duplicatas possíveis se relay falhar após publish mas antes de marcar entregue |
| Ordering | Garantido por `id` (auto-increment) dentro do mesmo produtor |
| Consumidores | **Devem ser idempotentes** — processar a mesma mensagem 2x não pode causar efeito colateral duplo |
| Latência | Depende do relay: ms (CDC) a segundos (polling) |
| Throughput | Limitado pelo DB do produtor, não pelo broker |

---

## Comparação com alternativas

| Abordagem | Complexidade | Risco | Quando usar |
|---|---|---|---|
| Publish direto | Baixa | Alto (pode perder) | Nunca em produção crítica |
| Outbox + polling | Média | Baixo | Maioria dos casos |
| Outbox + CDC | Alta | Baixo | Latência < 1s necessária |
| XA / 2PC | Muito alta | Médio (perf) | DB e broker suportam XA, escala pequena |
| Saga | Alta | Médio (lógica) | Transações longas, múltiplos serviços |

---

## Trade-offs

**Vantagens:**
- Usa só o DB que já existe — sem coordenador externo
- Resiliente a falhas do broker (relay retenta)
- Auditoria natural (tabela outbox = log de intenções)

**Desvantagens:**
- Tabela outbox precisa de manutenção (limpeza de rows antigas)
- Relay é um novo componente a operar (SPOF se não tiver HA)
- At-least-once exige consumidores idempotentes — nem sempre trivial

---

Video - https://www.youtube.com/watch?v=voeWcHeYzLI&t=96s
## Relacionado

- [[CDC e CRDT's]]
- [[Replicacao sincrona e assincrona]]
- [[Event Carried Event Transfer]]
