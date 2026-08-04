---
tags:
  - course/system-design
  - topic/cap
  - topic/distributed-systems
type: note
aliases:
  - PACELC
  - PA EL
  - PC EC
---

related:: [[CAP Combinations]], [[Consistency]], [[Availability]], [[Partition]]

# PACELC

**PACELC** é uma extensão do **CAP Theorem** proposta por Daniel Abadi. A principal ideia é que o CAP só explica o que acontece **durante uma partição de rede**, enquanto o PACELC também explica os trade-offs **quando tudo está funcionando normalmente**.

A regra é:

**P** ([[Partition]]) → escolha entre **A** ([[Availability]]) e **C** ([[Consistency]]).  
**ELSE** (sem partição) → escolha entre **L** (Latency) e **C** (Consistency).

Vamos usar o exemplo das **duas lojas** (Loja A e Loja B) que compartilham o estoque.

Quando a rede está **normal**, as lojas conseguem conversar.  
Quando há uma **partição**, elas ficam isoladas.

## 1. PA/EL (Disponibilidade + Baixa Latência)

**Durante uma partição (PA):**

- A rede cai.
- As duas lojas continuam vendendo normalmente.
- Cada uma atualiza seu próprio estoque.
- Depois que a rede volta, elas reconciliam as diferenças.

**Sem partição (EL):**

- A Loja A vende imediatamente.
- Atualiza a Loja B de forma assíncrona.
- O cliente recebe resposta rapidamente.

**Prioridade:** velocidade e disponibilidade.

**Problema:** pode vender o último produto duas vezes.

---

## 2. PA/EC (Disponibilidade + Consistência)

**Durante uma partição (PA):**

- As duas lojas continuam vendendo.

**Sem partição (EC):**

- Cada venda espera confirmação das duas lojas antes de concluir.
- O estoque fica sempre consistente.

**Isso existe?**  
Sim, mas é **bem incomum**.

É uma arquitetura estranha porque:

- Quando a rede está boa, você aceita alta latência para manter consistência.
- Mas quando a rede quebra, abandona essa consistência e continua disponível.

É uma combinação possível no modelo, mas pouco usada.

---

## 3. PC/EL (Consistência + Baixa Latência)

**Durante uma partição (PC):**

- A Loja A percebe que não consegue falar com a Loja B.
- Ela para de vender aquele produto.
- Prefere ficar indisponível a vender errado.

**Sem partição (EL):**

- Enquanto tudo funciona, responde rapidamente.
- Usa otimizações (leader local, cache, protocolos rápidos) para minimizar a latência.

**Isso existe?**  
Sim, embora seja menos comum do que PC/EC.

---

## 4. PC/EC (Consistência + Consistência)

**Durante uma partição (PC):**

- A Loja A não consegue confirmar com a Loja B.
- Ela bloqueia novas vendas.

**Sem partição (EC):**

- Toda venda espera confirmação de ambas as lojas.
- A resposta demora um pouco mais.
- O estoque nunca fica inconsistente.

Esse é o comportamento de bancos distribuídos e sistemas como o Google Spanner.

---

### Resumo

|PACELC|Durante partição|Sem partição|Exemplo de comportamento|
|---|---|---|---|
|**PA/EL**|Continua vendendo|Responde imediatamente|Cassandra, Dynamo|
|**PA/EC**|Continua vendendo|Espera confirmação|Possível, mas raro|
|**PC/EL**|Para de vender|Responde rápido|Possível com otimizações|
|**PC/EC**|Para de vender|Espera confirmação|Spanner, CockroachDB|

### O mais importante

É aí que o PACELC fica interessante: **as duas decisões são independentes**.

Na prática, porém, existem dois padrões muito mais comuns:

- **PA/EL** → sistemas que valorizam escalabilidade, disponibilidade e baixa latência (redes sociais, catálogos, recomendações).
- **PC/EC** → sistemas que valorizam consistência acima de tudo (bancos, pagamentos, estoque financeiro).

As combinações **PA/EC** e **PC/EL** são perfeitamente válidas pelo teorema, mas aparecem com muito menos frequência porque as escolhas de implementação tendem a aproximar disponibilidade de baixa latência, e consistência de maior latência.


## PACELC: PA/EL vs. PC/EC

Consider two stores:

- Store A in Frankfurt
    
- Store B in London
    

Each store is connected to a replica of the same inventory database.

There is only **one PlayStation 5 left in stock**.

## PA/EL — Cassandra or DynamoDB

A PA/EL system prioritizes:

- Availability during a network partition
    
- Low latency when the network is healthy
    

### Normal operation

A customer buys the PlayStation 5 from the Frankfurt store.

The Frankfurt application updates its local database replica:

```text
PS5 stock: 1 → 0
```

The store immediately confirms the purchase to the customer. The update is then replicated asynchronously to the London replica.

```text
Write to local replica
        ↓
Respond to customer
        ↓
Replicate to other replicas later
```

This is fast because the request does not wait for every replica to confirm the write.

### During a network partition

Now imagine the connection between Frankfurt and London fails.

```text
Frankfurt replica   X   London replica
```

Both stores still believe that one PlayStation 5 is available.

At the same time:

- Customer 1 buys the PS5 in Frankfurt.
    
- Customer 2 buys the PS5 in London.
    

Both stores accept the purchase because they cannot communicate with each other.

```text
Frankfurt replica: PS5 stock = 0
London replica:    PS5 stock = 0
```

However, only one physical PlayStation 5 exists.

When connectivity returns, the database detects conflicting updates and reconciles the replicas. The application may need to cancel one order and refund one customer.

This model provides high availability and low latency, but accepts temporary inconsistency.

## PC/EC — Google Spanner

A PC/EC system prioritizes:

- Consistency during a network partition
    
- Consistency over latency when the network is healthy
    

### Normal operation

A customer tries to buy the last PlayStation 5 from the Frankfurt store.

The application starts a distributed transaction. The database leader coordinates the update, and a quorum of replicas must confirm the write before the transaction commits.

```text
Check PS5 stock
        ↓
Send write to leader
        ↓
Wait for quorum
        ↓
Commit stock: 1 → 0
        ↓
Confirm purchase
```

The customer waits slightly longer because the system must coordinate across replicas before confirming the purchase.

However, once the transaction commits, all relevant replicas agree that the stock is now zero.

### During a network partition

Now imagine Frankfurt loses connectivity with the database leader or cannot form a quorum.

A customer in Frankfurt tries to buy the PlayStation 5.

The local replica cannot safely confirm whether another store has already sold it.

Instead of accepting the purchase, the system rejects or delays the transaction.

```text
Cannot reach leader or quorum
        ↓
Transaction cannot commit
        ↓
Purchase is rejected
```

The customer may receive a temporary error, but the system prevents two stores from selling the same final PlayStation 5.

This model preserves strong consistency but may sacrifice availability during failures and introduce higher latency during normal operation.

## Comparison

|Model|During a partition|Without a partition|
|---|---|---|
|PA/EL|Both stores may continue selling|Local write and fast response|
|PC/EC|A store without quorum stops selling|Waits for distributed confirmation|

The key difference is:

- **PA/EL:** both stores may sell the last PS5, and the conflict is resolved later.
    
- **PC/EC:** one store may become temporarily unavailable, but the last PS5 cannot be sold twice.
    

Cassandra and DynamoDB commonly favor local writes, asynchronous replication, and later conflict resolution.

Google Spanner favors leaders, consensus, quorum, and synchronous coordination.

The same mechanisms that provide strong consistency also increase latency during normal operation.

Therefore:

- **PA/EL:** high availability and low latency, with possible temporary inconsistency
    
- **PC/EC:** strong consistency, with higher latency and possible unavailability during partitions
