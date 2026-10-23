# Gerador de Currículos

Aplicação web completa que funciona como um **assistente inteligente de criação de currículo**: conduz o usuário por etapas, faz perguntas condicionais, entende o perfil profissional e monta automaticamente um currículo claro, profissional e compatível com ATS, adequado ao mercado brasileiro (com foco em Iguatu/CE e região).

Ideal para primeiro emprego, Jovem Aprendiz, estágio, ensino médio/técnico e profissionais de nível médio (comércio, atendimento, vendas, administrativo, serviços gerais, estoque, logística e informática).

---

## ✨ Funcionalidades

- **Assistente por etapas** — não é um formulário gigante: são 10 etapas com barra de progresso, avançar/voltar e edição de etapas anteriores.
- **Perguntas condicionais** — fluxo específico para primeiro emprego (projetos, voluntariado, negócio da família, trabalho informal) e para quem tem experiência.
- **Biblioteca de cargos** — 30+ cargos reais do mercado de Iguatu/CE (baseados no IDT/SINE), cada um com competências, palavras-chave, cursos sugeridos, objetivos e resumos.
- **Subáreas do mesmo cargo** — ex.: Técnico de Informática (manutenção, suporte, redes, sistemas...).
- **Transformação de linguagem** — o usuário escreve do jeito dele ("eu atendia clientes e organizava a loja") e o sistema reformula em texto profissional ("Atendimento ao cliente e ao público, organização e limpeza do ambiente de trabalho...") com regras locais em JavaScript — **sem inventar atividades**.
- **Currículo adaptado à vaga** — ordem das seções, competências priorizadas e cursos selecionados mudam conforme o cargo.
- **Objetivo e resumo automáticos** — gerados pelo banco de textos por cargo, editáveis.
- **Modo otimizar** — sugere reduzir competências, cursos e experiências pouco relevantes, com botões "Aplicar" / "Manter como está".
- **Diagnóstico sem notas subjetivas** — checklist de completude + recomendações concretas.
- **Prévia em tempo real** — formulário à esquerda, currículo à direita (atualiza a cada tecla).
- **Salvamento automático** — tudo no `localStorage`; ao voltar, pergunta se deseja continuar. Botão "Limpar meus dados" com confirmação.
- **PDF em A4** — via html2pdf.js (CDN), nome do arquivo `Curriculo_Nome_Sobrenome.pdf`, com fallback para impressão.
- **Impressão** — `@media print` imprime somente o currículo.
- **Versões por cargo** — crie vários currículos reutilizando a mesma base de dados.
- **Modo claro/escuro** — o PDF/impressão continuam sempre em fundo branco.
- **Acessibilidade** — labels, navegação por teclado, foco visível, contraste, `aria-label`, `prefers-reduced-motion`.
- **100% offline após carregar** — sem backend, sem banco de dados, sem cadastro.

## 🚫 O que o sistema NUNCA coloca no currículo

CPF, RG, nome dos pais, estado civil, endereço completo, data de nascimento, barras de porcentagem, estrelas, gráficos, hobbies aleatórios, frases motivacionais ou qualquer informação inventada.

## 🛠 Tecnologias

- HTML5, CSS3, JavaScript puro (sem build, sem npm, sem backend)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) via CDN (única dependência)
- Google Fonts (Inter) via CDN
- `localStorage` para persistência

## ▶️ Execução local

Basta abrir `index.html` no navegador. Para servir localmente (opcional):

```bash
# Qualquer servidor estático funciona, ex.:
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## 🌐 Publicação no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos mantendo a estrutura de pastas.
3. Em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`.
4. Salve. O site fica disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.

## 📁 Estrutura

```
gerador-curriculos/
├── index.html
├── css/
│   ├── style.css
│   └── print.css
├── js/
│   ├── app.js        # Wizard, validação, navegação
│   ├── data.js       # Mercado local, biblioteca de cargos, competências
│   ├── templates.js  # Banco de textos e transformação de linguagem
│   ├── resume.js     # Montagem do currículo, diagnóstico, otimização
│   ├── pdf.js        # Geração de PDF
│   └── storage.js    # Persistência local
├── assets/
│   └── favicon.svg
└── README.md
```

## 🔧 Atualização de cargos e templates

- **Cargos:** edite o array `roleLibrary` em `js/data.js`. Cada cargo tem `id`, `title`, `category`, `competencies`, `keywords`, `knowledge`, `courses`, `activities`, `objectives` e `summaries`.
- **Mercado local:** edite o objeto `localMarket` em `js/data.js` (`commonRoles`, `commonSkills`, `sources`).
- **Competências:** arrays `skillBank`, `technicalSkills`, `behavioralSkills` e `situationalQuestions` em `js/data.js`.
- **Textos/transformações:** regras em `js/templates.js` (`activityRules`, `colloquialFixes`).

## 📊 Pesquisa de mercado

Dados pesquisados em **17/09/2026**:

- **IDT/SINE — vagas disponíveis** (idt.org.br/vagas-disponiveis), incluindo a Unidade de Atendimento de Iguatu (Rua Floriano Peixoto, 474 — vagas.iguatu@idt.org.br): vendedor interno, vendedor porta a porta, repositor em supermercados, recepcionista atendente, auxiliar administrativo, auxiliar financeiro, alimentador/auxiliar de linha de produção, atendente de farmácia (balconista), consultor/promotor de vendas, telemarketing, porteiro, atendente de lanchonete, auxiliar de limpeza, pedreiro, servente de obras, soldador, entre outros.
- **Indeed — vagas em Iguatu, CE**: vendedor/atendente (Magalu — atendimento, organização de loja, precificação, pós-venda).
- **Guias de currículo 2026** (boas práticas ATS): beavagas.com.br, napratica.org.br, Serasa Experian Carreiras, enhancv.com.

> Os cargos e competências da biblioteca foram definidos a partir dessas fontes. Para atualizar, refaça a consulta nas fontes acima e ajuste `js/data.js`.

## ⚠️ Limitações

- A transformação de linguagem usa regras locais (regex + templates); textos muito fora do padrão são apenas limpos e capitalizados.
- O PDF depende do CDN do html2pdf.js na primeira carga; se indisponível, o sistema usa a impressão nativa do navegador.
- Os dados ficam apenas no navegador usado (localStorage) — limpar os dados do site apaga o currículo salvo.
- Não há envio por e-mail/WhatsApp (por design: nenhum dado sai do navegador).

## 🔒 Privacidade

Seus dados ficam neste navegador. Nada é enviado a servidores. Não coletamos CPF, senhas, dados bancários ou documentos.
