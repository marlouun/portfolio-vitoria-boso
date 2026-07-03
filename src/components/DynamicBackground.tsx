import { motion } from 'framer-motion';

export function DynamicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#fff7f2]">
      <motion.div
        className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#f2c6b6]/70 blur-3xl"
        animate={{ x: [0, 80, 20, 0], y: [0, 40, 120, 0], scale: [1, 1.18, 0.95, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[#eaa98e]/45 blur-3xl"
        animate={{ x: [0, -70, -20, 0], y: [0, -55, 70, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#ffd9c8]/60 blur-3xl"
        animate={{ x: [0, 50, -60, 0], y: [0, -80, -20, 0], scale: [1, 1.12, 1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,247,242,0.35)_35%,rgba(255,247,242,0.95)_72%)]" />
      <div className="absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(200,109,76,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(200,109,76,0.10)_1px,transparent_1px)] [background-size:52px_52px]" />
    </div>
  );
}
