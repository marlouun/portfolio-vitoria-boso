import { projects } from '../data/projects';
import { Reveal } from './Reveal';

export function Projects() {
  return (
    <section id="projetos" className="py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="text-center">
            <p className="section-kicker">Trabalhos</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl leading-[1.05] text-[#27384f] sm:text-6xl">Projetos que contam histórias para além do registro.</h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#27384f]/70">
              Ensaios com atmosferas diferentes, unidos pelo mesmo olhar: atenção à luz, aos gestos e ao sentimento de cada cena.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => {
            const isNatal = project.slug === 'natal-de-outrora';
            return (
              <Reveal key={project.id} delay={index * 0.06} className="h-full">
                <a
                  href={`?projeto=${project.slug}`}
                  className="focus-ring group flex h-full flex-col"
                  aria-label={`Abrir projeto ${project.title}`}
                >
                  <div className={`arch relative overflow-hidden ${isNatal ? 'ring-2 ring-[#dcbe7e] ring-offset-4 ring-offset-[#fbf8f1]' : ''}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="aspect-[3/4] w-full select-none object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="800"
                      draggable={false}
                      onContextMenu={(event) => event.preventDefault()}
                      onDragStart={(event) => event.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#27384f]/55 via-transparent to-transparent" />
                    {isNatal && (
                      <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-[#5a1220] px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#fbeccb]">
                        ✦ Em cartaz
                      </span>
                    )}
                  </div>
                  <div className="px-1 pt-5 text-center">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#6f8aa6]">{project.category}</p>
                    <h3 className="mt-2 text-3xl text-[#27384f] transition group-hover:text-[#8a6a2a]">{project.title}</h3>
                    <p className="font-serif-i mt-2 text-lg text-[#27384f]/70">{project.highlight}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
