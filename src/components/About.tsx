import { profile } from '../data/profile';
import { Reveal } from './Reveal';

export function About() {
  const cards = [
    { icon: '♡', title: 'Olhar sensível', text: 'Luz, gesto e atmosfera para transformar momentos reais em imagens com identidade.' },
    { icon: '⌖', title: 'Narrativa visual', text: 'Cada ensaio é pensado como uma história, valorizando espontaneidade, contexto e sentimento.' },
  ];

  return (
    <section id="sobre" className="py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal direction="right" className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#f2c6b6]/32 blur-2xl" aria-hidden="true" />
          <img
            src={profile.profileImage}
            alt="Fotografia do portfólio de Vitória Boso"
            className="soft-shadow relative aspect-square w-full select-none rounded-[2.5rem] border-8 border-white object-cover transition duration-500 hover:rotate-1 hover:scale-[1.01]"
            loading="lazy"
            decoding="async"
            width="900"
            height="900"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
            onCopy={(event) => event.preventDefault()}
          />
        </Reveal>

        <Reveal direction="left" delay={0.06}>
          <div className="card-glass rounded-[2rem] p-7 soft-shadow sm:p-10">
            <p className="section-kicker">Sobre o olhar</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">Fotografia que guarda mais do que a imagem: guarda a sensação do momento.</h2>
            <p className="mt-6 text-lg leading-8 text-zinc-700">{profile.shortBio}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cards.map((item) => (
                <div key={item.title} className="rounded-3xl bg-white p-5 transition duration-300 hover:-translate-y-2">
                  <span className="text-2xl text-[#c86d4c]" aria-hidden="true">{item.icon}</span>
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
