import { profile } from '../data/profile';
import { Reveal } from './Reveal';

export function Contact() {
  return (
    <section id="contato" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-10 border-y border-black/10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-20">
            <div>
              <p className="section-kicker">Contato</p>
              <h2 className="font-editorial mt-5 max-w-4xl text-5xl leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Se uma história merece ser sentida de novo, talvez mereça ser fotografada.
              </h2>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-md text-base leading-8 text-[#625e57]">
                Para ensaios, registros, projetos autorais e colaborações, fale com a Vitória pelo Instagram.
              </p>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-7 inline-flex rounded-full bg-[#191714] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#f3f0ea] transition hover:-translate-y-0.5"
              >
                {profile.instagramLabel} ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
