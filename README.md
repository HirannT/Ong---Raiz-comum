# Instituto Raiz Comum — Plataforma Web para ONGs

Projeto da disciplina (UNICSUL) — **Entrega II: CSS3, Design System e Layout Responsivo**.

Plataforma institucional para a ONG fictícia *Instituto Raiz Comum*: divulgação de projetos, captação de doações e cadastro de voluntários.

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Hero, impacto (estatísticas), missão, projetos em destaque, como ajudar, depoimentos, CTA, modal de newsletter |
| `projetos.html` | Breadcrumb, barra lateral com busca e filtros, cards de projeto (horizontal e grid), badges, tags, alerta, modal de detalhes |
| `cadastro.html` | Formulário de voluntário/doador com validação visual, máscaras, alertas, toast e modal de sucesso |

## Estrutura de pastas

```
projetoOng/
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   ├── main.css               ← ponto de entrada (importa todos os módulos)
│   ├── base/
│   │   ├── variables.css      ← design system (cores, fontes, espaçamentos)
│   │   ├── reset.css
│   │   └── typography.css
│   ├── layout/
│   │   ├── grid.css           ← grid customizado de 12 colunas
│   │   ├── layout.css         ← estrutura geral + layouts por tipo de conteúdo
│   │   ├── header.css         ← navegação, dropdown e menu hambúrguer
│   │   └── footer.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── badges.css
│   │   ├── forms.css
│   │   └── feedback.css       ← alerts, toasts e modals
│   └── utilities.css
├── js/
│   └── main.js                ← menu, modais, toasts, filtros, validação
└── images/                    ← ilustrações SVG e logo
```

## Como os requisitos foram atendidos

### Sistema de Design (`css/base/variables.css`)
- **Variáveis CSS** para todas as decisões visuais.
- **Paleta com 16 cores**: 3 primárias (laranja), 3 secundárias (verde), 6 neutras e 4 semânticas (sucesso, alerta, erro, info).
- **Tipografia com 8 tamanhos**: `--fs-xs` (12px) até `--fs-4xl` (até 80px, fluido com `clamp`). Fontes Archivo (títulos) e Inter (texto).
- **Espaçamento modular**: `--space-1` 8px · `--space-2` 16px · `--space-3` 24px · `--space-4` 32px · `--space-6` 48px · `--space-8` 64px.

### Layout com Grid e Flexbox
- **CSS Grid na estrutura geral**: `.page` com `grid-template-areas` (header / main / footer).
- **Grid de 12 colunas**: `.grid` + `.col-{n}`, `.col-sm-{n}`, `.col-md-{n}`, `.col-lg-{n}`, `.col-xl-{n}`, `.col-xxl-{n}`.
- **Flexbox** em componentes: navegação, botões, cards, alertas, toasts, formulários.
- **5 breakpoints** (mobile-first): `480px` sm · `768px` md · `1024px` lg · `1280px` xl · `1536px` xxl.
- **Layouts específicos**: hero em 2 colunas, `layout-sidebar` (projetos), `layout-form` (cadastro), `grid-auto` para cards, `stats`, `steps`, `cta-band`.

### Navegação
- Menu principal com **submenus dropdown** (abre por hover, foco de teclado ou clique; fecha com Esc).
- Abaixo de 1024px vira **menu hambúrguer** com painel lateral animado e submenus em acordeão.

### Componentes
- **Cards**: padrão, horizontal, destaque, ícone, escuro, depoimento, com barra de progresso.
- **Botões**: primary, secondary, outline, light, ghost, danger; tamanhos sm/lg/block; estados **hover, focus, active, disabled** e loading.
- **Formulários**: inputs, select, textarea, checkbox/rádio customizados, chips; **validação visual** com `:user-invalid` / `:user-valid` e mensagens de erro.
- **Feedback**: alerts (success, warning, error, info), **toasts** e **modals** (`<dialog>`).
- **Badges e tags**: categorias (educação, meio ambiente, saúde…), status (ativo, urgente, novo, concluído) e tags `#`.

### Acessibilidade
Link "pular para o conteúdo", foco visível, `aria-expanded`/`aria-current`, rótulos em todos os campos, contraste adequado, área de toque ≥ 44px e respeito a `prefers-reduced-motion`.

## Publicação no GitHub Pages
1. Crie um repositório **público** e envie todos os arquivos desta pasta.
2. Em *Settings → Pages*, escolha a branch `main` e a pasta `/ (root)`.
3. O site ficará em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.
