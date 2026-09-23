import { projects } from '../data/projects';
import { Reveal } from './Reveal';

export function Projects() {
  return (
    <section id="projetos" className="bg-[#1a1917] py-20 text-[#f3f0ea] sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-7 border-b border-white/14 pb-14 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="section-kicker text-[#c58b76]">Projetos</p>
              <h2 className="font-editorial mt-4 max-w-4xl text-5xl leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Histórias em que a imagem vem antes da explicação.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#bbb5ab] lg:justify-self-end">
              Três séries que mostram o mesmo olhar em atmosferas diferentes: movimento, fé e afeto. O foco está no que cada cena faz sentir.
            </p>
          </div>
        </Reveal>

        <div>
          {projects.map((project, index) => {
            const reverse = index % 2 === 1;

            return (
              <article
                key={project.id}
                id={`projeto-${project.slug}`}
                className="border-b border-white/14 py-16 sm:py-20 lg:py-24"
              >
                <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16">
                  <Reveal direction={reverse ? 'left' : 'right'} className={reverse ? 'lg:order-2' : ''}>
                    <figure>
                      <div className="overflow-hidden bg-black">
                        <img
                          src={project.cover}
                          alt={project.coverAlt}
                          className="h-[68vh] min-h-[520px] w-full object-cover transition duration-700 hover:scale-[1.015]"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          width="1200"
                          height="1600"
                        />
                      </div>
                      <figcaption className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#888278]">
                        {project.coverCaption}
                      </figcaption>
                    </figure>
                  </Reveal>

                  <Reveal direction={reverse ? 'right' : 'left'} delay={0.05} className={reverse ? 'lg:order-1' : ''}>
                    <div className="lg:px-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c58b76]">
                        0{index + 1} / {project.category}
                      </p>
                      <h3 className="font-editorial mt-5 text-5xl leading-[0.92] tracking-[-0.04em] sm:text-6xl">
                        {project.title}
                      </h3>
                      <p className="mt-7 max-w-lg text-base leading-8 text-[#bbb5ab]">
                        {project.description}
                      </p>
                      <p className="font-editorial mt-9 max-w-md border-l border-[#9f5b45] pl-5 text-2xl leading-tight text-[#f3f0ea]">
                        {project.statement}
                      </p>
                    </div>
                  </Reveal>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:ml-[18%] lg:mt-14">
                  {project.gallery.map((image, imageIndex) => (
                    <Reveal key={image.src} delay={imageIndex * 0.05}>
                      <figure className="overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-[420px] w-full object-cover sm:h-[520px]"
                          loading="lazy"
                          decoding="async"
                          width="900"
                          height="1200"
                        />
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
