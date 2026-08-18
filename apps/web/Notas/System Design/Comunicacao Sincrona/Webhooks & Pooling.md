---
tags:
  - course/system-design
  - topic/communication
  - topic/synchronous-communication
  - topic/webhooks
---

# Webhooks & Polling

### 1. Webhooks (Inversão do Fluxo)

Diferente de uma API tradicional onde o cliente solicita dados, o **Webhook** inverte esse papel: o servidor envia os dados ao cliente assim que um evento específico ocorre.

- **Funcionamento:** O cliente fornece uma **URL previamente informada** ao servidor. Quando ocorre uma mudança de status ou uma ação (como um pagamento concluído), o servidor realiza uma requisição síncrona para essa URL com as informações necessárias.
- **Vantagem:** Elimina a necessidade de o cliente ficar consultando o servidor desnecessariamente, economizando recursos e reduzindo atrasos na detecção de mudanças.
- **Exemplo:** Um sistema de e-commerce que fornece uma URL para um parceiro de pagamentos. O parceiro notifica o e-commerce assim que o Pix é pago, em vez de o e-commerce ter que perguntar repetidamente se o dinheiro caiu.

---

### 2. Polling (Sondagem)

O termo correto para essa técnica é **Polling** (e não "pooling"). As fontes descrevem o **polling síncrono periódico**, que é a base do que o mercado chama de _Short Polling_.

#### **Short Polling (Sondagem Periódica)**

- **Funcionamento:** O cliente realiza **solicitações periódicas** ao servidor de tempos em tempos para verificar se há novas informações.
- **Problemas:** Se as atualizações não forem frequentes, o sistema acaba **desperdiçando recursos** com requisições que não retornam nada novo e pode gerar **atrasos** na detecção de mudanças se o intervalo entre as consultas for muito longo.
- **Analogia:** É como você ir até a sua caixa de correio várias vezes ao dia para checar se uma encomenda chegou.

#### **Long Polling**

Embora as fontes fornecidas não detalhem explicitamente o mecanismo técnico do _Long Polling_, elas mencionam o **Polling** como a técnica de "espera ativa" onde o cliente aguarda a resposta do servidor para manter-se atualizado. No _Long Polling_ (informação externa para contexto adicional), o servidor mantém a conexão aberta até que tenha dados novos para enviar ou até que um timeout ocorra, reduzindo o número de requisições vazias comparado ao _Short Polling_.

---

### 📊 Comparação Analógica (O Livro no E-commerce)

As fontes utilizam uma analogia lúdica para diferenciar esses comportamentos:

- **Polling (Short Polling):** Você compra um livro e, ansioso, vai ao portão checar a caixa de correio a cada 10 minutos. Você gasta energia (processamento) e tempo, mesmo que o carteiro ainda não tenha passado.
- **Webhook:** Você compra o livro e continua suas tarefas normais. O entregador toca a sua campainha (o "evento") e entrega o pacote em mãos. Você só age quando é notificado.

### Resumo de Escolha

- **Use Polling:** Quando o cliente não tem uma URL pública acessível para receber notificações ou quando o controle da frequência de consulta deve ser estritamente do cliente.
- **Use Webhooks:** Para sistemas que precisam de **atualizações contínuas** e eficientes, evitando carga desnecessária tanto no cliente quanto no servidor.

Gostaria que eu criasse um **relatório detalhado** ou um **conjunto de flashcards** sobre esses padrões de comunicação para te ajudar a estudar?
