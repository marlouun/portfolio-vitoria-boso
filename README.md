# Portfolio Vitoria Boso

Projeto de portfolio/landing page feito com React, Vite, TypeScript e Tailwind CSS.

Esta versao foi otimizada para ficar mais leve no navegador:

- removida a dependencia `framer-motion`
- animacoes principais feitas com CSS e IntersectionObserver
- imagens com `loading="lazy"` e `decoding="async"`
- menos blur/sombra pesada no mobile
- build testado com `npm run build`
- configuracao pronta para GitHub Pages

## Rodar no VS Code

```bash
npm install
npm run dev
```

Depois abra:

```txt
http://localhost:5173
```

## Testar a versao final localmente

```bash
npm run build
npm run preview
```

Depois abra o endereco que aparecer no terminal.

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

## Dica para imagens reais

Quando trocar os bonequinhos por fotos reais, evite imagens muito grandes. O ideal e exportar em `.webp` com tamanho entre 800px e 1400px de largura, dependendo do uso.
