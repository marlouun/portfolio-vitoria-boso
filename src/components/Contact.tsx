import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { Reveal } from './Reveal';

export function Contact() {
  const links = [
    { href: profile.whatsapp, label: 'WhatsApp', icon: '☏' },
    { href: profile.instagram, label: 'Instagram', icon: '◎' },
    { href: `mailto:${profile.email}`, label: profile.email, icon: '✉' },
  ];

  return (
    <section id="contato" className="py-20">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#c86d4c] p-8 text-white soft-shadow sm:p-12 lg:p-16">
            <motion.div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 5, repeat: Infinity }} />
            <motion.div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-zinc-950/20 blur-3xl" animate={{ x: [0, 80, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white/75">Contato</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Gostou do trabalho? Vamos transformar ideias em presença visual.</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">Atualize os links de WhatsApp, Instagram e e-mail em <strong>src/data/profile.ts</strong>.</p>
              </div>

              <div className="grid gap-3">
                {links.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.55 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="focus-ring flex items-center gap-4 rounded-3xl bg-white p-5 font-black text-zinc-950 transition"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="text-2xl text-[#c86d4c]" aria-hidden="true">{link.icon}</span> {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
