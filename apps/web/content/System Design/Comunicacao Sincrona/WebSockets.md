---
tags:
  - area/system-design
  - topic/communication
  - topic/synchronous-communication
  - topic/websockets
type: note
aliases:
  - WebSocket
  - WebSockets
---

related:: [[HTTP & REST]], [[GraphQL]], [[Webhooks & Pooling]], [[Chapter 18 – Sockets|Sockets]]

# WebSockets

WebSockets são um protocolo projetado para resolver problemas de **comunicação em tempo real** entre clientes e servidores em aplicações web.

### 1. Comunicação Full-Duplex e Bidirecional

Diferente do modelo HTTP tradicional, que é unidirecional e exige uma nova conexão TCP para cada ciclo de requisição/resposta, o WebSocket estabelece uma conexão **full-duplex sobre um único socket TCP**.

- Isso permite que tanto o cliente quanto o servidor enviem dados a qualquer momento de forma simultânea e contínua.
- **Aplicações ideais:** Chats online, dashboards dinâmicos, gráficos financeiros em tempo real, sistemas de notificações e jogos online.

### 2. O Processo de Handshake (Upgrade)

A conexão não começa diretamente como WebSocket; ela passa por um processo de "elevação" de protocolo:

1. Inicia-se como uma **requisição HTTP padrão**.
2. O cliente solicita um **"upgrade"** através do cabeçalho `Upgrade`.
3. Se o servidor suportar o protocolo, ele responde com uma confirmação e a conexão HTTP é então elevada a uma **conexão WebSocket persistente**.

### 3. Persistência e Latência

- Diferente do HTTP comum, a conexão WebSocket **permanece aberta** e ativa, permitindo a troca de dados até que uma das partes (cliente ou servidor) envie uma solicitação de fechamento.
- Ao manter o canal aberto, o protocolo elimina a necessidade de estabelecer novas conexões para cada interação, o que **reduz significativamente a latência** em sistemas com atualizações frequentes e instantâneas.

### 4. Desafios e Gestão de Tráfego

- **Compatibilidade e Redes:** Navegadores muito antigos ou ambientes de rede com restrições severas podem ter dificuldades em manter ou permitir conexões WebSocket.
- **Complexidade Técnica:** Gerenciar o estado de conexões persistentes e garantir a retransmissão de mensagens perdidas exige uma lógica mais robusta do que o uso de requisições HTTP simples.
- **Balanceamento de Carga:** Por serem conexões de longa duração (sessões ativas), algoritmos de balanceamento como o **Least Connection** ou o **Least Outstanding Requests (LOR)** são mais indicados para gerenciar WebSockets do que o Round Robin, pois consideram a carga real de sessões em andamento em cada host.

### 5. Camada de Abstração

Em arquiteturas modernas, os **API Gateways** e os **Load Balancers de Layer 7** (Camada de Aplicação) são capazes de interpretar e gerenciar conexões WebSocket, oferecendo uma interface única de roteamento e segurança para esses fluxos de dados bidirecionais.
