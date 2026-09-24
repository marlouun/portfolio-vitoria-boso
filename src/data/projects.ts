const imageBase = import.meta.env.BASE_URL;

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  highlight: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'entre-linhas',
    title: 'Entre Linhas',
    category: 'Fotografia esportiva',
    description:
      'Um ensaio que acompanha o ritmo da partida sem perder os instantes de pausa. Movimento, luz noturna e expressão se misturam para mostrar o jogo para além do placar.',
    image: `${imageBase}images/vitoria/futebol/IMG_0504.JPG.jpeg`,
    highlight: 'Movimento • luz • atmosfera',
    gallery: [
      `${imageBase}images/vitoria/futebol/IMG_0501.PNG`,
      `${imageBase}images/vitoria/futebol/IMG_0502.PNG`,
      `${imageBase}images/vitoria/futebol/IMG_0503.JPG.jpeg`,
      `${imageBase}images/vitoria/futebol/IMG_0504.JPG.jpeg`,
      `${imageBase}images/vitoria/futebol/IMG_0505.JPG.jpeg`,
    ],
  },
  {
    id: 2,
    slug: 'fe-em-detalhes',
    title: 'Fé em Detalhes',
    category: 'Fotografia documental',
    description:
      'Registros de uma celebração religiosa com atenção aos gestos, símbolos e à luz do ambiente. A proposta é preservar a atmosfera do momento sem interferir no que acontece.',
    image: `${imageBase}images/vitoria/igreja/IMG_7675.JPEG`,
    highlight: 'Rito • silêncio • presença',
    gallery: [
      `${imageBase}images/vitoria/igreja/IMG_0606.JPG.jpeg`,
      `${imageBase}images/vitoria/igreja/IMG_0614.JPG.jpeg`,
      `${imageBase}images/vitoria/igreja/IMG_1034.JPG.jpeg`,
      `${imageBase}images/vitoria/igreja/IMG_7661.JPEG`,
      `${imageBase}images/vitoria/igreja/IMG_7663.JPEG`,
      `${imageBase}images/vitoria/igreja/IMG_7667.JPEG`,
      `${imageBase}images/vitoria/igreja/IMG_7672.JPEG`,
      `${imageBase}images/vitoria/igreja/IMG_7675.JPEG`,
      `${imageBase}images/vitoria/igreja/IMG_7677.JPEG`,
    ],
  },
  {
    id: 3,
    slug: 'memorias-de-um-comeco',
    title: 'Memórias de um Começo',
    category: 'Batizado',
    description:
      'Um registro delicado do batizado, construído pelos pequenos detalhes da cerimônia e pelas relações da família. Imagens pensadas para manter viva a sensação daquele dia.',
    image: `${imageBase}images/vitoria/batizado/IMG_0541.JPEG`,
    highlight: 'Afeto • memória • espontaneidade',
    gallery: [
      `${imageBase}images/vitoria/batizado/IMG_0541.JPEG`,
      `${imageBase}images/vitoria/batizado/IMG_0542.JPEG`,
      `${imageBase}images/vitoria/batizado/IMG_0543.JPEG`,
      `${imageBase}images/vitoria/batizado/IMG_0546.JPEG`,
      `${imageBase}images/vitoria/batizado/IMG_0547.JPEG`,
      `${imageBase}images/vitoria/batizado/IMG_0548.JPEG`,
      `${imageBase}images/vitoria/batizado/IMG_0549.JPEG`,
      `${imageBase}images/vitoria/batizado/IMG_0553.JPEG`,
    ],
  },
];
