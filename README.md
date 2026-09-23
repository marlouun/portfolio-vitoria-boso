# Portfólio Vitória Boso

Landing page de portfólio desenvolvida com React, Vite, TypeScript e Tailwind CSS.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GitHub Pages
- GitHub Actions

## Rodar localmente

Requisitos: Node.js 22 e npm.

```bash
npm install
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:5173
```

## Validar a versão de produção

```bash
npm run build
npm run preview
```

O build final é gerado na pasta `dist/`.

## GitHub Pages

O deploy é feito automaticamente pelo workflow:

```txt
.github/workflows/deploy.yml
```

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

Isso mantém os assets relativos ao caminho em que a aplicação é publicada.

## Editar conteúdo

Os dados principais ficam separados da interface:

- `src/data/profile.ts`: nome, apresentação e canais de contato
- `src/data/projects.ts`: projetos e trabalhos
- `src/data/gallery.ts`: itens da galeria
- `public/images/`: imagens utilizadas pelo site

## Performance e acessibilidade

O projeto utiliza animações em CSS e `IntersectionObserver`, imagens secundárias com carregamento preguiçoso e suporte a `prefers-reduced-motion`.

Para imagens reais, prefira arquivos otimizados, como WebP, dimensionados de acordo com o uso no layout.
