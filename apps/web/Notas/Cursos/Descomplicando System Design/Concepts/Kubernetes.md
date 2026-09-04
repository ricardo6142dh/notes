---
tags:
  - course/system-design
  - topic/kubernetes
---

# Kubernetes (K8s)

Plataforma de orquestração de containers que **automatiza deploy, escalonamento e gestão de aplicações containerizadas**. Abstrai a infraestrutura subjacente — você declara o estado desejado e o Kubernetes trabalha para mantê-lo.

## Conceitos fundamentais

### Pod
Menor unidade deployável. Contém um ou mais containers que compartilham rede e armazenamento. Containers dentro de um pod se comunicam via `localhost`.

### Deployment
Descreve o estado desejado: qual imagem rodar, quantas réplicas, política de update. O Deployment Controller reconcilia continuamente o estado atual com o desejado.

### Service
Abstração de rede que expõe pods como um endpoint estável. Pods têm IPs efêmeros — o Service fornece IP e DNS fixos, fazendo load balancing entre os pods.

```
Cliente → Service (IP fixo) → Pod A
                             → Pod B
                             → Pod C
```

### ConfigMap e Secret
Injeção de configuração e credenciais nos pods sem rebuildar a imagem.

### Namespace
Isolamento lógico dentro do cluster — separa ambientes (dev, staging, prod) ou times.

## Como o Kubernetes garante disponibilidade

- **Self-healing:** Se um pod morre, o Controller cria outro automaticamente.
- **Rolling updates:** Deploya nova versão gradualmente — se falhar, faz rollback.
- **Horizontal Pod Autoscaler (HPA):** Escala número de pods com base em CPU/memória/métricas customizadas.
- **Node affinity e anti-affinity:** Distribui pods entre nós para evitar ponto único de falha.

## Arquitetura do cluster

```
Control Plane          Worker Nodes
┌─────────────┐        ┌──────────┐ ┌──────────┐
│ API Server  │───────▶│  Kubelet │ │  Kubelet │
│ etcd        │        │  Pods    │ │  Pods    │
│ Scheduler   │        └──────────┘ └──────────┘
│ Controllers │
└─────────────┘
```

- **API Server:** Ponto de entrada — recebe comandos (`kubectl apply`).
- **etcd:** Banco chave-valor distribuído que armazena todo o estado do cluster.
- **Scheduler:** Decide em qual nó cada pod vai rodar.
- **Kubelet:** Agente em cada nó que garante que os pods estejam rodando.

## Relação com [[Microservices|Microsserviços]]

Kubernetes é a plataforma natural para rodar microsserviços em produção — cada serviço vira um Deployment, exposto por um Service, escalado pelo HPA.
