const base = import.meta.env.BASE_URL;

export type VideoItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  src: string;
  poster: string;
  landscape: boolean;
};

export const videos: VideoItem[] = [
  {
    slug: 'natal-de-outrora-2026',
    title: 'Natal de Outrora 2026',
    category: 'Campanha',
    description: 'Luzes, laços e um trenzinho atravessando a mesa: os detalhes do cenário em movimento.',
    src: `${base}video/natal-de-outrora-2026.mp4`,
    poster: `${base}images/audiovisual/natal-de-outrora-2026.jpg`,
    landscape: false,
  },
  {
    slug: 'save-the-date',
    title: 'Save the Date',
    category: 'Casal',
    description: 'Um convite em imagens: terço, flores, cumplicidade e a promessa de um dia que ainda vai acontecer.',
    src: `${base}video/save-the-date.mp4`,
    poster: `${base}images/audiovisual/save-the-date.jpg`,
    landscape: true,
  },
  {
    slug: 'drink-cosmopolitan',
    title: 'Cosmopolitan',
    category: 'Produto',
    description: 'O preparo de um drink contado em detalhes: o brilho do metal, o vermelho que cai na taça e a calma de cada gesto.',
    src: `${base}video/drink-cosmopolitan.mp4`,
    poster: `${base}images/audiovisual/drink-cosmopolitan.jpg`,
    landscape: false,
  },
  {
    slug: 'sabado-de-aleluia',
    title: 'Sábado de Aleluia',
    category: 'Documental',
    description: 'A Vigília Pascal vista de perto: velas, olhares e o silêncio que antecede a festa.',
    src: `${base}video/sabado-de-aleluia.mp4`,
    poster: `${base}images/audiovisual/sabado-de-aleluia.jpg`,
    landscape: true,
  },
  {
    slug: 'sexta-feira-santa',
    title: 'Sexta-feira Santa',
    category: 'Documental',
    description: 'Da rua à encenação da Paixão: um dia de fé e tradição vivido de perto, entre procissão, cruz e silêncio.',
    src: `${base}video/sexta-feira-santa.mp4`,
    poster: `${base}images/audiovisual/sexta-feira-santa.jpg`,
    landscape: true,
  },
];
