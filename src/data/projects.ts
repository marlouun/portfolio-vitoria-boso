const imageBase = import.meta.env.BASE_URL;

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  statement: string;
  cover: string;
  coverAlt: string;
  coverCaption: string;
  gallery: ProjectImage[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'entre-linhas',
    title: 'Entre Linhas',
    category: 'futebol / movimento',
    description:
      'A quadra acesa no meio da noite transforma um jogo comum em cena. A série alterna explosão e espera: o chute, o corpo em deslocamento e a pausa antes da próxima jogada. O interesse não está apenas no esporte, mas na atmosfera que existe ao redor dele.',
    statement: 'Movimento também tem silêncio.',
    cover: `${imageBase}images/vitoria/futebol/capa.webp`,
    coverAlt: 'Jogador de camisa vermelha visto de costas sob a luz da quadra',
    coverCaption: 'Entre Linhas • série documental',
    gallery: [
      {
        src: `${imageBase}images/vitoria/futebol/movimento.webp`,
        alt: 'Jogador de futebol chutando a bola em direção ao gol',
      },
    ],
  },
  {
    id: 2,
    slug: 'fe-em-silencio',
    title: 'Fé em Silêncio',
    category: 'rito / presença',
    description:
      'Entre velas, gestos e símbolos, a câmera acompanha a experiência da fé sem interrompê-la. É um olhar atento ao que acontece entre o rito e o silêncio — pequenos movimentos, luz baixa, devoção e presença.',
    statement: 'O sagrado também mora nos gestos pequenos.',
    cover: `${imageBase}images/vitoria/igreja/capa.webp`,
    coverAlt: 'Altar iluminado por velas visto entre pessoas em primeiro plano',
    coverCaption: 'Fé em Silêncio • ensaio documental',
    gallery: [
      {
        src: `${imageBase}images/vitoria/igreja/rosario.webp`,
        alt: 'Mãos segurando um terço em silhueta contra o céu',
      },
    ],
  },
  {
    id: 3,
    slug: 'agua-luz-e-comeco',
    title: 'Água, Luz e Começo',
    category: 'batizado / afeto',
    description:
      'Um começo contado por detalhes: a água, a vela, os olhares da família e a curiosidade de uma criança diante de um rito que um dia será memória. A fotografia preserva o afeto sem transformar o momento em pose.',
    statement: 'Há memórias que começam antes de serem lembradas.',
    cover: `${imageBase}images/vitoria/batizado/capa.webp`,
    coverAlt: 'Bebê durante o rito do batismo com água e uma vela acesa ao fundo',
    coverCaption: 'Água, Luz e Começo • batizado',
    gallery: [
      {
        src: `${imageBase}images/vitoria/batizado/familia.webp`,
        alt: 'Bebê no colo da família durante a celebração do batizado',
      },
    ],
  },
];
