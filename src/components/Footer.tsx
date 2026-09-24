import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="border-t border-[#efd7cc] py-8">
      <div className="container-page flex flex-col gap-3 text-sm font-semibold text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.</p>
        <p>Desenvolvido por Marlon Albino.</p>
      </div>
    </footer>
  );
}
