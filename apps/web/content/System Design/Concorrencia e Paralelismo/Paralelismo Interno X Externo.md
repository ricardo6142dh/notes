---
tags:
  - course/system-design
  - topic/parallelism
type: note
aliases:
  - Internal vs External Parallelism
  - Paralelismo Interno e Externo
---

related:: [[Concorrência]]

# Paralelismo Interno X Externo

### **1. Paralelismo Interno (Intrínseco)**

O paralelismo interno ocorre dentro dos limites de um **único processo**.

- **Definição:** É a execução simultânea de sub-tarefas dentro de um mesmo container ou servidor.
- **Funcionamento:** O desenvolvedor implementa diretamente no **código da aplicação** a divisão de tarefas ou itens que estão na memória para serem processados por múltiplas threads ao mesmo tempo.
- **Objetivo:** Otimizar o uso dos núcleos de CPU disponíveis naquela máquina específica para acelerar o processamento de uma tarefa ampla.

### **2. Paralelismo Externo**

O paralelismo externo refere-se à execução simultânea de tarefas distribuídas em **diferentes hardwares, máquinas ou containers**.

- **Definição:** É a base dos sistemas de **computação distribuída**.
- **Casos de Uso e Tecnologias:**
    - **Big Data e Analytics:** Ferramentas como **Hadoop e Spark** utilizam o paralelismo externo para processar volumes massivos de dados em clusters de servidores.
    - **Mensageria e Streaming:** O consumo de mensagens de brokers como **RabbitMQ e SQS**, ou streamings como o **Kafka**, que distribuem dados entre várias instâncias para tarefas de ETL e Machine Learning.
    - **Gestão de Tráfego:** O uso de **Load Balancers** para dividir requisições entre várias réplicas de uma mesma aplicação é uma forma de paralelismo externo, pois distribui o trabalho entre diferentes instâncias para suportar altos volumes de tráfego.

### **Resumo da Diferença**

A principal distinção está na infraestrutura envolvida: enquanto o **paralelismo interno** foca em dividir o trabalho dentro de um único programa (via código), o **paralelismo externo** foca em escalar a execução através de uma rede de múltiplos servidores coordenados.
