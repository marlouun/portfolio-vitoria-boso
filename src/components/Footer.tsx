import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="border-t border-[#c8d4e0] py-8">
      <div className="container-page flex flex-col gap-3 text-sm font-semibold text-[#122d48]/65 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.</p>
        <p>Desenvolvido por Marlon Albino.</p>
      </div>
    </footer>
  );
}
