import type { Project } from '../data/projects';

type ProjectGalleryProps = {
  project: Project;
};

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const blockImageActions = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-[#fff7f2] text-zinc-950"
      onContextMenu={blockImageActions}
      onCopy={blockImageActions}
      onDragStart={blockImageActions}
    >
      <div className="sticky top-0 z-20 border-b border-white/60 bg-[#fff7f2]/88 backdrop-blur-xl">
        <div className="container-page flex min-h-20 items-center justify-between gap-4 py-3">
          <a
            href="./#projetos"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-black soft-shadow transition hover:-translate-x-1"
          >
            <span aria-hidden="true">←</span>
            Voltar aos projetos
          </a>

          <span className="hidden text-sm font-black text-zinc-500 sm:block">
            Vitória<span className="text-[#c86d4c]">.</span>
          </span>
        </div>
      </div>

      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="section-kicker">{project.category}</p>
              <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight text-zinc-950 sm:text-6xl">
                {project.title}
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="text-base leading-7 text-zinc-600">{project.description}</p>
              <p className="mt-4 text-sm font-black text-zinc-950">{project.highlight}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {project.gallery.map((image, index) => (
              <figure
                key={image}
                className="relative w-full overflow-hidden rounded-[2rem] bg-white p-2 soft-shadow sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
              >
                <img
                  src={image}
                  alt={`${project.title} — fotografia ${index + 1}`}
                  className="pointer-events-none h-auto w-full select-none rounded-[1.5rem]"
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
                <div className="absolute inset-0 z-10" aria-hidden="true" />
              </figure>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-xs font-semibold leading-5 text-zinc-500">
            As imagens deste portfólio são protegidas contra cópia e arraste na interface.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="./#projetos"
              className="magnetic-btn focus-ring rounded-full bg-[#c86d4c] px-7 py-4 text-center font-black text-white soft-shadow transition hover:-translate-y-1"
            >
              Voltar ao portfólio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
