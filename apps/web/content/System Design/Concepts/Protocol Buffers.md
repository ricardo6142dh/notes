---
tags:
  - course/system-design
  - topic/grpc
---

# Protocol Buffers (Protobuf)

Formato de serialização de dados desenvolvido pelo Google — **binário, compacto e fortemente tipado**. É o formato de serialização padrão do [[GRPC|gRPC]], mas pode ser usado independentemente.

## Por que não JSON?

| Aspecto | JSON | Protobuf |
|---|---|---|
| Formato | Texto (legível) | Binário (ilegível) |
| Tamanho | Maior | 3–10x menor |
| Velocidade de parse | Mais lento | Muito mais rápido |
| Schema | Opcional (dinâmico) | Obrigatório (`.proto`) |
| Tipos | Fraco (tudo string/number) | Forte (int32, float, bool, etc.) |
| Retrocompatibilidade | Manual | Suporte nativo via field numbers |

## Como funciona

Define os dados em um arquivo `.proto`:

```protobuf
syntax = "proto3";

message User {
  int32  id    = 1;
  string name  = 2;
  string email = 3;
}
```

O compilador `protoc` gera código para a linguagem alvo (Go, Java, Python, etc.) com serialização/deserialização já implementada.

## Serialização binária

Cada campo é codificado como `(field_number, type, value)`. O campo `id = 1` vira o tag `1`. Campos com valor zero ou vazio são omitidos — estruturas esparsas ficam compactas.

```
User { id: 42, name: "Alice" }
→ bytes: 08 2A 12 05 41 6C 69 63 65
```

## Retrocompatibilidade

Field numbers são a identidade do campo — não o nome. Adicionar novos campos com novos números não quebra clientes antigos (ignoram campos desconhecidos). Remover campos requer deprecar, não deletar — para não reusar o número.

## Quando usar

- Comunicação interna entre serviços ([[GRPC|gRPC]]) onde performance importa
- Dados que trafegam em alto volume (métricas, eventos, logs)
- Contratos de API que precisam evoluir sem quebrar clientes

## Quando não usar

- APIs públicas (JSON é mais acessível e debugável)
- Dados que precisam ser lidos por humanos
- Ambientes onde não é possível gerar código a partir do `.proto`
