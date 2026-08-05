---
tags:
  - course/system-design
  - topic/microservices
---

# Microsserviços

Estilo arquitetural onde uma aplicação é decomposta em **serviços pequenos, independentes e implantáveis separadamente**, cada um responsável por um domínio de negócio específico e se comunicando via APIs bem definidas.

## Monólito vs Microsserviços

| Aspecto | Monólito | Microsserviços |
|---|---|---|
| Deploy | Toda aplicação de uma vez | Serviços independentes |
| Escala | Escala tudo junto | Escala só o que precisa |
| Falha | Uma falha pode derrubar tudo | Falhas isoladas |
| Desenvolvimento | Simples no início | Overhead de infra desde o início |
| Consistência de dados | Transações ACID nativas | Consistência eventual entre serviços |

## Características de um bom microsserviço

- **Responsabilidade única:** Faz uma coisa bem — alinhado a um domínio (ex: pagamentos, notificações, autenticação).
- **Banco de dados próprio:** Cada serviço tem seu próprio banco — sem compartilhamento de schema.
- **Comunicação via API:** [[HTTP & REST]], [[GRPC|gRPC]] ou mensageria assíncrona.
- **Implantação independente:** Pode ser deployado sem coordenar com outros times.

## Padrões comuns

### API Gateway
Ponto de entrada único que roteia requisições aos serviços corretos, agrega respostas e lida com autenticação. Ver [[API Gateway]].

### Service Discovery
Serviços se registram em um registry (ex: Consul, [[System Design/Concepts/Kubernetes]] DNS) e se encontram dinamicamente — sem IPs hardcoded.

### Circuit Breaker
Quando um serviço dependente falha repetidamente, o circuit breaker "abre" e para de chamar o serviço — retornando fallback ou erro imediato. Evita cascata de falhas.

### Saga Pattern
Para transações que atravessam múltiplos serviços (sem transações distribuídas), cada serviço executa sua parte e publica eventos. Em caso de falha, executa transações compensatórias.

## Desafios

- **Complexidade operacional:** Muitos serviços para monitorar, deployar e depurar.
- **Latência de rede:** Chamadas entre serviços adicionam latência vs chamada de função local.
- **Consistência de dados:** Sem transações ACID globais — requer Saga, eventual consistency.
- **Testes de integração:** Mais difícil testar fluxos que cruzam múltiplos serviços.

## Quando usar

Microsserviços fazem sentido quando: equipes diferentes precisam deployar de forma independente, serviços têm requisitos de escala muito diferentes, ou a complexidade do domínio justifica a separação.

Para projetos novos ou equipes pequenas, comece com monólito bem estruturado — microsserviços prematuros adicionam complexidade sem benefício.
