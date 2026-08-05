- **AMQP (Advanced Message Queuing Protocol):**
    
    - **Foco:** Sistemas corporativos, microsserviços e transações complexas.
        
    - **Como funciona:** Protocolo robusto e programável. Utiliza o conceito de _Exchanges_ para rotear mensagens para filas específicas (_Queues_) com base em regras flexíveis.
        
    - **Exemplo de uso:** RabbitMQ.
        
- **MQTT (Message Queuing Telemetry Transport):**
    
    - **Foco:** Internet das Coisas (IoT), dispositivos embarcados e redes instáveis.
        
    - **Como funciona:** Extremamente leve e de baixo consumo de energia. Baseado no modelo Publish/Subscribe por tópicos (ex: `casa/quarto/temperatura`).
        
    - **Exemplo de uso:** Mosquitto, HiveMQ, automação residencial e sensores.
        
- **STOMP (Simple Text-Oriented Messaging Protocol):**
    
    - **Foco:** Simplicidade de implementação e integração Web.
        
    - **Como funciona:** Protocolo orientado a texto (semelhante ao HTTP) projetado para ser simples de implementar em diversas linguagens de programação.
        
    - **Exemplo de uso:** Comunicação via WebSockets em navegadores com backends Java/Spring ou Node.js.
        
- **Kafka Protocol (Proprietário do Apache Kafka):**
    
    - **Foco:** Processamento de streams de dados e grandes volumes (_Event Streaming_).
        
    - **Como funciona:** Diferente do modelo tradicional de filas, o Kafka funciona como um log distribuído ordenado e persistente, permitindo alta vazão e releitura de dados.
        
    - **Exemplo de uso:** Processamento de logs em tempo real, pipelines de dados e CDC (Change Data Capture).

