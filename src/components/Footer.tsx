import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="border-t border-[#27384f]/10 py-12 text-center">
      <img src={`${import.meta.env.BASE_URL}brand/monogram-navy.png`} alt="Monograma VB" className="mx-auto h-14 w-auto" width="728" height="507" />
      <p className="font-script mt-3 text-3xl text-[#6f8aa6]">Registrar aquilo que merece permanecer</p>
      <a href="?area=cliente" className="focus-ring mt-6 inline-block rounded-full border border-[#27384f]/25 px-5 py-2 text-sm font-medium text-[#27384f] transition hover:bg-[#27384f] hover:text-white">
        Área do cliente
      </a>
      <div className="container-page mt-8 flex flex-col gap-2 text-sm text-[#27384f]/65">
        <p>© {new Date().getFullYear()} {profile.name} Fotografia. Todos os direitos reservados.</p>
        <p>Desenvolvido por Marlon Albino.</p>
      </div>
    </footer>
  );
}
