const words = ['luz', 'gesto', 'silêncio', 'memória', 'movimento', 'afeto'];

export function Marquee() {
  const content = [...words, ...words, ...words];

  return (
    <div
      className="relative overflow-hidden border-y border-black/10 bg-[#191714] py-4 text-[#f3f0ea]"
      aria-label="Elementos do olhar fotográfico"
    >
      <div className="marquee-track flex w-max gap-5 whitespace-nowrap">
        {content.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-flex items-center gap-5 text-[0.7rem] font-semibold uppercase tracking-[0.28em]"
          >
            {word}
            <span className="text-[#9f5b45]" aria-hidden="true">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
