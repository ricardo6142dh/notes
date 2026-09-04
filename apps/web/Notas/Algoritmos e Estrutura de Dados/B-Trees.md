# B-Trees — Por que são tão boas em bancos de dados?

A ideia principal:

> **B-Trees são excelentes em bancos porque encontram dados com pouquíssimos acessos a pages de storage.**

Não é apenas sobre `O(log n)`. É sobre reduzir **I/O**.

---

## 1. O problema

Sem índice, procurar uma linha pode exigir um sequential scan:

```text
page 1 → não
page 2 → não
...
page N → achei
```

Complexidade:

```text
O(n)
```

Uma Binary Search Tree melhora para:

```text
O(log₂ n)
```

Mas uma árvore binária pode ser profunda.

Para 100 milhões de elementos:

```text
log₂(100M) ≈ 27 níveis
```

Se cada nível exigir acessar outra page, ainda temos muitos page accesses.

---

## 2. A sacada da B-Tree: high fan-out

Em vez de cada node ter apenas dois filhos:

```text
Binary Tree

       50
      /  \
```

uma B-Tree coloca **muitas keys e muitos pointers em cada node**:

```text
[10 | 20 | 30 | 40 | 50 | ... | 900]
 ↓    ↓    ↓    ↓    ↓           ↓
 P0   P1   P2   P3   P4          Pn
```

Isso é **high fan-out**.

```text
Binary Tree → fan-out ≈ 2
B-Tree      → fan-out ≈ centenas
```

Consequência:

> a árvore fica **larga e extremamente rasa**.

---

## 3. Por que isso combina tão bem com bancos?

Bancos trabalham com blocos chamados **pages**.

No PostgreSQL, por exemplo, normalmente:

```text
page = 8 KB
```

Um node da árvore pode aproveitar uma page inteira:

```text
┌───────────────────────────────┐
│ key │ key │ key │ ... │ key  │
│ ptr │ ptr │ ptr │ ... │ ptr  │
└───────────────────────────────┘
             8 KB
```

Uma leitura de page traz centenas de decisões de routing.

Em vez de:

```text
page read → 1 decisão
page read → 1 decisão
page read → 1 decisão
```

temos:

```text
page read
   ↓
centenas de keys
   ↓
escolhe o próximo branch
```

---

## 4. Altura

Com fan-out ~500:

```text
log₅₀₀(100M) ≈ 3
```

Então uma árvore com milhões ou até bilhões de entradas pode ter pouquíssimos níveis:

```text
Root
 ↓
Internal Node
 ↓
Leaf
```

Talvez apenas ~3–4 page accesses para encontrar um registro.

Por isso:

> **B-Trees are shallow and wide.**

---

## 5. B+ Tree

Bancos normalmente usam variantes próximas de **B+ Trees**.

Internal nodes são usados principalmente para navegação:

```text
             [30 | 60]
            /    |    \
           ▼     ▼     ▼
        internal nodes
              ↓
```

Os dados/referências finais ficam nas **leaf pages**:

```text
[10 20 30] → [40 50 60] → [70 80 90]
```

As leaves ficam ordenadas e conectadas.

Isso é muito importante para **range scans**.

---

## 6. Range Queries

Para:

```sql
WHERE age BETWEEN 30 AND 40
```

a árvore primeiro encontra `30`:

```text
Root
 ↓
Internal
 ↓
Leaf com 30
```

Depois percorre sequencialmente as leaves:

```text
[28 29 30] → [31 32 33] → [34 35 36] → [37 38 39 40]
```

Ou seja:

```text
seek
 ↓
sequential scan
```

Muito eficiente.

---

## 7. B-Tree vs Hash Index

Hash é excelente para equality:

```sql
WHERE id = 42
```

```text
hash(42)
   ↓
bucket
```

Mas perde ordenação.

Então é ruim para:

```sql
id > 42

id BETWEEN 100 AND 200

ORDER BY id
```

B-Tree mantém as keys ordenadas e suporta bem:

```text
=
<
>
BETWEEN
ORDER BY
MIN / MAX
```

Por isso é um índice extremamente versátil.

---

## 8. Locality

Uma page contém várias keys próximas.

Ao carregar:

```text
[100 101 102 103 104 ...]
```

uma única leitura pode servir várias operações próximas.

Isso combina muito bem com:

```text
CPU cache
Database Buffer Pool
OS Page Cache
SSD/HDD block I/O
```

---

# Modelo mental

```text
Binary Search Tree
        ↓
O(log n), mas profunda
        ↓
storage trabalha com pages
        ↓
coloque muitas keys por node/page
        ↓
HIGH FAN-OUT
        ↓
árvore larga e rasa
        ↓
pouquíssimos page accesses
        +
keys ordenadas
        ↓
range scans eficientes
```

---

# O que lembrar

> **B-Tree não é fodona simplesmente porque busca em O(log n).**

Ela é fodona porque:

```text
High fan-out
    ↓
pouca altura
    ↓
poucos page accesses

+

keys ordenadas
    ↓
range scans eficientes

+

pages
    ↓
boa locality
```

Em uma frase:

> **B+Trees conseguem navegar conjuntos gigantescos de keys com pouquíssimos page accesses, preservando ordenação e locality.**

---

## Próximo conceito importante

Para entender o trade-off com **LSM-Trees**, o próximo passo é entender o que acontece quando uma B-Tree recebe writes:

```text
INSERT
  ↓
encontra leaf page
  ↓
page tem espaço?
  ├── sim → insere
  └── não → PAGE SPLIT
```

É nos **page splits e random writes** que começam a aparecer os custos que motivam estruturas como LSM-Trees.
