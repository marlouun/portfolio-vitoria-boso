const words = ['Portfólio', 'Design', 'Fotografia', 'Identidade', 'Criatividade', 'Mobile-first'];

export function Marquee() {
  const content = [...words, ...words, ...words, ...words];

  return (
    <div className="relative overflow-hidden border-y border-[#edd4c8] bg-white/55 py-4 backdrop-blur-sm" aria-label="Destaques do portfolio">
      <div className="marquee-track flex w-max gap-4 whitespace-nowrap">
        {content.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.22em] text-[#a95436]">
            {word}
            <span className="text-[#e3a187]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
