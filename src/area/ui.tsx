import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';

const base = import.meta.env.BASE_URL;

type ShellProps = {
  children: ReactNode;
  nome?: string;
  onSair?: () => void;
  largo?: boolean;
};

export function Shell({ children, nome, onSair, largo }: ShellProps) {
  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#27384f]">
      <header className="sticky top-0 z-40 border-b border-[#27384f]/10 bg-[#27384f] text-[#fbf8f1]">
        <div className={`${largo ? 'w-[min(1280px,calc(100%-32px))]' : 'container-page'} mx-auto flex h-16 items-center justify-between gap-3`}>
          <a href="./" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Voltar ao portfólio">
            <img src={`${base}brand/monogram-cream.png`} alt="" className="h-8 w-auto" width="728" height="507" />
            <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.28em] sm:inline">Área do cliente</span>
          </a>
          {onSair && (
            <div className="flex items-center gap-3 text-sm">
              {nome && <span className="hidden text-[#fbf8f1]/75 sm:inline">Olá, {nome.split(' ')[0]}</span>}
              <button type="button" onClick={onSair} className="focus-ring rounded-full border border-[#fbf8f1]/30 px-4 py-1.5 transition hover:bg-[#fbf8f1]/10">
                Sair
              </button>
            </div>
          )}
        </div>
      </header>
      <main className={`${largo ? 'w-[min(1280px,calc(100%-32px))]' : 'container-page'} mx-auto pb-28 pt-8 sm:pt-12`}>{children}</main>
    </div>
  );
}

export function Titulo({ kicker, children, sub }: { kicker?: string; children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="mb-8">
      {kicker && <p className="section-kicker">{kicker}</p>}
      <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">{children}</h1>
      {sub && <div className="mt-3 max-w-2xl text-[#27384f]/70">{sub}</div>}
    </div>
  );
}

type CampoProps = InputHTMLAttributes<HTMLInputElement> & { rotulo: string; ajuda?: string };

export function Campo({ rotulo, ajuda, className = '', ...props }: CampoProps) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#27384f]/70">{rotulo}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-[#27384f]/20 bg-white px-4 py-3 text-base text-[#27384f] outline-none transition focus:border-[#27384f] focus:ring-2 focus:ring-[#dcbe7e]/60"
      />
      {ajuda && <span className="mt-1 block text-xs text-[#27384f]/55">{ajuda}</span>}
    </label>
  );
}

type BotaoProps = ButtonHTMLAttributes<HTMLButtonElement> & { variante?: 'navy' | 'gold' | 'ghost' | 'perigo'; carregando?: boolean };

export function Botao({ variante = 'navy', carregando, children, className = '', disabled, ...props }: BotaoProps) {
  const estilos = {
    navy: 'bg-[#27384f] text-white hover:bg-[#1c2a3d]',
    gold: 'bg-gradient-to-br from-[#ecd49a] to-[#d3ae62] text-[#2a1a10] hover:brightness-105',
    ghost: 'border border-[#27384f]/25 bg-white/70 text-[#27384f] hover:bg-white',
    perigo: 'border border-[#8a2a2a]/40 bg-white text-[#8a2a2a] hover:bg-[#8a2a2a] hover:text-white',
  }[variante];
  return (
    <button
      {...props}
      disabled={disabled || carregando}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50 ${estilos} ${className}`}
    >
      {carregando ? 'Aguarde…' : children}
    </button>
  );
}

export function Aviso({ tipo = 'erro', children }: { tipo?: 'erro' | 'ok' | 'info'; children: ReactNode }) {
  const cores = {
    erro: 'border-[#8a2a2a]/30 bg-[#8a2a2a]/5 text-[#8a2a2a]',
    ok: 'border-[#1f3d2e]/30 bg-[#1f3d2e]/5 text-[#1f3d2e]',
    info: 'border-[#27384f]/20 bg-white text-[#27384f]/80',
  }[tipo];
  return (
    <div role={tipo === 'erro' ? 'alert' : 'status'} className={`rounded-xl border px-4 py-3 text-sm ${cores}`}>
      {children}
    </div>
  );
}

export function Cartao({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-[#27384f]/10 bg-white p-5 shadow-[0_10px_30px_rgba(39,56,79,0.06)] sm:p-6 ${className}`}>{children}</div>;
}

export function Carregando() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-[#27384f]/60" role="status">
      <span className="font-script text-3xl">Carregando…</span>
    </div>
  );
}

// Copia o texto e mostra "Copiado!" por um instante.
export function BotaoCopiar({ texto, rotulo = 'Copiar' }: { texto: string; rotulo?: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <Botao
      type="button"
      variante="ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(texto);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 1800);
        } catch {
          setCopiado(false);
        }
      }}
    >
      {copiado ? 'Copiado!' : rotulo}
    </Botao>
  );
}

export function SeloStatus({ status }: { status: 'aberta' | 'finalizada' | 'arquivada' }) {
  const mapa = {
    aberta: ['Aguardando seleção', 'bg-[#dcbe7e]/25 text-[#7a5a1c]'],
    finalizada: ['Seleção concluída', 'bg-[#1f3d2e]/10 text-[#1f3d2e]'],
    arquivada: ['Arquivada', 'bg-[#27384f]/10 text-[#27384f]/70'],
  } as const;
  const [texto, cor] = mapa[status];
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${cor}`}>{texto}</span>;
}
