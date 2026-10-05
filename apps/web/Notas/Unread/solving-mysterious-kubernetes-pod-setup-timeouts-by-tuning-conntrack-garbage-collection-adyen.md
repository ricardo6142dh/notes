---
title: "Cilium CNI: pod setup timeouts caused by conntrack GC"
status: unread
source: https://www.adyen.com/knowledge-hub/inside-cilium-cni-solving-kubernetes-pod-setup-timeouts
created: 2026-09-15
tags:
  - source/article
  - topic/cilium
  - topic/kubernetes
  - topic/networking
  - topic/performance
---

## TL;DR

Nos nodes de 2 TB de RAM da Adyen, o garbage collector adaptativo do conntrack do Cilium chegou a esperar até 12 horas entre limpezas. Milhões de entradas expiradas permaneceram no mapa e tornaram operações de criação e remoção de pods lentas. Fixar `conntrackGCInterval: 60s` estabilizou o tamanho da tabela e eliminou os pod setup timeouts.

## Problema

Alguns pods falhavam durante a configuração de rede pelo Cilium CNI. O limite do CNI era de 90 segundos, mas uma passagem completa pela tabela de conntrack podia consumir quase todo esse tempo.

Os números encontrados pela equipe:

- cerca de 7 milhões de entradas na tabela, a maioria já expirada;
- aproximadamente 200 mil entradas processadas por segundo;
- 35 segundos para percorrer 7 milhões de entradas;
- até 80 segundos no pico de 16 milhões de entradas;
- duração normal do GC próxima de 1 segundo, chegando a 80 segundos durante o incidente.

O comando usado para inspecionar a tabela foi:

```bash
cilium bpf ct list global
```

## Causa raiz

O Cilium executava dois tipos de limpeza:

1. Limpeza específica de endpoint, disparada na criação ou remoção de pods.
2. Limpeza periódica completa, responsável por remover entradas expiradas.

As execuções frequentes vistas nas métricas eram principalmente limpezas específicas de endpoint. Elas percorriam a tabela, mas removiam somente entradas relacionadas ao IP daquele endpoint.

O intervalo da limpeza periódica era adaptativo. Quando uma execução removia menos de 5% da tabela, o Cilium aumentava o intervalo em 1,5 vez, até o limite de 12 horas. Em uma tabela com 16 milhões de entradas, seria necessário remover mais de 800 mil entradas por execução apenas para evitar esse aumento.

Em nodes que alternavam períodos tranquilos e picos intensos, o algoritmo postergava a limpeza. Entradas expiradas acumulavam, e cada operação que precisava caminhar sequencialmente pelo mapa eBPF pagava custo linear.

Cada elemento exigia duas syscalls, uma para localizar a próxima chave e outra para buscar seu valor. Como o processo roda em user space e acessa um mapa eBPF no kernel, cada syscall também gera context switches. A iteração depende da chave atual para encontrar a próxima, portanto não pode ser paralelizada de forma simples.

## Correção

A equipe desativou o intervalo adaptativo e configurou uma frequência fixa:

```yaml
conntrackGCInterval: 60s
```

Com uma limpeza completa pelo menos a cada minuto, a tabela caiu de tamanho e permaneceu estável. A duração das chamadas da API retornou ao normal.

## Observabilidade

As métricas mais úteis para detectar o problema:

- `cilium_datapath_conntrack_gc_duration_seconds`: duração de cada execução do GC;
- `cilium_datapath_conntrack_gc_entries`: quantidade de entradas na tabela;
- intervalo atual do conntrack GC nos logs do Cilium agent.

Alertas devem correlacionar tamanho da tabela, duração do GC e latência de criação de pods. Observar apenas quantidade de execuções é enganoso: o GC pode executar frequentemente sem remover as entradas expiradas que importam.

## Lições

- Algoritmos adaptativos precisam de limites adequados ao tamanho absoluto do estado.
- Percentuais podem esconder números enormes: 5% de 16 milhões são 800 mil entradas.
- Timeout protege o caller, mas não necessariamente cancela trabalho no backend. Depois do timeout, o Cilium continuava processando enquanto novas operações formavam fila.
- Napkin math com métricas reais localizou o gargalo antes de toda a cadeia causal estar compreendida.
- Economizar CPU durante períodos tranquilos não compensa bloquear criação de pods durante picos.

## Fonte

[Inside Cilium CNI: solving mysterious Kubernetes pod setup timeouts](https://www.adyen.com/knowledge-hub/inside-cilium-cni-solving-kubernetes-pod-setup-timeouts) - Adyen Engineering

## Connections

- [[Cursos/Descomplicando System Design/Concepts/Kubernetes|Kubernetes]]
- [[Cursos/Descomplicando System Design/Escalabilidade, Performance e Capacidade/Performance|Performance]]
- [[Cursos/Fundamentals of Operating Systems/Chapter 17 – I O Systems & Storage|I/O Systems & Storage]]
