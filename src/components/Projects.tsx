import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { Reveal } from './Reveal';

export function Projects() {
  return (
    <section id="projetos" className="py-20">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">Trabalhos</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">Projetos que chamam atenção logo no primeiro olhar.</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-zinc-600">Edite os cards no arquivo <strong>src/data/projects.ts</strong>. Troque textos, categorias e imagens quando quiser.</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <motion.article whileHover={{ y: -12, rotate: index % 2 === 0 ? -1 : 1 }} className="group overflow-hidden rounded-[2rem] bg-white/90 p-3 soft-shadow backdrop-blur transition">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <motion.img src={project.image} alt={project.title} className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/35 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </div>
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="rounded-full bg-[#fff1eb] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#c86d4c]">{project.category}</span>
                    <span className="text-2xl text-zinc-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#c86d4c]" aria-hidden="true">↗</span>
                  </div>
                  <h3 className="text-2xl font-black text-zinc-950">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{project.description}</p>
                  <p className="mt-5 text-sm font-black text-zinc-950">{project.highlight}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
