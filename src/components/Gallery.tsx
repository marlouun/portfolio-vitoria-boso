import { gallery } from '../data/gallery';
import { Reveal } from './Reveal';

export function Gallery() {
  return (
    <section id="galeria" className="py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[#27384f] px-5 py-12 text-[#fbf8f1] shadow-[0_30px_80px_rgba(39,56,79,0.3)] sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#dcbe7e]/20 blur-3xl" aria-hidden="true" />
          <Reveal>
            <div className="text-center">
              <p className="section-kicker !text-[#dcbe7e]">Galeria</p>
              <h2 className="mx-auto mt-4 max-w-xl text-4xl leading-[1.05] sm:text-6xl">Recortes de histórias, luz e presença.</h2>
              <p className="font-script mt-3 text-4xl text-[#dcbe7e]">fé, afeto e movimento</p>
            </div>
          </Reveal>

          <div className="relative mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <figure className={`group overflow-hidden rounded-[1.5rem] bg-white/10 ${index % 2 ? 'lg:translate-y-8' : ''}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[3/4] w-full select-none object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="700"
                    height="900"
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                    onDragStart={(event) => event.preventDefault()}
                  />
                  <figcaption className="font-display flex items-center justify-between p-3 text-xl sm:p-4">
                    {item.title}
                    <span className="text-sm text-[#dcbe7e] transition group-hover:rotate-45">✦</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
