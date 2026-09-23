import { profile } from '../data/profile';

export function Hero() {
  return (
    <section id="inicio" className="pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-screen">
      <div className="container-page grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
        <div className="hero-copy lg:py-12">
          <p className="section-kicker">{profile.eyebrow}</p>

          <h1 className="font-editorial mt-5 max-w-3xl text-[clamp(3.7rem,7vw,7.7rem)] leading-[0.87] tracking-[-0.055em] text-[#191714]">
            {profile.headline}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-[#5f5a53] sm:text-lg sm:leading-8">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="focus-ring inline-flex rounded-full bg-[#191714] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#f3f0ea] transition hover:-translate-y-0.5"
            >
              Ver histórias
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex rounded-full border border-black/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#191714] transition hover:border-[#191714]"
            >
              Instagram ↗
            </a>
          </div>

          <p className="mt-12 max-w-sm border-l border-[#9f5b45] pl-5 font-editorial text-2xl leading-tight text-[#37332e]">
            O instante passa. O sentimento fica.
          </p>
        </div>

        <figure className="hero-visual relative">
          <div className="overflow-hidden bg-[#1d1c1a]">
            <img
              src={profile.heroImage}
              alt="Mãos segurando um terço em silhueta contra o céu"
              className="h-[64vh] min-h-[520px] w-full object-cover object-center lg:h-[78vh]"
              width="1066"
              height="1600"
              fetchPriority="high"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#777168]">
            <span>Frames by Vi</span>
            <span>Fotografia autoral & documental</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
