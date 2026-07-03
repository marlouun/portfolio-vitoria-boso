import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/profile';

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 90]);
  const titleY = useTransform(scrollY, [0, 700], [0, -45]);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden pt-28">
      <motion.div
        style={{ y: titleY }}
        className="container-page relative grid items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20"
      >
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.72 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#efc6b7] bg-white/70 px-4 py-2 text-sm font-bold text-[#a95436] shadow-sm backdrop-blur-xl">
            <motion.span animate={{ rotate: [0, 18, -18, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2.4, repeat: Infinity }} aria-hidden="true">✦</motion.span>
            Portfolio criativo
          </motion.div>

          <motion.h1 variants={fadeUp} transition={{ duration: 0.78 }} className="max-w-3xl text-5xl font-black leading-[0.92] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            {profile.name}
            <span className="block bg-gradient-to-r from-[#c86d4c] via-[#ee9a7d] to-[#7a3824] bg-clip-text text-transparent">com presença visual.</span>
          </motion.h1>

          <motion.p variants={fadeUp} transition={{ duration: 0.78 }} className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">{profile.headline}</motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.78 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projetos" className="magnetic-btn focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#c86d4c]">
              Ver trabalhos <span aria-hidden="true">→</span>
            </a>
            <a href="#galeria" className="focus-ring inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/80 px-7 py-4 font-black text-zinc-950 backdrop-blur transition hover:-translate-y-1 hover:border-[#c86d4c]">
              Ver galeria
            </a>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.78 }} className="mt-10 grid grid-cols-3 gap-3 sm:max-w-xl">
            {profile.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -8, rotate: index === 1 ? 1.5 : -1.5 }}
                className="card-glass rounded-3xl p-4 text-center soft-shadow"
              >
                <strong className="block text-2xl font-black text-zinc-950">{stat.value}</strong>
                <span className="mt-1 block text-xs font-bold leading-4 text-zinc-600">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: imageY }} initial={{ opacity: 0, scale: 0.9, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} className="relative">
          <motion.div className="absolute -inset-4 rounded-[3rem] bg-[#eaa98e]/30 blur-2xl" animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 4.5, repeat: Infinity }} />
          <motion.div whileHover={{ rotate: -1.5, scale: 1.015 }} className="soft-shadow relative overflow-hidden rounded-[2.5rem] border-8 border-white bg-white">
            <img src={profile.heroImage} alt="Imagem principal de Vitória Boso" className="h-[520px] w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="card-glass absolute -bottom-7 left-4 right-4 rounded-3xl p-5 soft-shadow sm:left-auto sm:right-8 sm:w-72"
          >
            <p className="text-sm font-bold text-zinc-500">Especialidade</p>
            <p className="mt-1 text-xl font-black text-zinc-950">Design delicado, moderno e memorável.</p>
          </motion.div>
          <motion.div animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-3 top-12 rounded-3xl bg-zinc-950 px-4 py-3 text-sm font-black text-white soft-shadow">
            ✦ Criativo
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
