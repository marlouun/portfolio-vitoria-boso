# Frames by Vi — Vitória Boso

Portfólio de fotografia autoral e documental de Vitória Boso. A landing page foi estruturada para apresentar os projetos como histórias visuais, com foco em atmosfera, gesto, luz, memória e afeto.

## Projetos em destaque

- **Entre Linhas** — futebol, movimento e espera sob a luz noturna;
- **Fé em Silêncio** — rito, devoção e pequenos gestos;
- **Água, Luz e Começo** — batizado, família e memória afetiva.

As fotografias usadas no site ficam em `public/images/vitoria/` e o conteúdo editorial dos projetos em `src/data/projects.ts`.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GitHub Pages
- GitHub Actions

## Rodar localmente

Requisitos: Node.js 22, Corepack e pnpm 9.15.4.

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
pnpm install
pnpm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:5173
```

## Validar a versão de produção

```bash
pnpm run build
pnpm run preview
```

O build final é gerado na pasta `dist/`.

## GitHub Pages

O workflow `.github/workflows/deploy.yml` valida o build em pull requests e publica no GitHub Pages somente após mudanças na `main`.

No GitHub, configure:

```txt
Settings > Pages > Build and deployment > Source: GitHub Actions
```

Endereço do projeto:

```txt
https://marlouun.github.io/portfolio-vitoria-boso/
```

O `vite.config.ts` utiliza:

```ts
base: './',
```

## Editar conteúdo

- `src/data/profile.ts`: posicionamento, textos principais e Instagram;
- `src/data/projects.ts`: títulos, textos curatoriais e seleção de imagens;
- `public/images/vitoria/`: fotografias otimizadas utilizadas no portfólio;
- `src/index.css`: identidade visual editorial e comportamento responsivo.

## Performance e acessibilidade

O projeto utiliza animações em CSS e `IntersectionObserver`, imagens secundárias com carregamento preguiçoso, arquivos WebP otimizados e suporte a `prefers-reduced-motion`.

## Dependências

O projeto usa pnpm no desenvolvimento e no CI. O lockfile npm anterior foi removido porque continha URLs de um registry interno, inadequadas para instalação no GitHub Actions.
