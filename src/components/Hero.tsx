import { profile } from '../data/profile';

const base = import.meta.env.BASE_URL;

const noCopy = {
  draggable: false,
  onContextMenu: (event: React.SyntheticEvent) => event.preventDefault(),
  onDragStart: (event: React.SyntheticEvent) => event.preventDefault(),
  onCopy: (event: React.SyntheticEvent) => event.preventDefault(),
};

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-[#27384f] pb-24 pt-32 text-[#fbf8f1] sm:pt-36 lg:pb-28">
      <img
        src={`${base}brand/monogram-cream.png`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-24 -z-10 w-[26rem] max-w-none opacity-[0.05] sm:w-[40rem]"
      />
      <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-[#dcbe7e]/15 blur-3xl" aria-hidden="true" />

      <div className="container-page grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="hero-copy text-center lg:text-left">
          <p className="flex items-center justify-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-[#dcbe7e] lg:justify-start">
            <span className="gold-rule" /> Fotografia
          </p>
          <h1 className="mt-5 text-[3.4rem] leading-[0.95] text-[#fbf8f1] sm:text-7xl lg:text-8xl">
            Vitória
            <span className="block">Boso</span>
          </h1>
          <p className="font-script mt-4 text-4xl text-[#dcbe7e] sm:text-5xl">Registrar aquilo que merece permanecer</p>
          <p className="mx-auto mt-6 max-w-md text-base leading-7 text-[#fbf8f1]/75 lg:mx-0">{profile.headline}</p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#natal" className="btn btn-gold focus-ring">
              <span aria-hidden="true">✦</span> Reservar Natal de Outrora
            </a>
            <a href="#projetos" className="btn btn-ghost-light focus-ring">
              Ver trabalhos
            </a>
          </div>
        </div>

        <div className="hero-visual relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="arch absolute -inset-3 border border-[#dcbe7e]/60" aria-hidden="true" />
          <div className="arch relative overflow-hidden bg-[#1c2a3d] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <img
              src={profile.heroImage}
              alt="Fotografia autoral de Vitória Boso"
              className="aspect-[3/4] w-full select-none object-cover"
              width="900"
              height="1200"
              fetchPriority="high"
              {...noCopy}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#27384f]/55 via-transparent to-transparent" />
          </div>

          <a
            href="#natal"
            className="focus-ring float-badge absolute -bottom-9 -right-1 flex w-[15.5rem] items-center gap-3 rounded-2xl bg-[#fdfaf2] p-2.5 pr-4 text-[#3a2418] shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:-right-8"
            aria-label="Conhecer o ensaio Natal de Outrora"
          >
            <img src={`${base}images/natal/natal-2-sm.jpg`} alt="" className="h-16 w-14 shrink-0 rounded-xl object-cover" width="56" height="64" />
            <span className="leading-tight">
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#8a2c3a]">Ensaio de Natal</span>
              <span className="font-display block text-xl">Natal de Outrora</span>
              <span className="text-xs text-[#3a2418]/65">Reservas abertas →</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
