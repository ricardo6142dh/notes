---
tags:
  - course/system-design
  - topic/distributed-systems
---

# Consistência

Propriedade que garante que **todos os nós de um sistema distribuído veem os mesmos dados ao mesmo tempo**. Após uma escrita bem-sucedida, qualquer leitura subsequente — em qualquer nó — retorna o valor atualizado.

## Tipos de Consistência

### Consistência Forte (Strong Consistency)

Qualquer leitura após uma escrita retorna o valor mais recente. O sistema se comporta como se fosse um único servidor.

- **Trade-off:** Maior latência, menor disponibilidade durante partições.
- **Exemplos:** Sistemas bancários, reservas de ingressos.

### Consistência Eventual (Eventual Consistency)

O sistema garante que, se nenhuma nova atualização for feita, eventualmente todos os nós convergirão para o mesmo valor. Pode haver janelas de inconsistência.

- **Trade-off:** Menor latência, maior disponibilidade.
- **Exemplos:** DNS, feeds de redes sociais, carrinho de compras da Amazon.

### Consistência Causal

Operações causalmente relacionadas são vistas na ordem correta. Leituras independentes podem estar desatualizadas.

## Consistência no contexto ACID vs CAP

- **[[ACID]]:** Consistência garante que uma transação leva o banco de um estado válido a outro estado válido — respeitando todas as constraints e regras de integridade.
- **[[CAP Theorem|CAP]]:** Consistência significa que todos os nós têm a mesma visão dos dados em qualquer momento.

São definições diferentes do mesmo termo.

## Técnicas para garantir consistência

- **Protocolos de consenso:** Raft, Paxos — garantem que todos os nós concordem com o valor antes de confirmar.
- **Quorum:** A escrita só é confirmada quando W nós respondem; a leitura consulta R nós. Se W + R > N (total de nós), há sobreposição garantida.
- **Two-Phase Commit (2PC):** Coordenador verifica se todos os participantes estão prontos antes de commitar.
