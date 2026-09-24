const imageBase = import.meta.env.BASE_URL;

export const profile = {
  name: 'Vitória Boso',
  role: 'Fotógrafa autoral e documental',
  headline: 'Fotografia com sentimento, presença e verdade em cada história.',
  shortBio:
    'Vitória Boso fotografa momentos reais com um olhar sensível para luz, gesto e atmosfera. Seu trabalho busca preservar não apenas o que aconteceu, mas a sensação de estar ali — em histórias construídas com espontaneidade, memória e identidade.',
  location: 'Brasil',
  instagram: 'https://www.instagram.com/_framesby.vi',
  highlights: 'https://www.instagram.com/stories/highlights/18084929305949392/',
  profileImage: `${imageBase}images/vitoria/igreja/IMG_0614.jpg`,
  heroImage: `${imageBase}images/vitoria/igreja/IMG_0606.jpg`,
  stats: [
    { value: 'Autoral', label: 'Olhar sensível' },
    { value: 'Natural', label: 'Momentos reais' },
    { value: 'Memória', label: 'Histórias que ficam' },
  ],
};
