import { profile } from '../data/profile';
import { Reveal } from './Reveal';

const pillars = [
  { title: 'Olhar sensível', text: 'Luz, gesto e atmosfera para transformar momentos reais em imagens com identidade.' },
  { title: 'Narrativa visual', text: 'Cada ensaio é pensado como uma história: espontaneidade, contexto e sentimento.' },
  { title: 'Memória', text: 'Registrar aquilo que merece permanecer — hoje, e para voltar a sentir depois.' },
];

export function About() {
  return (
    <section id="sobre" className="py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal direction="right" className="relative mx-auto w-full max-w-sm">
          <div className="arch absolute -inset-3 border border-[#dcbe7e]/70" aria-hidden="true" />
          <img
            src={profile.profileImage}
            alt="Fotografia do portfólio de Vitória Boso"
            className="arch relative aspect-[3/4] w-full select-none object-cover shadow-[0_24px_60px_rgba(39,56,79,0.25)]"
            loading="lazy"
            decoding="async"
            width="900"
            height="1200"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
          />
        </Reveal>

        <Reveal direction="left" delay={0.06}>
          <p className="section-kicker flex items-center gap-3">
            <span className="gold-rule" /> Sobre o olhar
          </p>
          <h2 className="mt-4 text-4xl leading-[1.05] text-[#27384f] sm:text-6xl">
            Fotografia que guarda mais do que a imagem:
            <span className="font-script block text-5xl text-[#6f8aa6] sm:text-6xl">guarda a sensação do momento.</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#27384f]/78">{profile.shortBio}</p>

          <ul className="mt-9 grid gap-4 sm:grid-cols-3">
            {pillars.map((item) => (
              <li key={item.title} className="rounded-2xl border border-[#27384f]/10 bg-white/70 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-[#dcbe7e]">
                <span className="text-sm text-[#dcbe7e]" aria-hidden="true">✦</span>
                <h3 className="mt-2 text-2xl text-[#27384f]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#27384f]/70">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
