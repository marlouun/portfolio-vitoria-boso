import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="pb-10">
      <div className="container-page flex flex-col gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#777168] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.brand} — fotografia por {profile.name}</p>
        <a
          href={profile.instagram}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-[#191714]"
        >
          {profile.instagramLabel}
        </a>
      </div>
    </footer>
  );
}
