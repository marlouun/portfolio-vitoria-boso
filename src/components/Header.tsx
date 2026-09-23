import { useState } from 'react';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Trabalhos' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header-enter fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-[#fff7f2]/78 backdrop-blur-xl">
      <nav className="container-page flex h-20 items-center justify-between">
        <a href="#inicio" className="focus-ring rounded-full text-lg font-black tracking-tight">
          Vitória<span className="text-[#c86d4c]">.</span>
        </a>

        <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/60 p-1 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring rounded-full px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-[#c86d4c] hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contato" className="magnetic-btn focus-ring hidden rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 md:inline-flex">
          Falar agora
        </a>

        <button
          type="button"
          className="focus-ring rounded-full bg-zinc-950 px-4 py-3 text-sm font-black text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-page pb-5 md:hidden">
          <div className="rounded-3xl border border-white/70 bg-white/92 p-3 shadow-2xl">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-bold text-zinc-800 hover:bg-[#fff1eb]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
