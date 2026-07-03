import { motion } from 'framer-motion';

const words = ['Portfólio', 'Design', 'Fotografia', 'Identidade', 'Criatividade', 'Mobile-first'];

export function Marquee() {
  const content = [...words, ...words, ...words, ...words];

  return (
    <div className="relative overflow-hidden border-y border-[#edd4c8] bg-white/55 py-4 backdrop-blur-xl">
      <motion.div
        className="flex w-max gap-4 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {content.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.22em] text-[#a95436]">
            {word}
            <span className="text-[#e3a187]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
