const imageBase = import.meta.env.BASE_URL;

export const profile = {
  name: 'Vitória Boso',
  role: 'Criadora de experiências visuais e projetos criativos',
  headline: 'Um portfólio elegante para apresentar personalidade, criatividade e trabalhos com impacto.',
  shortBio:
    'Vitória transforma ideias em composições visuais marcantes. Este espaço reúne sua trajetória, seus trabalhos e uma galeria pensada para destacar seu estilo com elegância.',
  location: 'Brasil',
  email: 'vitoria@email.com',
  whatsapp: 'https://wa.me/5500000000000',
  instagram: 'https://instagram.com/',
  profileImage: `${imageBase}images/profile-vitoria.svg`,
  heroImage: `${imageBase}images/hero-vitoria.svg`,
  stats: [
    { value: '12+', label: 'Projetos criativos' },
    { value: '4', label: 'Áreas de atuação' },
    { value: '100%', label: 'Foco em detalhes' },
  ],
};
