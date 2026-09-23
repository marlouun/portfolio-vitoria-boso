import { useState } from 'react';
import { profile } from '../data/profile';

const links = [
  { href: '#sobre', label: 'O olhar' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header-enter fixed inset-x-0 top-0 z-50 border-b border-black/8 bg-[#f3f0ea]/88 backdrop-blur-xl">
      <nav className="container-page flex h-20 items-center justify-between">
        <a href="#inicio" className="focus-ring rounded-sm font-editorial text-xl tracking-[-0.03em] text-[#191714]">
          frames by vi.
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-sm text-xs font-semibold uppercase tracking-[0.18em] text-[#625e57] transition hover:text-[#191714]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={profile.instagram}
          target="_blank"
          rel="noreferrer"
          className="focus-ring hidden rounded-full border border-[#191714] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#191714] transition hover:bg-[#191714] hover:text-[#f3f0ea] md:inline-flex"
        >
          Instagram ↗
        </a>

        <button
          type="button"
          className="focus-ring rounded-full border border-[#191714] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#191714] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-page pb-5 md:hidden">
          <div className="border-t border-black/10 bg-[#f3f0ea] pt-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-black/8 py-4 font-editorial text-2xl text-[#191714]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.16em]"
            >
              {profile.instagramLabel} ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
