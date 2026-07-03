import { useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Trabalhos' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-[#fff7f2]/72 backdrop-blur-2xl"
    >
      <nav className="container-page flex h-20 items-center justify-between">
        <a href="#inicio" className="focus-ring rounded-full text-lg font-black tracking-tight">
          Vitória<span className="text-[#c86d4c]">.</span>
        </a>

        <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/55 p-1 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-white hover:text-[#c86d4c]">
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contato" className="focus-ring hidden rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#c86d4c] md:inline-flex">
          Fale comigo
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex rounded-full border border-zinc-200 bg-white p-3 text-zinc-950 md:hidden"
          aria-label="Abrir menu"
        >
          <span className="text-xl leading-none">☰</span>
        </button>
      </nav>

      {open && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="container-page pb-5 md:hidden">
          <div className="card-glass flex flex-col gap-2 rounded-3xl p-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-bold text-zinc-800 transition hover:bg-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
