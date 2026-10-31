import { profile } from '../data/profile';
import { Reveal } from './Reveal';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
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
    { href: '#natal', label: 'Natal de Outrora', icon: '❄' },
  ];

  return (
    <section id="contato" className="py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-[#27384f] p-7 text-[#fbf8f1] shadow-[0_30px_80px_rgba(39,56,79,0.3)] sm:p-12 lg:p-16">
            <img src={`${import.meta.env.BASE_URL}brand/monogram-cream.png`} alt="" aria-hidden="true" className="pointer-events-none absolute -right-16 -top-10 w-80 opacity-[0.06]" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div className="text-center lg:text-left">
                <p className="section-kicker !text-[#dcbe7e]">Contato</p>
                <h2 className="mt-4 text-4xl leading-[1.05] sm:text-6xl">Gostou do olhar da Vitória?</h2>
                <p className="font-script mt-2 text-4xl text-[#dcbe7e] sm:text-5xl">Vamos conversar sobre a sua história.</p>
                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#fbf8f1]/80 lg:mx-0">
                  Acompanhe mais trabalhos, registros e bastidores pelo Instagram ou fale diretamente com a Vitória pelo WhatsApp.
                </p>
              </div>

              <div className="grid gap-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="focus-ring flex min-h-14 items-center gap-4 rounded-2xl bg-[#fbf8f1] px-5 py-4 font-medium text-[#27384f] transition duration-300 hover:translate-x-1.5"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="flex h-7 w-7 items-center justify-center text-xl text-[#c99a4a]" aria-hidden="true">
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
