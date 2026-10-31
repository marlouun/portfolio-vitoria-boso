import { useEffect, useState } from 'react';
import { daysUntilChristmas } from '../data/natal';

const base = import.meta.env.BASE_URL;

const links = [
  { href: '#natal', label: 'Natal de Outrora', highlight: true },
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Trabalhos' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const days = daysUntilChristmas();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="header-enter fixed inset-x-0 top-0 z-50">
      <a
        href="#natal"
        className="flex items-center justify-center gap-2 whitespace-nowrap bg-gradient-to-r from-[#5a1220] via-[#7a1b2c] to-[#1f3d2e] px-3 py-2 text-center text-[0.64rem] font-medium uppercase tracking-[0.14em] sm:text-[0.72rem] sm:tracking-[0.18em] text-[#fbeccb]"
      >
        <span className="sparkle text-[#e8c677]" aria-hidden="true">✦</span>
        <span>Natal de Outrora · reservas abertas</span>
        {days > 0 && <span className="hidden sm:inline">· faltam {days} dias</span>}
        <span className="sparkle text-[#e8c677]" aria-hidden="true">✦</span>
      </a>

      <div className={`border-b transition duration-300 ${scrolled ? 'border-[#27384f]/10 bg-[#fbf8f1]/97 backdrop-blur-xl' : 'border-transparent bg-[#fbf8f1]/97'}`}>
        <nav className="container-page flex h-[4.25rem] items-center justify-between">
          <a href="#inicio" className="focus-ring rounded-md" aria-label="Vitória Boso Fotografia — início">
            <img src={`${base}brand/logo-navy.png`} alt="Vitória Boso Fotografia" className="h-11 w-auto sm:h-12" width="569" height="288" />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-medium tracking-wide transition ${
                  link.highlight ? 'bg-[#5a1220] text-[#fbeccb] hover:bg-[#7a1b2c]' : 'text-[#27384f]/80 hover:bg-[#27384f] hover:text-white'
                }`}
              >
                {link.highlight && <span className="mr-1 text-[#e8c677]">✦</span>}
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="focus-ring flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-[#27384f] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className={`h-px w-5 bg-white transition ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-white transition ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </nav>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 top-0 z-[-1] flex flex-col bg-[#27384f] px-8 pb-10 pt-32 text-[#fbf8f1] lg:hidden">
          <img src={`${base}brand/monogram-cream.png`} alt="" aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-6 w-72 opacity-[0.07]" />
          <ul className="relative space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-display block border-b border-white/10 py-4 text-3xl ${link.highlight ? 'text-[#e8c677]' : ''}`}
                >
                  {link.highlight && <span className="mr-2 text-xl">✦</span>}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-script relative mt-auto text-3xl text-[#dcbe7e]">Registrar aquilo que merece permanecer</p>
        </div>
      )}
    </header>
  );
}
