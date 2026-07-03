import { motion } from 'framer-motion';
import { gallery } from '../data/gallery';
import { Reveal } from './Reveal';

export function Gallery() {
  return (
    <section id="galeria" className="py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-950 p-6 text-white soft-shadow sm:p-10">
          <motion.div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c86d4c]/35 blur-3xl" animate={{ scale: [1, 1.2, 1], x: [0, -40, 0] }} transition={{ duration: 8, repeat: Infinity }} />
          <Reveal>
            <p className="section-kicker text-[#f2c6b6]">Galeria</p>
            <div className="mt-3 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Fotos com destaque, ritmo visual e layout mobile-first.</h2>
              <p className="text-base leading-7 text-zinc-300">Coloque as fotos reais na pasta <strong>public/images/gallery</strong> e atualize o arquivo <strong>src/data/gallery.ts</strong>.</p>
            </div>
          </Reveal>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08}>
                <motion.figure whileHover={{ y: -14, scale: 1.02 }} className={`group overflow-hidden rounded-[2rem] bg-white/10 ${index === 0 || index === 3 ? 'lg:translate-y-8' : ''}`}>
                  <img src={item.image} alt={item.title} className="h-80 w-full object-cover opacity-90 transition duration-700 group-hover:scale-110 group-hover:opacity-100" />
                  <figcaption className="flex items-center justify-between p-4 text-sm font-black text-white">
                    {item.title}
                    <span className="text-[#f2c6b6] transition group-hover:rotate-45">✦</span>
                  </figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
