# Portfolio Vitoria Boso

Projeto de portfolio/landing page feito com React, Vite, TypeScript, Tailwind CSS e animacoes com Framer Motion.

## Rodar no VS Code

```bash
npm install
npm run dev
```

Depois abra:

```txt
http://localhost:5173
```

## Publicar no GitHub Pages

Este projeto ja esta configurado para GitHub Pages usando GitHub Actions.

No GitHub, va em:

```txt
Settings > Pages > Build and deployment
```

Selecione:

```txt
Source: GitHub Actions
```

Depois faca commit e push normalmente. O GitHub vai executar o workflow em:

```txt
.github/workflows/deploy.yml
```

O site final ficara em:

```txt
https://marlouun.github.io/portfolio-vitoria-boso-pronto/
```

## Configuracao importante

No arquivo `vite.config.ts`, existe esta configuracao:

```ts
base: '/portfolio-vitoria-boso-pronto/',
```

Ela e obrigatoria para o GitHub Pages carregar corretamente os arquivos CSS e JavaScript.

Se o nome do repositorio mudar, mude essa linha tambem.

## Editar conteudo

- `src/data/profile.ts`: informacoes principais da Vitoria
- `src/data/projects.ts`: projetos/trabalhos
- `src/data/gallery.ts`: imagens da galeria
- `public/images/`: fotos e imagens do site

## Gerar build manual

```bash
npm run build
```

A pasta final sera:

```txt
dist/
```
