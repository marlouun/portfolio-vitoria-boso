import { useMemo } from 'react';
import { daysUntilChristmas, natalIncluded, natalPalette, natalPhotos } from '../data/natal';
import { profile } from '../data/profile';
import { Reveal } from './Reveal';

const base = import.meta.env.BASE_URL;

const noCopy = {
  draggable: false,
  onContextMenu: (event: React.SyntheticEvent) => event.preventDefault(),
  onDragStart: (event: React.SyntheticEvent) => event.preventDefault(),
};

function Snow() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: (i * 37 + 11) % 100,
        size: 3 + ((i * 7) % 5),
        delay: -((i * 13) % 22),
        duration: 11 + ((i * 5) % 14),
        drift: ((i * 11) % 60) - 30,
      })),
    [],
  );

  return (
    <div className="pointer-events-none sticky top-0 z-0 h-0" aria-hidden="true">
      <div className="snow-layer">
        {flakes.map((flake, index) => (
          <span
            key={index}
            className="snowflake"
            style={
              {
                left: `${flake.left}%`,
                width: flake.size,
                height: flake.size,
                animationDuration: `${flake.duration}s`,
                animationDelay: `${flake.delay}s`,
                '--drift': `${flake.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
        <span className="bokeh left-[-4rem] top-24 h-64 w-64" />
        <span className="bokeh right-[-5rem] top-[40%] h-72 w-72" style={{ animationDelay: '-2s' }} />
      </div>
    </div>
  );
}

function Lights() {
  return (
    <div className="string-lights" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <i key={i} style={{ animationDelay: `${-i * 0.37}s`, marginTop: i % 2 ? '0.4rem' : 0 }} />
      ))}
    </div>
  );
}

export function Natal() {
  const days = daysUntilChristmas();

  return (
    <section id="natal" className="natal-bg relative overflow-x-clip text-[#fbeccb]">
      <Snow />

      <div className="relative z-10">
        <div className="pt-4">
          <Lights />
          <svg viewBox="0 0 400 12" className="-mt-2 h-3 w-full text-[#e8c677]/50" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 2 Q 25 12 50 2 T 100 2 T 150 2 T 200 2 T 250 2 T 300 2 T 350 2 T 400 2" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Abertura */}
        <div className="container-page pb-12 pt-14 text-center sm:pt-20">
          <Reveal>
            <p className="inline-flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-[#e8c677] sm:text-[0.7rem] sm:tracking-[0.34em]">
              <span className="gold-rule" /> Ensaio de Natal · vagas limitadas <span className="gold-rule" />
            </p>
            <h2 className="gold-text mt-6 text-[3.5rem] leading-[0.95] sm:text-8xl">
              Natal
              <span className="block">de Outrora</span>
            </h2>
            <p className="font-script mt-3 text-4xl text-[#fbeccb] sm:text-5xl">por Vitória Boso</p>
            <p className="font-serif-i mx-auto mt-6 max-w-md text-2xl leading-snug text-[#fbeccb]/90">
              Um cenário preparado com carinho para registrar quem você ama.
            </p>

            {days > 0 && (
              <p className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-[#e8c677]/40 bg-black/20 px-5 py-2 text-sm backdrop-blur">
                <span className="sparkle text-[#e8c677]">✦</span>
                Faltam <strong className="font-display text-2xl text-[#e8c677]">{days}</strong> dias para o Natal
              </p>
            )}

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              <a href={profile.whatsappNatal} target="_blank" rel="noreferrer" className="btn btn-gold focus-ring">
                Reservar meu horário
              </a>
              <a href="?projeto=natal-de-outrora" className="btn btn-ghost-light focus-ring">
                Ver todas as fotos
              </a>
            </div>
          </Reveal>
        </div>

        {/* Carrossel de fotos */}
        <div className="container-page">
          <div className="snap-row md:hidden" aria-label="Fotos do cenário">
            {natalPhotos.map((photo, index) => (
              <figure
                key={photo.id}
                className="ring-gold w-[74vw] max-w-[20rem] overflow-hidden rounded-[1.75rem] bg-black/30"
                style={{ transform: `rotate(${index % 2 ? 1.2 : -1.2}deg)` }}
              >
                <img
                  src={photo.small}
                  srcSet={`${photo.small} 520w, ${photo.src} 1000w`}
                  sizes="74vw"
                  alt={photo.alt}
                  className="aspect-[3/4] w-full select-none object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  width="520"
                  height="693"
                  {...noCopy}
                />
              </figure>
            ))}
          </div>

          <div className="hidden grid-cols-3 gap-5 md:grid">
            {natalPhotos.map((photo, index) => (
              <Reveal key={photo.id} delay={(index % 3) * 0.08} className={index % 3 === 1 ? 'md:translate-y-10' : ''}>
                <figure className="ring-gold overflow-hidden rounded-[2rem] bg-black/30">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="aspect-[3/4] w-full select-none object-cover transition duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="1000"
                    height="1333"
                    {...noCopy}
                  />
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-2 text-center text-xs uppercase tracking-[0.28em] text-[#fbeccb]/55 md:hidden">deslize →</p>
        </div>

        {/* A experiência */}
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal direction="right">
            <figure className="polaroid mx-auto max-w-md -rotate-2 rounded-sm transition duration-500 hover:rotate-0">
              <img
                src={`${base}images/natal/experiencia.jpg`}
                alt="Famílias durante o ensaio Natal de Outrora: mãe e filha entre árvores e luzes"
                className="w-full select-none"
                loading="lazy"
                decoding="async"
                width="1000"
                height="900"
                {...noCopy}
              />
              <figcaption className="font-script absolute inset-x-0 bottom-2 text-center text-3xl text-[#7a1b2c]">memórias de Natal</figcaption>
            </figure>
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            <p className="section-kicker !text-[#e8c677]">A experiência</p>
            <h3 className="gold-text mt-3 text-5xl leading-none sm:text-6xl">Mais do que fotografar</h3>
            <p className="font-serif-i mt-6 text-[1.65rem] leading-snug text-[#fbeccb]">
              Queremos guardar aquilo que faz o Natal ser especial: o encontro, os sorrisos, o carinho e a presença de quem você ama.
            </p>
            <p className="font-script mt-6 text-4xl text-[#e8c677]">Um pedacinho dessa época para voltar sempre.</p>
          </Reveal>
        </div>

        {/* O que está incluso */}
        <div className="container-page pb-6">
          <Reveal>
            <div className="paper overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="relative bg-[#f4ecdc] px-6 pt-8">
                <p className="section-kicker text-center !text-[#8a2c3a]">A sua sessão</p>
                <h3 className="mt-2 text-center text-4xl text-[#3a2418] sm:text-5xl">O que está incluso</h3>
                <img
                  src={`${base}images/natal/ilustracao.jpg`}
                  alt="Ilustração em aquarela de pinheiros natalinos, esquilo e cervo"
                  className="mx-auto mt-4 w-full max-w-xs mix-blend-multiply sm:max-w-sm"
                  loading="lazy"
                  decoding="async"
                  width="1000"
                  height="800"
                />
              </div>

              <ol className="grid gap-px bg-[#e9dcc2] sm:grid-cols-2">
                {natalIncluded.map((item, index) => (
                  <li key={item.title} className={`flex gap-4 bg-[#fdfaf2] p-6 ${index === natalIncluded.length - 1 ? 'sm:col-span-2' : ''}`}>
                    <span className="font-display text-4xl leading-none text-[#c99a4a]">0{index + 1}</span>
                    <span>
                      <strong className="block text-lg font-semibold leading-snug text-[#3a2418]">{item.title}</strong>
                      <span className="mt-1 block text-sm leading-6 text-[#3a2418]/70">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* O que vestir */}
        <div className="container-page py-20 md:py-24">
          <Reveal>
            <div className="text-center">
              <p className="section-kicker !text-[#e8c677]">Dicas para o ensaio</p>
              <h3 className="gold-text mt-3 text-5xl sm:text-6xl">O que vestir</h3>
              <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#fbeccb]/85">
                Aposte em tons que conversem com o cenário. Tons neutros também funcionam muito bem.
              </p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-6">
              {natalPalette.map((swatch) => (
                <li key={swatch.name} className="text-center">
                  <span
                    className="mx-auto block h-16 w-16 rounded-full border-2 border-[#fbeccb]/70 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                    style={{ background: swatch.color }}
                  />
                  <span className="mt-3 block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#fbeccb]/80">{swatch.name}</span>
                </li>
              ))}
            </ul>

            <p className="font-serif-i mx-auto mt-10 max-w-md text-center text-xl text-[#fbeccb]/85">
              Para fotos mais harmônicas, evite estampas muito grandes e cores neon.
            </p>

            <a
              href={`${base}images/natal/looks.jpg`}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group mx-auto mt-10 block max-w-3xl overflow-hidden rounded-[1.5rem] bg-[#fdfaf2] p-2 ring-gold"
              aria-label="Abrir looks de Natal em tamanho maior"
            >
              <img
                src={`${base}images/natal/looks.jpg`}
                alt="Looks de Natal: inspirações femininas, masculinas e infantis em vinho, verde, caramelo e bege"
                className="w-full rounded-[1.1rem] transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
                width="980"
                height="508"
              />
              <span className="block py-3 text-center text-xs font-medium uppercase tracking-[0.22em] text-[#8a2c3a]">Toque para ampliar os looks ✦</span>
            </a>
          </Reveal>
        </div>

        {/* Vídeo */}
        <div className="container-page pb-20">
          <Reveal>
            <div className="text-center">
              <p className="section-kicker !text-[#e8c677]">Nos bastidores</p>
              <h3 className="gold-text mt-3 text-5xl">O clima do cenário</h3>
            </div>
            <div className="ring-gold mx-auto mt-8 w-full max-w-[20rem] overflow-hidden rounded-[2rem] bg-black">
              <video
                className="aspect-[9/16] w-full object-cover"
                src={`${base}video/natal-de-outrora.mp4`}
                poster={`${base}images/natal/natal-6-sm.jpg`}
                controls
                playsInline
                preload="none"
              />
            </div>
          </Reveal>
        </div>

        {/* Agendamento */}
        <div className="container-page pb-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#e8c677]/40 bg-black/25 p-8 text-center backdrop-blur sm:p-14">
              <span className="font-display absolute -right-2 -top-6 text-9xl text-[#e8c677]/10" aria-hidden="true">✦</span>
              <p className="section-kicker !text-[#e8c677]">Agendamento</p>
              <h3 className="gold-text mt-3 text-5xl sm:text-6xl">Reserve seu horário</h3>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#fbeccb]/85">
                O horário é confirmado mediante pagamento antecipado do sinal, que será descontado do valor total do pacote. As vagas são limitadas para garantir um atendimento tranquilo e uma experiência especial para cada família.
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                <a href={profile.whatsappNatal} target="_blank" rel="noreferrer" className="btn btn-gold focus-ring">
                  WhatsApp {profile.phone}
                </a>
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost-light focus-ring">
                  @_framesby.vi
                </a>
              </div>
              <p className="font-script mx-auto mt-10 max-w-md text-3xl leading-tight text-[#e8c677]">
                O melhor presente deste Natal pode ser uma lembrança para a vida inteira.
              </p>
            </div>
          </Reveal>
        </div>

        <Lights />
        <div className="h-6" />
      </div>
    </section>
  );
}
