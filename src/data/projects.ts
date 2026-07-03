const imageBase = import.meta.env.BASE_URL;

export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  highlight: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Ensaio Criativo',
    category: 'Fotografia',
    description: 'Projeto visual com direção delicada, luz natural e composição pensada para destacar personalidade.',
    image: `${imageBase}images/projects/projeto-1.svg`,
    highlight: 'Direção visual',
  },
  {
    id: 2,
    title: 'Campanha Social',
    category: 'Conteúdo digital',
    description: 'Sequência de peças para redes sociais com linguagem moderna, forte presença visual e identidade consistente.',
    image: `${imageBase}images/projects/projeto-2.svg`,
    highlight: 'Social media',
  },
  {
    id: 3,
    title: 'Editorial Minimalista',
    category: 'Design',
    description: 'Construção de layout limpo, elegante e focado em imagens para apresentação de trabalhos autorais.',
    image: `${imageBase}images/projects/projeto-3.svg`,
    highlight: 'Layout premium',
  },
];
