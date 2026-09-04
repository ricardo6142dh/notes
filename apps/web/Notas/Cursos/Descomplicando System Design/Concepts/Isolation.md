---
tags:
  - course/system-design
  - topic/transactions
---

# Isolamento

Propriedade do [[ACID]] que garante que **transações concorrentes não interferem umas nas outras**. Cada transação se comporta como se fosse a única sendo executada, mesmo que múltiplas estejam rodando ao mesmo tempo.

## Problemas que o Isolamento previne

### Dirty Read
Transação A lê dados que a Transação B escreveu mas ainda não commitou. Se B fizer rollback, A leu um dado que nunca existiu.

### Non-Repeatable Read
Transação A lê um registro, Transação B atualiza e commita, Transação A lê o mesmo registro novamente e obtém valor diferente.

### Phantom Read
Transação A consulta um conjunto de linhas com uma condição, Transação B insere novas linhas que satisfazem essa condição, Transação A repete a consulta e vê linhas "fantasma".

## Níveis de Isolamento (do menor ao maior)

| Nível | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| Read Uncommitted | ✓ possível | ✓ possível | ✓ possível |
| Read Committed | ✗ prevenido | ✓ possível | ✓ possível |
| Repeatable Read | ✗ prevenido | ✗ prevenido | ✓ possível |
| Serializable | ✗ prevenido | ✗ prevenido | ✗ prevenido |

Maior isolamento = maior consistência, menor concorrência, maior latência.

## Implementações

- **Lock-based:** Transações adquirem locks (compartilhados para leitura, exclusivos para escrita). Simples, mas propenso a deadlocks.
- **MVCC (Multi-Version Concurrency Control):** Cada transação vê um snapshot do banco no momento em que começou. Escritas criam novas versões; leituras não bloqueiam escritas. Usado pelo PostgreSQL, MySQL InnoDB.
