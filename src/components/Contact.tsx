import { profile } from '../data/profile';
import { Reveal } from './Reveal';

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.6 8.1c.2-.4.4-.4.7-.4h.4c.1 0 .3 0 .4.3l.7 1.7c.1.3.1.5-.1.7l-.5.6c-.2.2-.2.4 0 .7.5.9 1.2 1.6 2 2.1.3.2.5.2.7 0l.7-.8c.2-.2.4-.3.7-.2l1.6.8c.3.1.4.3.4.5 0 .3-.1 1.2-.6 1.6-.5.5-1.2.8-2 .8-.7 0-1.6-.2-3-1-2.3-1.3-3.8-3.7-3.9-3.9-.1-.2-.9-1.2-.9-2.3 0-.6.3-1 .7-1.3Z" />
    </svg>
  );
}

export function Contact() {
  const links = [
    { href: profile.whatsapp, label: 'Falar no WhatsApp', icon: 'whatsapp' },
    { href: profile.instagram, label: '@_framesby.vi', icon: 'instagram' },
    { href: profile.highlights, label: 'Destaques no Instagram', icon: '✦' },
    { href: '#projetos', label: 'Ver projetos', icon: '↗' },
  ];

  return (
    <section id="contato" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#c86d4c] p-8 text-white soft-shadow sm:p-12 lg:p-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/16 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-zinc-950/16 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white/75">Contato</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Gostou do olhar da Vitória? Vamos conversar sobre a sua história.</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">Acompanhe mais trabalhos, registros e bastidores pelo Instagram ou fale diretamente com a Vitória pelo WhatsApp.</p>
              </div>

              <div className="grid gap-3">
                {links.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="focus-ring contact-link flex items-center gap-4 rounded-3xl bg-white p-5 font-black text-zinc-950 transition duration-300 hover:translate-x-2"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    style={{ transitionDelay: `${index * 0.03}s` }}
                  >
                    <span className="flex h-7 w-7 items-center justify-center text-2xl text-[#c86d4c]" aria-hidden="true">
                      {link.icon === 'instagram' ? <InstagramIcon /> : link.icon === 'whatsapp' ? <WhatsAppIcon /> : link.icon}
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
