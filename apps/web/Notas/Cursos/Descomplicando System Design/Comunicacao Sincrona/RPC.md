---
tags:
  - course/system-design
  - topic/communication
  - topic/synchronous-communication
---

# RPC

O **RPC** (Remote Procedure Call) é um protocolo utilizado para executar **chamadas de procedimento ou métodos em um sistema computacional diferente** daquele em que o código está sendo executado. Ele permite que um programa em um dispositivo cliente envie uma solicitação para um software em um servidor, que executa o procedimento e retorna o resultado como se a execução fosse local.

### 1. Funcionamento e Abstração

- **Transparência de Rede:** O RPC **abstrai a complexidade da comunicação em rede**, permitindo que desenvolvedores se concentrem na lógica de negócios em vez de detalhes técnicos de como os dados são transmitidos e recebidos.
- **Comunicação Síncrona:** Geralmente opera em um modelo síncrono, onde o cliente pode ficar bloqueado aguardando o processamento do servidor.
- **Tipos de Protocolos:** Existem diversos tipos de protocolos baseados em RPC, como **SOAP, Thrift, CORBA** e a alternativa moderna **gRPC**.

### 2. RPC Convencional vs. gRPC

- **Flexibilidade vs. Rigidez:** Chamadas RPC convencionais podem não exigir um **contrato forte**, o que oferece velocidade e flexibilidade na implementação, mas pode prejudicar a consistência e o padrão dos dados.
- **gRPC (Google RPC):** É uma evolução que utiliza **HTTP/2** como transporte e **Protocol Buffers (ProtoBuf)** como linguagem de descrição de interface. O gRPC exige contratos via ProtoBuf, garantindo **consistência forte** entre cliente e servidor.

### 3. Vantagens e Trade-offs

- **Eficiência com gRPC:** O gRPC permite **streaming bidirecional** e múltiplas chamadas paralelas sobre uma única conexão TCP, otimizando latência e uso de rede.
- **Complexidade de Gestão:** Implementar sistemas RPC (especialmente gRPC) pode ser mais complexo do que usar REST, devido à necessidade de **distribuir e versionar os contratos** (ProtoBufs) entre todas as partes interessadas.
- **Convergência Arquitetural:** Em arquiteturas de microserviços, é comum expor domínios via **REST** para clientes externos, enquanto a **comunicação interna** entre serviços utiliza gRPC por ser mais leve e performático.

### 4. Exemplos de Uso

- **Sistemas Distribuídos:** Ideal para conectar microserviços de maneira performática onde o desempenho é crítico.
- **Gateways e Proxies:** Balanceadores de carga modernos e API Gateways podem atuar como intermediários para serviços RPC, lidando com protocolos específicos em camadas superiores da rede.
