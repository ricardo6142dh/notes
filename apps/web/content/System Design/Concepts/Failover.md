---
tags:
  - course/system-design
  - topic/reliability
---

# Failover

Mecanismo pelo qual um sistema **automaticamente transfere carga para um componente de backup** quando o componente primário falha — minimizando tempo de inatividade e impacto para os usuários.

## Tipos de Failover

### Active-Passive

Um nó primário ativo processa todo o tráfego. Um nó secundário (standby) fica em espera, replicando dados mas sem servir tráfego.

- **Quando falha:** O secondary assume o IP/DNS do primary.
- **Vantagem:** Simples de implementar, sem conflitos de escrita.
- **Desvantagem:** O secondary fica ocioso; o tempo de failover depende da detecção de falha (geralmente segundos a minutos).

### Active-Active

Múltiplos nós ativos servem tráfego simultaneamente. Se um falha, os demais absorvem a carga.

- **Vantagem:** Sem desperdício de recursos; failover quase instantâneo.
- **Desvantagem:** Mais complexo — precisa lidar com conflitos de escrita e consistência entre nós.

## Componentes de um sistema de failover

1. **Health check:** Monitoramento contínuo do nó primário (ping, TCP check, query de teste).
2. **Detecção de falha:** Threshold de falhas consecutivas antes de acionar o failover.
3. **Promoção:** O secondary é promovido a primary (atualiza DNS, redireciona conexões).
4. **Reconfiguração dos clientes:** Clientes precisam reconectar ao novo primary.

## Trade-offs

- **RTO (Recovery Time Objective):** Quanto tempo leva para o sistema voltar ao ar após failover.
- **RPO (Recovery Point Objective):** Quanto dado pode ser perdido — depende do lag de replicação no momento da falha.
- **Split-brain:** Cenário onde dois nós se acham primary simultaneamente. Resolvido com quorum ou fencing.

## Relação com [[Availability|Disponibilidade]]

Failover é uma das principais técnicas para alcançar alta disponibilidade. Sem failover automático, falhas de hardware resultam em downtime manual.
