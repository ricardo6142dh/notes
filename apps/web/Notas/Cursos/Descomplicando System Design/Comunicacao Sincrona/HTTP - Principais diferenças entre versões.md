

## Visão geral


| Versão | Transporte | Conexão persistente | Multiplexação | Formato | Compressão de Headers |
|---|---|---|---|---|---|
| HTTP/1.0 | TCP | Não por padrão | Não | Texto | Não |
| HTTP/1.1 | TCP | Sim | Não | Texto | Não |
| HTTP/2 | TCP | Sim | Sim | Binário | HPACK |
| HTTP/3 | QUIC sobre UDP | Sim | Sim | Binário | QPACK 

## HTTP/1.0

-   Modelo simples: **uma conexão TCP por request**.
-   Cada novo recurso pode exigir um novo handshake TCP.
-   Alto custo quando uma página possui muitos recursos.

``` text
TCP connect
GET /index.html
response
TCP close
```

## HTTP/1.1

Principal evolução: **conexões persistentes (keep-alive)**.

-   Vários requests podem reutilizar a mesma conexão TCP.
-   Não possui multiplexação real.
-   Browsers normalmente usam várias conexões TCP por origin para obter
    paralelismo.
-   HTTP pipelining existiu, mas teve pouco uso prático.

``` text
Browser
 ├── TCP #1 → requests
 ├── TCP #2 → requests
 ├── TCP #3 → requests
 └── ...
```

**Ideia-chave:** reutilizar conexões TCP.

## HTTP/2

Principal evolução: **multiplexação**.

-   Uma única conexão TCP pode transportar vários **streams HTTP
    simultaneamente**.
-   Mensagens são divididas em **frames binários**.
-   Frames de diferentes streams podem ser intercalados.
-   Headers são comprimidos usando **HPACK**.
-   Reduz a necessidade de várias conexões TCP.

``` text
             TCP connection
Browser ───────────────────────── Server
             ├── Stream 1 → HTML
             ├── Stream 3 → CSS
             ├── Stream 5 → JS
             └── Stream 7 → API
```

### Limitação: TCP Head-of-Line Blocking

Todos os streams continuam sobre **uma única conexão TCP**.

Se um pacote TCP é perdido, o TCP precisa recuperar esse dado antes de
entregar os bytes seguintes à camada HTTP. Isso pode atrasar múltiplos
streams HTTP/2.

**Ideia-chave:** multiplexar vários requests sobre uma única conexão
TCP.

## HTTP/3

Principal evolução: substituir TCP por **QUIC**.

``` text
HTTP/1.1 → TCP
HTTP/2   → TCP
HTTP/3   → QUIC → UDP
```

QUIC fornece:

-   Streams independentes.
-   Confiabilidade.
-   Controle de congestionamento.
-   TLS integrado ao protocolo.
-   Estabelecimento de conexão mais eficiente.
-   Possibilidade de 0-RTT em reconexões apropriadas.

Uma perda de dados em um stream não bloqueia os demais streams como
ocorre no HTTP/2 por causa da ordenação global do TCP.

``` text
Stream 1 ───────────────→
Stream 3 ─── X ─ recover
Stream 5 ───────────────→
Stream 7 ───────────────→
```

**Ideia-chave:** manter multiplexação sem depender do TCP.

## Resumo mental

``` text
HTTP/1.0
uma conexão por request
        ↓
HTTP/1.1
reutilização da conexão TCP
        ↓
HTTP/2
multiplexação de streams sobre uma TCP
        ↓
HTTP/3
multiplexação sobre QUIC/UDP
```

### Para lembrar em System Design / SRE

-   **HTTP/1.1 → Keep-Alive**
-   **HTTP/2 → Multiplexação + TCP**
-   **HTTP/3 → Multiplexação + QUIC/UDP**
-   **Problema central do HTTP/2 → TCP Head-of-Line Blocking**
