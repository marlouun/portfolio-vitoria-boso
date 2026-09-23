import { profile } from '../data/profile';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section id="sobre" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-10 border-b border-black/10 pb-16 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div>
              <p className="section-kicker">O olhar</p>
              <p className="mt-5 max-w-xs text-sm leading-6 text-[#777168]">
                Fotografia autoral para histórias reais, sem apagar aquilo que torna cada momento único.
              </p>
            </div>

            <div>
              <h2 className="font-editorial max-w-4xl text-5xl leading-[0.95] tracking-[-0.045em] text-[#191714] sm:text-6xl lg:text-7xl">
                Fotografia para sentir, não apenas recordar.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-10 pt-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <p className="font-editorial max-w-xl text-3xl leading-[1.08] tracking-[-0.025em] text-[#38342f] sm:text-4xl">
              “Meu interesse está no que acontece entre um momento e outro: o gesto que dura pouco, a luz que muda, a emoção que não foi ensaiada.”
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.06}>
            <div className="max-w-xl space-y-5 text-base leading-8 text-[#625e57] sm:text-lg">
              <p>{profile.shortBio}</p>
              <p>{profile.approach}</p>
              <p className="pt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#9f5b45]">
                {profile.name} • {profile.role}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
