const imageBase = import.meta.env.BASE_URL;

export function daysUntilChristmas(now: Date = new Date()): number {
  const year = now.getFullYear();
  const today = new Date(year, now.getMonth(), now.getDate());
  let christmas = new Date(year, 11, 25);
  if (today.getTime() > christmas.getTime()) christmas = new Date(year + 1, 11, 25);
  return Math.round((christmas.getTime() - today.getTime()) / 86_400_000);
}

export const natalPhotos = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: n,
  src: `${imageBase}images/natal/natal-${n}.jpg`,
  small: `${imageBase}images/natal/natal-${n}-sm.jpg`,
  alt: `Cenário natalino do ensaio Natal de Outrora — foto ${n}`,
}));

export const natalIncluded = [
  { title: '45 minutos de ensaio', text: 'Tempo para brincar, abraçar e deixar o momento acontecer.' },
  { title: 'Cenário natalino preparado com carinho', text: 'Árvore, lareira, luzes e detalhes pensados para você só chegar.' },
  { title: 'Orientação durante toda a sessão', text: 'Poses leves e naturais, sem rigidez.' },
  { title: 'Pets são bem-vindos', text: 'Mediante aviso prévio.' },
  { title: 'Fotos reveladas', text: 'Escolhidas entre as digitais contratadas.' },
];

export const natalPalette = [
  { name: 'Vinho', color: '#5a1220' },
  { name: 'Verde floresta', color: '#1f4a30' },
  { name: 'Bege', color: '#d9c3a0' },
  { name: 'Creme', color: '#f1e6cf' },
  { name: 'Caramelo', color: '#a9692f' },
  { name: 'Marrom', color: '#4a2e20' },
];
