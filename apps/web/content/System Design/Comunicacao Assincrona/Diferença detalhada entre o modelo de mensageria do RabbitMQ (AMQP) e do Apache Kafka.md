A principal diferença entre o **RabbitMQ (AMQP)** e o **Apache Kafka** está no modelo fundamental de gerenciamento das mensagens: o RabbitMQ é um **broker de mensagens tradicional ("Message Broker")**, enquanto o Kafka é um **plataforma de streaming de eventos ("Event Streaming Platform")**.

### 1. Modelo de Entrega: Smart Broker vs. Smart Consumer

- **RabbitMQ (Smart Broker, Dumb Consumer):**
    
    - O broker assume toda a responsabilidade de rotear, gerenciar e monitorar as mensagens.
    
    - O consumidor apenas escuta a fila. Assim que ele processa e envia uma confirmação (_acknowledgement_ ou `ACK`), o RabbitMQ **remove a mensagem da fila** para liberar espaço.
    
- **Kafka (Dumb Broker, Smart Consumer):**
    
    - O Kafka apenas grava as mensagens sequencialmente em um log persistente em disco.
    
    - Quem controla o que foi lido é o próprio consumidor, mantendo um ponteiro chamado **Offset**. O Kafka não remove a mensagem após o consumo; ela permanece lá até expirar pelo tempo de retenção configurado.
    

### 2. Roteamento e Estrutura de Dados

- **RabbitMQ (Exchanges e Queues):**
    
    - **Exchanges:** Recebem as mensagens dos produtores e usam regras de roteamento (Direct, Fanout, Topic, Headers) para distribuí-las para uma ou mais filas.
    
    - **Queues:** As filas são estruturas FIFO (First-In, First-Out) onde as mensagens aguardam o consumo.
    
- **Kafka (Topics e Partitions):**
    
    - **Topics:** Representam a categoria do evento.
    
    - **Partitions:** Cada tópico é dividido em partições distribuídas no cluster. A ordenação é garantida apenas **dentro de uma mesma partição**, e não no tópico inteiro.
    

### 3. Persistência e Releitura de Dados

- **RabbitMQ:** As mensagens são tratadas como efêmeras. O objetivo é entregá-las e descartá-las o mais rápido possível. Não é projetado para que um consumidor volte no tempo e leia mensagens passadas.

- **Kafka:** As mensagens são persistidas em disco por padrão (ex: 7 dias, 30 dias ou indefinidamente). Diferentes consumidores (ou o mesmo) podem **"rebobinar" o offset** e reprocessar eventos passados a qualquer momento.

### 4. Escalonamento e Performance

|**Característica**|**RabbitMQ**|**Apache Kafka**|
|---|---|---|
|**Arquitetura principal**|Filas e trocas programáveis|Log de transações distribuído|
|**Escala horizontal**|Escala bem, mas o roteamento complexo adiciona sobrecarga|Escala massivamente dividindo tópicos em partições|
|**Vazão (Throughput)**|Dezenas a centenas de milhares de msg/s|Milhões de eventos/s|
|**Priorização**|Suporta filas com prioridade de mensagens|Não suporta prioridade de mensagens|

### Quando escolher qual?

- **Escolha o RabbitMQ se você precisa de:**

    - Roteamento complexo e dinâmico entre serviços.
    - Garantia de entrega individual por mensagem com confirmação (`ACK`/`NACK`).
    - Suporte nativo a filas com prioridade ou tempo de vida individual (_TTL_).
    - Comunicação RPC (Remote Procedure Call) assíncrona.
    
- **Escolha o Kafka se você precisa de:**
    
    - Processamento de dados em tempo real (Event-Driven Architecture) em altíssima escala.
    - Releitura de eventos históricos (event sourcing, auditoria, análise de dados).
    - Conectar pipelines de Big Data e processar streams de dados contínuos.