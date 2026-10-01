import { profile } from '../data/profile';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:min-h-screen lg:pb-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="hero-copy">
          <p className="section-kicker">Fotografia autoral</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.94] tracking-tight text-[#122d48] sm:text-6xl lg:text-7xl">
            {profile.name}
            <span className="block text-[#55779c]">com olhar sensível.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#122d48]/75 sm:text-xl">{profile.headline}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projetos" className="magnetic-btn focus-ring rounded-full bg-[#122d48] px-7 py-4 text-center font-black text-white soft-shadow transition hover:-translate-y-1">
              Ver projetos
            </a>
            <a href="#galeria" className="focus-ring rounded-full border border-[#c8d4e0] bg-white/75 px-7 py-4 text-center font-black text-[#122d48] backdrop-blur transition hover:-translate-y-1 hover:border-[#dcbe7e]">
              Ver galeria
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-xl">
            {profile.stats.map((stat, index) => (
              <div key={stat.label} className="card-glass floating-card rounded-3xl p-4 text-center soft-shadow" style={{ animationDelay: `${index * 0.12}s` }}>
                <strong className="block text-2xl font-black text-[#122d48]">{stat.value}</strong>
                <span className="mt-1 block text-xs font-bold leading-4 text-[#122d48]/65">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual relative">
          <div className="hero-glow absolute -inset-4 rounded-[3rem] bg-[#dcbe7e]/28 blur-2xl" />
          <div className="soft-shadow relative overflow-hidden rounded-[2.5rem] border-8 border-white bg-white transition duration-500 hover:-rotate-1 hover:scale-[1.01]">
            <img
              src={profile.heroImage}
              alt="Fotografia autoral de Vitória Boso"
              className="h-[460px] w-full select-none object-cover sm:h-[540px]"
              width="900"
              height="1100"
              fetchPriority="high"
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
              onDragStart={(event) => event.preventDefault()}
              onCopy={(event) => event.preventDefault()}
            />
          </div>
          <div className="card-glass absolute -bottom-7 left-4 right-4 rounded-3xl p-5 soft-shadow sm:left-auto sm:right-8 sm:w-72">
            <p className="text-sm font-bold text-[#55779c]">Linguagem</p>
            <p className="mt-1 text-xl font-black text-[#122d48]">Fotografia artística, sensível e documental.</p>
          </div>
          <div className="float-badge absolute -left-3 top-12 rounded-3xl bg-[#122d48] px-4 py-3 text-sm font-black text-white soft-shadow">
            ✦ Autoral
          </div>
        </div>
      </div>
    </section>
  );
}
