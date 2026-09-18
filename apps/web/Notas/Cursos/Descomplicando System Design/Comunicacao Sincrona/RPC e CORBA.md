
## RPC

**RPC (Remote Procedure Call)** é um modelo de comunicação que permite
chamar uma função ou método em outro processo/máquina como se fosse uma
chamada local.

Ele pertence conceitualmente à **camada de aplicação (Layer 7)**.

O RPC não define obrigatoriamente qual transporte deve ser usado.
Diferentes implementações podem usar HTTP, TCP diretamente ou outros
protocolos.

``` text
Aplicação
   ↓
RPC
   ↓
Protocolo de aplicação / transporte do RPC
   ↓
TCP / QUIC / etc.
   ↓
IP
```

Exemplo com **gRPC**:

``` text
Aplicação
   ↓
gRPC
   ↓
HTTP/2
   ↓
TCP
   ↓
IP
```

Portanto, **RPC não significa necessariamente HTTP sobre TCP**. Um
sistema RPC pode definir seu próprio protocolo de aplicação e utilizá-lo
diretamente sobre TCP.

------------------------------------------------------------------------

## CORBA

**CORBA (Common Object Request Broker Architecture)** é uma
arquitetura/middleware para comunicação entre objetos distribuídos,
padronizada pela OMG.

A ideia é semelhante a RPC: o cliente chama uma operação de um objeto
remoto sem precisar lidar diretamente com sockets ou com o formato das
mensagens.

Um componente central é o **ORB (Object Request Broker)**, responsável
por localizar o objeto remoto, serializar a chamada, transmitir a
requisição e entregar a resposta.

``` text
Aplicação
   ↓
CORBA / ORB
   ↓
GIOP
   ↓
IIOP
   ↓
TCP
   ↓
IP
```

### GIOP

**GIOP (General Inter-ORB Protocol)** define como ORBs se comunicam:

-   formato das mensagens;
-   requests e responses;
-   identificação das operações;
-   erros/exceptions;
-   representação dos dados transmitidos.

### IIOP

**IIOP (Internet Inter-ORB Protocol)** é o mapeamento do GIOP para redes
TCP/IP.

Na prática:

``` text
CORBA
  ↓
GIOP
  ↓
IIOP
  ↓
TCP
```

Não é necessário HTTP entre CORBA e TCP.

------------------------------------------------------------------------

## Comparação mental: CORBA vs gRPC

  CORBA              gRPC
  ------------------ -------------------------------
  IDL                `.proto` / Protocol Buffers
  ORB                client/server stubs + runtime
  GIOP/IIOP       HTTP/2
  TCP                TCP
  
  Chamadas remotas   Chamadas remotas

A diferença importante para visualizar a pilha é:

``` text
CORBA                  gRPC

CORBA                  gRPC
  ↓                      ↓
GIOP/IIOP              HTTP/2
  ↓                      ↓
TCP                    TCP
  ↓                      ↓
IP                     IP
```

## Resumo mental

``` text
RPC = abstração/modelo de chamada remota na camada de aplicação.

RPC não exige HTTP.

gRPC:
gRPC → HTTP/2 → TCP → IP

CORBA:
CORBA → GIOP/IIOP → TCP → IP
```

### Para lembrar 

-   **RPC é Layer 7** e abstrai uma chamada remota como uma chamada de
    função/método.
-   RPC é um **modelo/mecanismo**, não um único protocolo de transporte.
-   **HTTP não é obrigatório** em RPC.
-   **gRPC usa HTTP/2** como protocolo subjacente.
-   **CORBA usa ORBs** para intermediar chamadas entre objetos
    distribuídos.
-   **GIOP** define a comunicação entre ORBs.
-   **IIOP** leva GIOP sobre TCP/IP.
-   No CORBA clássico, a comunicação pode chegar ao **TCP sem passar por
    HTTP**.