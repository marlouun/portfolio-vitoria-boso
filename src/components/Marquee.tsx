const words = ['Fotografia', 'Luz', 'Movimento', 'Memória', 'Presença', 'Afeto'];

export function Marquee() {
  const content = [...words, ...words, ...words, ...words];

  return (
    <div className="relative overflow-hidden border-y border-[#c8d4e0] bg-white/55 py-4 backdrop-blur-sm" aria-label="Destaques do portfolio">
      <div className="marquee-track flex w-max gap-4 whitespace-nowrap">
        {content.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.22em] text-[#122d48]">
            {word}
            <span className="text-[#dcbe7e]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
