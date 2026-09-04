---
tags:
  - course/system-design
  - topic/transactions
---

# Atomicidade

Propriedade do [[ACID]] que garante que uma transação é tratada como uma **unidade indivisível** — ou todas as operações são executadas com sucesso, ou nenhuma delas é aplicada.

## Ideia Central

Se uma transação contém N operações e a operação K falha, todas as K-1 operações anteriores são desfeitas (_rollback_). O banco retorna ao estado anterior à transação.

## Por que importa

Sem atomicidade, falhas parciais corrompem os dados. Exemplo clássico: transferência bancária.

```
1. Debitar R$100 da conta A  ✓
2. Creditar R$100 na conta B  ✗ (falha)
```

Sem atomicidade, R$100 some. Com atomicidade, o débito é desfeito e ambas as contas ficam intactas.

## Como é implementado

- **Write-Ahead Log (WAL):** Toda operação é registrada em um log antes de ser aplicada. Em caso de falha, o sistema replaye ou desfaz as entradas do log.
- **MVCC (Multi-Version Concurrency Control):** Versões dos dados são mantidas até que a transação seja confirmada (_commit_).

## Relação com outras propriedades ACID

Atomicidade trabalha junto com [[Durability|Durabilidade]] (o que foi commitado persiste) e [[Isolation|Isolamento]] (transações não se interferem).
