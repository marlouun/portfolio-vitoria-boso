import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section id="sobre" className="py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal direction="right" className="relative">
          <motion.div className="absolute -inset-4 rounded-[2.5rem] bg-[#f2c6b6]/40 blur-2xl" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 5, repeat: Infinity }} />
          <motion.img
            whileHover={{ rotate: 1.5, scale: 1.02 }}
            src={profile.profileImage}
            alt="Foto de perfil de Vitória Boso"
            className="soft-shadow relative aspect-square w-full rounded-[2.5rem] border-8 border-white object-cover"
          />
        </Reveal>

        <Reveal direction="left" delay={0.08}>
          <div className="card-glass rounded-[2rem] p-7 soft-shadow sm:p-10">
            <p className="section-kicker">Sobre ela</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">Criatividade com identidade e cuidado em cada detalhe.</h2>
            <p className="mt-6 text-lg leading-8 text-zinc-700">{profile.shortBio}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: '♡', title: 'Estilo autoral', text: 'Uma apresentação pensada para valorizar imagens, história e personalidade.' },
                { icon: '⌖', title: profile.location, text: 'Aberta para projetos, parcerias e novas oportunidades criativas.' },
              ].map((item, index) => (
                <motion.div key={item.title} whileHover={{ y: -8, rotate: index === 0 ? -1 : 1 }} className="rounded-3xl bg-white p-5 transition">
                  <span className="text-2xl text-[#c86d4c]" aria-hidden="true">{item.icon}</span>
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
