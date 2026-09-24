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
  whatsapp:
    'https://wa.me/554891842048?text=Oi%2C%20Vit%C3%B3ria%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20ensaio%20fotogr%C3%A1fico.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F',
  profileImage: `${imageBase}images/vitoria/igreja/IMG_0614.JPG.jpeg`,
  heroImage: `${imageBase}images/vitoria/igreja/IMG_0606.JPG.jpeg`,
  stats: [
    { value: 'Autoral', label: 'Olhar sensível' },
    { value: 'Natural', label: 'Momentos reais' },
    { value: 'Memória', label: 'Histórias que ficam' },
  ],
};
