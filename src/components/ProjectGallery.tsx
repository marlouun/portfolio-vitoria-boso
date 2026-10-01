import type { Project } from '../data/projects';

type ProjectGalleryProps = {
  project: Project;
};

export function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#fbf8f1] text-[#122d48]">
      <div className="sticky top-0 z-20 border-b border-white/60 bg-[#fbf8f1]/88 backdrop-blur-xl">
        <div className="container-page flex min-h-20 items-center justify-between gap-4 py-3">
          <a
            href="./#projetos"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-black soft-shadow transition hover:-translate-x-1"
          >
            <span aria-hidden="true">←</span>
            Voltar aos projetos
          </a>

          <span className="hidden text-sm font-black text-[#55779c] sm:block">
            Vitória<span className="text-[#dcbe7e]">.</span>
          </span>
        </div>
      </div>

      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="section-kicker">{project.category}</p>
              <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight text-[#122d48] sm:text-6xl">
                {project.title}
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="text-base leading-7 text-[#122d48]/68">{project.description}</p>
              <p className="mt-4 text-sm font-black text-[#122d48]">{project.highlight}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {project.gallery.map((image, index) => (
              <figure
                key={image}
                className="relative w-full overflow-hidden rounded-[2rem] bg-white p-2 soft-shadow sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
                onContextMenu={(event) => event.preventDefault()}
                onDragStart={(event) => event.preventDefault()}
                onCopy={(event) => event.preventDefault()}
              >
                <img
                  src={image}
                  alt={`${project.title} — fotografia ${index + 1}`}
                  className="pointer-events-none h-auto w-full select-none rounded-[1.5rem]"
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
                <div className="absolute inset-0 z-10 select-none" aria-hidden="true" />
              </figure>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="./#projetos"
              className="magnetic-btn focus-ring rounded-full bg-[#122d48] px-7 py-4 text-center font-black text-white soft-shadow transition hover:-translate-y-1"
            >
              Voltar ao portfólio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
