---
tags:
  - topic/communication
  - topic/synchronous-communication
  - topic/grpc
type: note
aliases:
  - GRPC
  - gRPC
---

related:: [[RPC]], [[HTTP & REST]], [[Protocol Buffers]], [[API Gateway]]

# gRPC

O **gRPC** (Google Remote Procedure Call) é um framework de chamada de procedimento remoto de código aberto, desenvolvido pelo Google, focado em conectar serviços de maneira performática e escalável. Sua arquitetura baseia-se no uso do **HTTP/2 como protocolo de transporte** e no **Protocol Buffers (ProtoBuf)** como linguagem de descrição de interface (IDL).

Abaixo estão os pontos centrais sobre seu funcionamento e aplicação:

- **Eficiência de Rede:** Com o uso do HTTP/2, o gRPC permite realizar **múltiplas chamadas em paralelo sobre uma única conexão TCP**, reduzindo drasticamente a latência e o consumo de recursos em comparação com modelos que abrem novas conexões para cada requisição.
- **Streaming Bidirecional:** O framework suporta o envio de sequências de mensagens de forma contínua tanto do cliente para o servidor quanto vice-versa, utilizando uma única conexão persistente. Isso é ideal para cenários de monitoramento ou chats em tempo real.
- **Contratos Fortes com ProtoBuf:** O ProtoBuf funciona como um **contrato binário** entre cliente e servidor, sendo um sistema de serialização muito mais eficiente em termos de espaço e processamento do que o JSON. Ele exige que a estrutura de dados seja definida previamente em arquivos `.proto`, garantindo consistência agnóstica a linguagens.
- **Comunicação Interna vs. Externa:** Em arquiteturas de microserviços, o gRPC é frequentemente a escolha para **comunicação interna** (entre serviços) devido à sua velocidade, enquanto o padrão **REST** costuma ser mantido para a exposição de APIs a clientes externos pela sua simplicidade de consumo.
- **Desafios de Gestão:** A implementação do gRPC pode ser mais complexa que a do REST, especialmente devido à necessidade de **distribuir e versionar os contratos (ProtoBufs)** entre todos os times envolvidos, garantindo que atualizações na interface não quebrem os clientes existentes.

Além dessas funcionalidades, o gRPC oferece recursos nativos de **autenticação, balanceamento de carga e validações**, tornando-o uma ferramenta robusta para sistemas distribuídos modernos.
