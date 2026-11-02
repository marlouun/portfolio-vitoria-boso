import { videos } from '../data/videos';
import { Reveal } from './Reveal';

export function Audiovisual() {
  return (
    <section id="audiovisual" className="py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="text-center">
            <p className="section-kicker">Audiovisual</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl leading-[1.05] text-[#27384f] sm:text-6xl">Quando a imagem ganha movimento.</h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#27384f]/70">
              Pequenos filmes sobre fé, afeto e celebração. Toque para assistir.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {videos.map((video, index) => (
            <Reveal key={video.slug} delay={index * 0.06} className="h-full">
              <a href={`?video=${video.slug}`} className="focus-ring group flex h-full flex-col" aria-label={`Assistir ${video.title}`}>
                <div className="relative overflow-hidden rounded-[1.5rem] bg-[#27384f]">
                  <img
                    src={video.poster}
                    alt={video.title}
                    className="aspect-[3/4] w-full select-none object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="800"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27384f]/60 via-transparent to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#fbf8f1]/90 text-xl text-[#27384f] shadow-lg transition group-hover:scale-110" aria-hidden="true">
                    ▶
                  </span>
                </div>
                <div className="px-1 pt-4 text-center">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#6f8aa6]">{video.category}</p>
                  <h3 className="mt-2 text-2xl text-[#27384f]">{video.title}</h3>
                  <p className="font-serif-i mt-2 text-lg leading-snug text-[#27384f]/70">{video.description}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
