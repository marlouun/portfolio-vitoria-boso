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
    title: 'Entre Linhas',
    category: 'Fotografia esportiva',
    description:
      'Um ensaio que acompanha o ritmo da partida sem perder os instantes de pausa. Movimento, luz noturna e expressão se misturam para mostrar o jogo para além do placar.',
    image: `${imageBase}images/vitoria/futebol/IMG_0504.JPG.jpeg`,
    highlight: 'Movimento • luz • atmosfera',
  },
  {
    id: 2,
    title: 'Fé em Detalhes',
    category: 'Fotografia documental',
    description:
      'Registros de uma celebração religiosa com atenção aos gestos, símbolos e à luz do ambiente. A proposta é preservar a atmosfera do momento sem interferir no que acontece.',
    image: `${imageBase}images/vitoria/igreja/IMG_7675.JPEG`,
    highlight: 'Rito • silêncio • presença',
  },
  {
    id: 3,
    title: 'Memórias de um Começo',
    category: 'Batizado',
    description:
      'Um registro delicado do batizado, construído pelos pequenos detalhes da cerimônia e pelas relações da família. Imagens pensadas para manter viva a sensação daquele dia.',
    image: `${imageBase}images/vitoria/batizado/IMG_0541.JPEG`,
    highlight: 'Afeto • memória • espontaneidade',
  },
];
