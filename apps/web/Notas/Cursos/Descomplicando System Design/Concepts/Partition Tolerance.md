---
tags:
  - course/system-design
  - topic/distributed-systems
---

# Tolerância a Partições

No contexto do [[CAP Theorem|Teorema CAP]], Tolerância a Partições significa que o **sistema continua operando mesmo quando a comunicação entre nós falha** — mensagens são perdidas, atrasadas ou nós ficam temporariamente inacessíveis entre si.

## O que é uma Partição de Rede

Uma partição de rede ocorre quando um grupo de nós perde comunicação com outro grupo. Os nós continuam funcionando individualmente, mas não conseguem se sincronizar.

```
[Nó A] [Nó B]  ✗  [Nó C] [Nó D]
   Grupo 1              Grupo 2
```

Nós A e B não conseguem falar com C e D. Cada grupo pode continuar respondendo requisições, mas não sabe o que o outro grupo está fazendo.

## Por que é obrigatória em sistemas distribuídos

Redes físicas falham. Cabos são cortados, switches travam, datacenters perdem conectividade. Em qualquer sistema distribuído real, partições de rede vão acontecer — ignorar essa possibilidade não é uma opção.

Por isso, o Teorema CAP na prática se reduz a: **Consistência ou Disponibilidade durante uma partição?**

## Trade-off durante uma partição

Quando uma partição ocorre, o sistema deve escolher:

**Priorizar [[Consistency|Consistência]] (CP):**
- Nós que não podem garantir dados atualizados param de responder
- Sistema retorna erro até a partição ser resolvida
- Nenhum dado desatualizado é servido
- Usado por: sistemas financeiros, reservas, inventário

**Priorizar [[Availability|Disponibilidade]] (AP):**
- Todos os nós continuam respondendo, mesmo com dados possivelmente desatualizados
- Consistência eventual — quando a partição é resolvida, os nós se sincronizam
- Usado por: redes sociais, streaming, DNS

## Diferença de [[Partition|Sharding]]

Partição no CAP = falha de comunicação entre nós (network partition).
[[Partition|Sharding]] = divisão intencional de dados entre nós para escalar.

Terminologia similar, conceitos distintos.
