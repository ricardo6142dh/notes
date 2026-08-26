---
tags:
  - course/system-design
  - topic/databases
  - topic/transactions
---

# ACID

- [[Atomicity|Atomicidade]] — cada instrução dentro de uma transação (leitura, escrita, atualização ou exclusão) é tratada como uma unidade única. Ou a instrução inteira é executada, ou nada é executado. Essa propriedade evita perda e corrupção de dados — por exemplo, se uma fonte de dados falhar no meio do processo.

- [[Consistency|Consistência]] — garante que transações só realizem mudanças nas tabelas de formas predefinidas e previsíveis. A consistência transacional assegura que erros ou corrupções nos dados não comprometam a integridade da tabela.

- [[Isolation|Isolamento]] — quando múltiplos usuários leem e escrevem na mesma tabela ao mesmo tempo, o isolamento das transações garante que elas não interfiram nem afetem umas às outras. Cada requisição ocorre como se fosse a única, mesmo que estejam acontecendo simultaneamente.

- [[Durability|Durabilidade]] — garante que as mudanças nos dados realizadas por transações executadas com sucesso sejam salvas, mesmo em caso de falha do sistema.
