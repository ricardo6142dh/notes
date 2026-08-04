---
tags:
  - course/system-design
  - topic/databases
  - topic/distributed-systems
---

# BASE

BASE significa **Basically Available** (Basicamente Disponível), **Soft state** (Estado Flexível) e **Eventual consistency** (Consistência Eventual).

### Basically Available (Basicamente Disponível)

O sistema garante [[Availability|disponibilidade]]. Se um usuário tenta ler dados, ele receberá uma resposta.

**Por dentro:** Em um sistema [[ACID]], se parte do banco está quebrada ou ocupada, o sistema pode responder com erro. Em um sistema BASE, o objetivo é sempre dar uma resposta.

Se o servidor principal com os dados mais atualizados estiver fora do ar, o sistema redireciona o usuário para um servidor de backup. Esse backup pode ter dados ligeiramente desatualizados, mas o sistema decide que é melhor mostrar _algo_ do que exibir uma página de erro.

### Soft State (Estado Flexível)

O estado do sistema pode mudar ao longo do tempo, mesmo sem novas entradas de dados.

**Por dentro:** Em um sistema bancário estrito, o saldo só muda quando uma transação acontece. Em um sistema BASE, os dados estão constantemente "se acomodando."

Como os dados são replicados por vários servidores, o "estado" real dos dados é fluido até que todas as cópias se alinhem. O sistema não promete que os dados vistos agora são a verdade absoluta e congelada.

### Eventual Consistency (Consistência Eventual)

A parte mais importante do acrônimo BASE. Significa que, se o sistema parar de receber entradas, eventualmente todos os servidores vão se sincronizar e ter os mesmos dados.

**Por dentro:** Pense em publicar uma foto no Instagram. Você clica em "postar" e ela aparece no seu celular instantaneamente. Porém, seu amigo ao lado pode não ver a foto no feed dele por mais 10 segundos.

O sistema não travou o feed de todos para atualizar instantaneamente — isso derrubaria a internet. Em vez disso, a atualização se propagou primeiro para o servidor local e depois lentamente se espalhou para os servidores na região do seu amigo.

O sistema promete que os dados _eventualmente_ ficarão consistentes. Pode levar milissegundos ou segundos, mas vai acontecer.
