# 💬 Playbook de Pós-Venda, Entrega e Recuperação de Vendas
### Heróis da Multiplicação & Missão Tabuada

Este documento reúne toda a esteira de atendimento ao cliente, scripts de mensagens automáticas de WhatsApp, recuperação de PIX abandonado e processo de entrega de infoproduto.

---

## 🎯 1. Fluxo de Compra Aprovada (Boas-vindas Imediata)

**Gatilho:** Assim que o pagamento (PIX ou Cartão) é confirmado no ggCheckout.  
**Objetivo:** Reduzir ansiedade dos pais, garantir acesso imediato ao material e evitar chargebacks/pedidos de reembolso.

```markdown
*Assunto/Header:* 🎉 Seja bem-vindo(a) à Liga dos Heróis da Matemática!

Olá, {nome}! Tudo bem? 🦸‍♂️✨

Aqui é da equipe de suporte oficial dos *Heróis da Multiplicação*.

Passando para confirmar que o seu acesso à *Missão Tabuada* foi liberado com sucesso!

📥 *Seus links de acesso imediato:*
👉 Livro Digital Completo (PDF): {link}
👉 Webapp Gamificado com Cronômetro: https://xavier2bit.github.io/missao-tabuada/

📌 *Primeiro passo recomendado para hoje:*
1. Baixe o PDF e imprima o **Rastreador de Conquistas (Página 3)** para colar na geladeira.
2. Separe apenas 15 minutinhos leves com seu filho antes do jantar ou de dormir.

Se precisar de qualquer ajuda para abrir o arquivo ou imprimir, pode responder direto a esta mensagem que nossa equipe te ajuda!

Bons estudos e bem-vindo(a) à nossa liga! 🚀
```

---

## ⏰ 2. Fluxo de Recuperação: PIX Gerado e Não Pago (Minuto 15)

**Gatilho:** 15 minutos após a geração do PIX no checkout sem identificação de pagamento.  
**Objetivo:** Reengajamento imediato enquanto o lead ainda está no celular/computador.

```markdown
Oi, {nome}! Tudo bem? Vi que você tentou garantir a vaga do seu filho na *Liga dos Heróis da Matemática*, mas o PIX ainda não foi concluído. 🦸‍♂️

Aconteceu alguma instabilidade no seu aplicativo de banco ou o código expirou?

Se quiser, você pode gerar um novo código ou concluir o seu acesso pelo link seguro abaixo:
👉 {link}

Se tiver qualquer dúvida sobre o material ou como funciona a rotina de 15 minutos, me avisa aqui que te ajudo agora mesmo!
```

---

## 🚨 3. Fluxo de Recuperação: Última Chamada PIX (Minuto 60 / 2 Horas)

**Gatilho:** 1 a 2 horas após a geração do PIX.  
**Objetivo:** Senso de urgência suave e reforço do benefício emocional (acabar com o estresse da tabuada).

```markdown
{nome}, passando rapidinho para te avisar! ⏳

O valor promocional de apenas R$ 10 da *Missão Tabuada* e os bônus do kit completo estão reservados para você só até o final do dia.

Lembrando que o material é 100% digital, com 43 páginas preenchíveis e acesso vitalício ao webapp com cronômetro interativo.

👉 Para liberar o acesso do seu filho agora: {link}

Posso te ajudar a concluir por aqui?
```

---

## 📦 4. Fluxo de Pós-Venda & Onboarding (Dia 3)

**Gatilho:** 72 horas após a compra.  
**Objetivo:** Garantir consumo do produto, engajamento e plantar a semente para o Upsell de novos desafios.

```markdown
Olá, {nome}! Como vocês estão? 🌟

Passando para saber: seu filho já fez a primeira missão da tabuada? Já colaram o rastreador na geladeira? 🎨

Uma dica rápida de muitas famílias: se ele estiver inseguro nas contas do 7 ou do 8, use os desafios cronometrados do Webapp! O som dos confetes e acertos faz toda a diferença para destravar o cálculo mental sem estresse.

Se estiver precisando de suporte ou tiver qualquer sugestão, estamos à disposição! 🦸‍♀️
```

---

## ⚙️ 5. Como Ativar o Envio Automático no ggCheckout

1. Acesse seu painel em [app.ggcheckout.com](https://app.ggcheckout.com).
2. Vá em **WhatsApp > Conectar Sessão** e escaneie o QR Code com o número de WhatsApp do suporte da sua operação (`21993923582` ou chip dedicado).
3. Após conectado, o MCP do ggCheckout identificará a sessão automaticamente e criará os templates de eventos `paid`, `recovery_pix_unpaid` e `recovery_pix_expired` com os textos acima.
