---
tags:
  - course/system-design
  - topic/transactions
---

# Durabilidade

Propriedade do [[ACID]] que garante que **dados de transações commitadas persistem mesmo em caso de falha do sistema** — queda de energia, crash do processo, reinicialização do servidor.

## Ideia Central

Uma vez que o banco responde com "commit bem-sucedido", os dados estão salvos. Não importa o que aconteça depois — os dados estarão lá quando o sistema voltar.

## Como é implementado

### Write-Ahead Log (WAL)

Antes de qualquer dado ser escrito nas páginas do banco, a operação é registrada em um log sequencial em disco. Em caso de falha:

1. Sistema reinicia
2. Lê o WAL
3. Reaplicar operações commitadas que não chegaram às páginas
4. Desfaz operações não commitadas

### Fsync

O banco força o sistema operacional a descarregar os dados do buffer para o disco físico antes de confirmar o commit. Sem isso, o SO pode guardar dados em memória e perdê-los em caso de falha.

### Replicação

Dados são replicados para múltiplos nós. Mesmo se um nó inteiro morrer, outros têm a cópia.

## Trade-offs

- **Durabilidade vs Performance:** Cada fsync adiciona latência. Sistemas que desabilitam fsync ganham performance mas perdem durabilidade — aceitável apenas para dados descartáveis.
- **Durabilidade vs Custo:** Replicação síncrona para múltiplas regiões garante durabilidade máxima mas é cara e lenta.

## Relação com [[Atomicity|Atomicidade]]

Atomicidade garante que a transação é toda ou nada. Durabilidade garante que o "toda" persiste para sempre.
