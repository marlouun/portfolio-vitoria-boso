const words = ['Fotografia', 'Luz', 'Natal de Outrora', 'Memória', 'Presença', 'Afeto'];

export function Marquee() {
  const content = [...words, ...words, ...words, ...words];

  return (
    <div className="relative mt-10 overflow-hidden border-y border-[#27384f]/10 bg-[#fdfaf2] py-4" aria-label="Destaques do portfólio">
      <div className="marquee-track flex w-max gap-6 whitespace-nowrap">
        {content.map((word, index) => (
          <span key={`${word}-${index}`} className="font-display inline-flex items-center gap-6 text-xl tracking-[0.12em] text-[#27384f]">
            {word}
            <span className="text-sm text-[#dcbe7e]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
