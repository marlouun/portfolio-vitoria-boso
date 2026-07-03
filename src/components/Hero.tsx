import { profile } from '../data/profile';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:min-h-screen lg:pb-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="hero-copy">
          <p className="section-kicker">Portfólio visual</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.94] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            {profile.name}
            <span className="block text-[#c86d4c]">com presença criativa.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">{profile.headline}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projetos" className="magnetic-btn focus-ring rounded-full bg-[#c86d4c] px-7 py-4 text-center font-black text-white soft-shadow transition hover:-translate-y-1">
              Ver trabalhos
            </a>
            <a href="#galeria" className="focus-ring rounded-full border border-[#e8cdbf] bg-white/75 px-7 py-4 text-center font-black text-zinc-950 backdrop-blur transition hover:-translate-y-1 hover:border-[#c86d4c]">
              Ver galeria
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-xl">
            {profile.stats.map((stat, index) => (
              <div key={stat.label} className="card-glass floating-card rounded-3xl p-4 text-center soft-shadow" style={{ animationDelay: `${index * 0.12}s` }}>
                <strong className="block text-2xl font-black text-zinc-950">{stat.value}</strong>
                <span className="mt-1 block text-xs font-bold leading-4 text-zinc-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual relative">
          <div className="hero-glow absolute -inset-4 rounded-[3rem] bg-[#eaa98e]/24 blur-2xl" />
          <div className="soft-shadow relative overflow-hidden rounded-[2.5rem] border-8 border-white bg-white transition duration-500 hover:-rotate-1 hover:scale-[1.01]">
            <img
              src={profile.heroImage}
              alt="Imagem principal de Vitória Boso"
              className="h-[460px] w-full object-cover sm:h-[540px]"
              width="900"
              height="1100"
              fetchPriority="high"
            />
          </div>
          <div className="card-glass absolute -bottom-7 left-4 right-4 rounded-3xl p-5 soft-shadow sm:left-auto sm:right-8 sm:w-72">
            <p className="text-sm font-bold text-zinc-500">Especialidade</p>
            <p className="mt-1 text-xl font-black text-zinc-950">Design delicado, moderno e memorável.</p>
          </div>
          <div className="float-badge absolute -left-3 top-12 rounded-3xl bg-zinc-950 px-4 py-3 text-sm font-black text-white soft-shadow">
            ✦ Criativo
          </div>
        </div>
      </div>
    </section>
  );
}
