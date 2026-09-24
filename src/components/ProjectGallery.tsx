import type { Project } from '../data/projects';

type ProjectGalleryProps = {
  project: Project;
};

export function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#fff7f2] text-zinc-950">
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

          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {project.gallery.map((image, index) => (
              <figure
                key={image}
                className="mb-4 break-inside-avoid overflow-hidden rounded-[2rem] bg-white p-2 soft-shadow"
              >
                <img
                  src={image}
                  alt={`${project.title} — fotografia ${index + 1}`}
                  className="h-auto w-full rounded-[1.5rem]"
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </figure>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
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
