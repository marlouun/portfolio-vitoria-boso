import { useCallback, useEffect, useMemo, useState } from 'react';
import { WHATSAPP_VITORIA, buscarFotos, dataBR, miniatura, reais, resumoSelecao, supabase, whatsapp } from './supabase';
import type { Foto, Galeria, Perfil } from './supabase';
import { Aviso, Botao, Carregando, FotoProtegida, SeloStatus, Shell } from './ui';

type Props = {
  galeria: Galeria;
  perfil: Perfil;
  onSair: () => void;
  onVoltar?: () => void;
  onFinalizada: () => void;
};

export function GaleriaSelecao({ galeria, perfil, onSair, onVoltar, onFinalizada }: Props) {
  const [fotos, setFotos] = useState<Foto[] | null>(null);
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState<'todas' | 'selecionadas'>('todas');
  const [aberta, setAberta] = useState<number | null>(null);
  const [confirmando, setConfirmando] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const [status, setStatus] = useState(galeria.status);
  const [recado, setRecado] = useState('');
  const [avisar, setAvisar] = useState(true);
  const [recadoEnviado, setRecadoEnviado] = useState(galeria.recado ?? '');

  const podeEditar = status === 'aberta';

  useEffect(() => {
    buscarFotos(galeria.id)
      .then(setFotos)
      .catch(() => setErro('Não foi possível carregar as fotos.'));
  }, [galeria.id]);

  const visiveis = useMemo(() => (fotos ?? []).filter((f) => filtro === 'todas' || f.selecionada), [fotos, filtro]);
  const marcadas = useMemo(() => (fotos ?? []).filter((f) => f.selecionada), [fotos]);
  const resumo = resumoSelecao(galeria, marcadas.length);

  const alternar = useCallback(
    async (foto: Foto) => {
      if (!podeEditar) return;
      const novo = !foto.selecionada;
      setErro('');
      setFotos((atual) => atual?.map((f) => (f.id === foto.id ? { ...f, selecionada: novo } : f)) ?? null);
      const { error, count } = await supabase.from('fotos').update({ selecionada: novo }, { count: 'exact' }).eq('id', foto.id);
      if (error || count === 0) {
        setFotos((atual) => atual?.map((f) => (f.id === foto.id ? { ...f, selecionada: !novo } : f)) ?? null);
        setErro('Não foi possível salvar essa escolha. Confira sua internet e tente de novo.');
      }
    },
    [podeEditar],
  );

  const mensagemVitoria = (texto: string) =>
    [
      `Oi, Vitória! Finalizei a seleção da galeria "${galeria.titulo}".`,
      `${resumo.selecionadas} fotos escolhidas (${resumo.incluidas} do pacote${resumo.extras ? ` + ${resumo.extras} extras = ${reais(resumo.total)}` : ''}).`,
      ...(texto.trim() ? ['', `Recado: ${texto.trim()}`] : []),
      '',
      ...marcadas.map((f) => f.nome),
    ].join('\n');

  async function finalizar() {
    // A janela do WhatsApp precisa abrir no mesmo clique; senão o navegador bloqueia.
    const janela = avisar ? window.open('', '_blank') : null;
    setFinalizando(true);
    const { error } = await supabase.rpc('finalizar_galeria', { p_galeria: galeria.id, p_recado: recado.trim() || null });
    setFinalizando(false);
    setConfirmando(false);
    if (error) {
      janela?.close();
      return setErro('Não foi possível finalizar. Tente de novo.');
    }
    if (janela) janela.location.href = whatsapp(WHATSAPP_VITORIA, mensagemVitoria(recado));
    setRecadoEnviado(recado.trim());
    setStatus('finalizada');
    setFiltro('selecionadas');
    onFinalizada();
  }

  // Navegação da foto ampliada pelas setas do teclado.
  useEffect(() => {
    if (aberta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberta(null);
      if (e.key === 'ArrowRight') setAberta((i) => (i === null ? i : Math.min(visiveis.length - 1, i + 1)));
      if (e.key === 'ArrowLeft') setAberta((i) => (i === null ? i : Math.max(0, i - 1)));
    };
    window.addEventListener('keydown', tecla);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', tecla);
      document.body.style.overflow = '';
    };
  }, [aberta, visiveis.length]);

  // Proteção das prévias: borra as fotos quando a janela perde o foco (ferramentas de recorte,
  // troca de aplicativo) e bloqueia os atalhos de salvar, imprimir e print.
  const [oculta, setOculta] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const esconder = () => setOculta(true);
    const mostrar = () => {
      if (!document.hidden) setOculta(false);
    };
    const visibilidade = () => {
      if (document.hidden) setOculta(true);
    };
    const tecla = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const atalho = (e.ctrlKey || e.metaKey) && (k === 's' || k === 'p' || (e.shiftKey && (k === 's' || k === '3' || k === '4' || k === '5')));
      if (k === 'printscreen' || atalho) {
        e.preventDefault();
        setOculta(true);
        navigator.clipboard?.writeText('').catch(() => undefined);
        clearTimeout(timer);
        timer = setTimeout(() => setOculta(false), 1500);
      }
    };
    window.addEventListener('blur', esconder);
    window.addEventListener('focus', mostrar);
    document.addEventListener('visibilitychange', visibilidade);
    window.addEventListener('keydown', tecla);
    window.addEventListener('keyup', tecla);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('blur', esconder);
      window.removeEventListener('focus', mostrar);
      document.removeEventListener('visibilitychange', visibilidade);
      window.removeEventListener('keydown', tecla);
      window.removeEventListener('keyup', tecla);
    };
  }, []);

  const fotoAberta = aberta !== null ? visiveis[aberta] : undefined;

  return (
    <Shell nome={perfil.nome} onSair={onSair} largo>
      <div className={`area-protegida ${oculta ? 'fotos-ocultas' : ''}`} onContextMenu={(e) => e.preventDefault()}>
      {onVoltar && (
        <button type="button" onClick={onVoltar} className="focus-ring mb-6 rounded-full text-sm font-medium text-[#27384f]/70 hover:text-[#27384f]">
          ← Todas as galerias
        </button>
      )}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SeloStatus status={status} />
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{galeria.titulo}</h1>
          <p className="mt-2 text-[#27384f]/70">
            Seu pacote inclui <strong>{galeria.fotos_incluidas} fotos</strong>. Cada foto extra custa <strong>{reais(Number(galeria.valor_extra))}</strong>.
            {podeEditar && galeria.prazo && <> Escolha até <strong>{dataBR(galeria.prazo)}</strong>.</>}
          </p>
          {podeEditar && <p className="mt-1 text-sm text-[#27384f]/55">Toque no coração para escolher. Toque na foto para ver maior. Suas escolhas são salvas na hora.</p>}
        </div>
        <div className="flex gap-2" role="tablist" aria-label="Filtrar fotos">
          {(['todas', 'selecionadas'] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filtro === f}
              onClick={() => setFiltro(f)}
              className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition ${filtro === f ? 'bg-[#27384f] text-white' : 'border border-[#27384f]/20 bg-white text-[#27384f]'}`}
            >
              {f === 'todas' ? `Todas (${fotos?.length ?? 0})` : `Selecionadas (${marcadas.length})`}
            </button>
          ))}
        </div>
      </div>

      {status === 'finalizada' && (
        <div className="mb-8 rounded-2xl border border-[#1f3d2e]/20 bg-white p-5 sm:p-6">
          <p className="section-kicker !text-[#1f3d2e]">Seleção concluída</p>
          <p className="font-display mt-2 text-3xl">Obrigada pelas suas escolhas!</p>
          <p className="mt-2 text-[#27384f]/70">
            A Vitória já consegue ver as {resumo.selecionadas} fotos escolhidas
            {resumo.extras > 0 ? `, com ${resumo.extras} extra${resumo.extras === 1 ? '' : 's'} (${reais(resumo.total)})` : ''}.
          </p>
          {recadoEnviado && <p className="mt-3 rounded-xl bg-[#fbf8f1] px-4 py-3 text-sm italic text-[#27384f]/80">“{recadoEnviado}”</p>}
          <a
            className="btn btn-navy mt-5 !px-5 !py-2.5 !text-sm"
            href={whatsapp(WHATSAPP_VITORIA, mensagemVitoria(recadoEnviado))}
            target="_blank"
            rel="noreferrer"
          >
            Avisar a Vitória pelo WhatsApp
          </a>
        </div>
      )}
      {erro && <div className="mb-6"><Aviso>{erro}</Aviso></div>}
      {!fotos && !erro && <Carregando />}
      {fotos && visiveis.length === 0 && <Aviso tipo="info">{filtro === 'selecionadas' ? 'Você ainda não escolheu nenhuma foto.' : 'Esta galeria ainda não tem fotos.'}</Aviso>}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
        {visiveis.map((foto, i) => (
          <figure key={foto.id} className={`group relative overflow-hidden rounded-xl bg-[#27384f]/10 ${foto.selecionada ? 'ring-4 ring-[#dcbe7e]' : ''}`}>
            <button type="button" onClick={() => setAberta(i)} className="focus-ring block w-full" aria-label={`Ver ${foto.nome} maior`}>
              <FotoProtegida src={miniatura(foto.drive_id, 600)} alt={foto.nome} lazy imgClassName="aspect-square w-full object-cover" />
            </button>
            {(podeEditar || foto.selecionada) && (
              <button
                type="button"
                onClick={() => alternar(foto)}
                disabled={!podeEditar}
                aria-pressed={foto.selecionada}
                aria-label={foto.selecionada ? `Desmarcar ${foto.nome}` : `Escolher ${foto.nome}`}
                className={`focus-ring absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full text-lg shadow-lg transition ${
                  foto.selecionada ? 'bg-[#dcbe7e] text-[#27384f]' : 'bg-white/90 text-[#27384f]/70 hover:text-[#27384f]'
                }`}
              >
                {foto.selecionada ? '♥' : '♡'}
              </button>
            )}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/55 to-transparent px-2 pb-1.5 pt-4 text-[0.7rem] text-white/90">
              {foto.nome}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Barra fixa com o resumo da seleção */}
      {fotos && fotos.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#27384f]/10 bg-[#fbf8f1]/95 backdrop-blur">
          <div className="mx-auto flex w-[min(1280px,calc(100%-32px))] flex-wrap items-center justify-between gap-3 py-3">
            <p className="text-sm">
              <strong className="text-base">{resumo.selecionadas}</strong> escolhida{resumo.selecionadas === 1 ? '' : 's'} ·{' '}
              {resumo.extras > 0 ? (
                <>
                  {resumo.incluidas} do pacote + <strong>{resumo.extras} extra{resumo.extras === 1 ? '' : 's'} = {reais(resumo.total)}</strong>
                </>
              ) : (
                <>faltam {resumo.faltam} para completar o pacote</>
              )}
            </p>
            {podeEditar && (
              <Botao variante="gold" onClick={() => setConfirmando(true)} disabled={resumo.selecionadas === 0}>
                Finalizar seleção
              </Botao>
            )}
          </div>
        </div>
      )}

      {confirmando && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1c2a3d]/60 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="confirmar-titulo">
          <div className="w-full max-w-md rounded-2xl bg-[#fbf8f1] p-6 shadow-2xl">
            <h2 id="confirmar-titulo" className="text-3xl">Finalizar seleção?</h2>
            <p className="mt-3 text-[#27384f]/75">
              Você escolheu <strong>{resumo.selecionadas} fotos</strong>: {resumo.incluidas} do pacote
              {resumo.extras > 0 && (
                <>
                  {' '}e {resumo.extras} extra{resumo.extras === 1 ? '' : 's'}, no valor de <strong>{reais(resumo.total)}</strong>
                </>
              )}
              .
            </p>
            {resumo.faltam > 0 && <p className="mt-2 text-sm text-[#8a2a2a]">Ainda dá para escolher mais {resumo.faltam} sem custo.</p>}
            <p className="mt-2 text-sm text-[#27384f]/60">Depois de finalizar não é possível alterar. Se precisar, fale com a Vitória.</p>

            <label className="mt-5 block">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#27384f]/70">Recado para a Vitória (opcional)</span>
              <textarea
                value={recado}
                onChange={(e) => setRecado(e.target.value)}
                maxLength={1000}
                rows={3}
                placeholder="Ex.: Amei as fotos! Gostaria da IMG_7116 também em preto e branco."
                className="mt-1.5 w-full resize-none rounded-xl border border-[#27384f]/20 bg-white px-4 py-3 text-base outline-none focus:border-[#27384f] focus:ring-2 focus:ring-[#dcbe7e]/60"
              />
            </label>
            <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm">
              <input type="checkbox" checked={avisar} onChange={(e) => setAvisar(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#27384f]" />
              <span>
                <strong>Avisar a Vitória pelo WhatsApp</strong>
                <span className="block text-[#27384f]/60">Abre o WhatsApp com a mensagem pronta e a lista das fotos.</span>
              </span>
            </label>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Botao variante="ghost" onClick={() => setConfirmando(false)}>Voltar</Botao>
              <Botao variante="gold" onClick={finalizar} carregando={finalizando}>Finalizar seleção</Botao>
            </div>
          </div>
        </div>
      )}

      {fotoAberta && aberta !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0f1722]/95 text-white" role="dialog" aria-modal="true" aria-label={fotoAberta.nome}>
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
            <span className="truncate text-white/80">
              {aberta + 1} / {visiveis.length} · {fotoAberta.nome}
            </span>
            <button type="button" onClick={() => setAberta(null)} className="focus-ring rounded-full border border-white/30 px-4 py-1.5">Fechar</button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2">
            <FotoProtegida
              key={fotoAberta.id}
              src={miniatura(fotoAberta.drive_id, 1200)}
              alt={fotoAberta.nome}
              className="inline-block"
              imgClassName="max-h-[calc(100dvh-9.5rem)] max-w-[calc(100vw-1rem)] object-contain"
            />
            <button type="button" onClick={() => setAberta(Math.max(0, aberta - 1))} disabled={aberta === 0} aria-label="Foto anterior" className="focus-ring absolute left-2 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/15 text-2xl disabled:opacity-30">‹</button>
            <button type="button" onClick={() => setAberta(Math.min(visiveis.length - 1, aberta + 1))} disabled={aberta === visiveis.length - 1} aria-label="Próxima foto" className="focus-ring absolute right-2 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/15 text-2xl disabled:opacity-30">›</button>
          </div>
          <div className="flex items-center justify-center gap-3 px-4 py-4">
            {podeEditar ? (
              <Botao variante={fotoAberta.selecionada ? 'gold' : 'ghost'} onClick={() => alternar(fotoAberta)} className="min-w-48">
                {fotoAberta.selecionada ? '♥ Escolhida' : '♡ Escolher esta foto'}
              </Botao>
            ) : (
              fotoAberta.selecionada && <span className="text-[#dcbe7e]">♥ Escolhida</span>
            )}
          </div>
        </div>
      )}
      {oculta && (
        <div className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex justify-center px-4">
          <span className="rounded-full bg-[#27384f] px-5 py-2 text-sm text-white shadow-lg">As prévias ficam ocultas fora da tela. Clique na página para voltar.</span>
        </div>
      )}
      </div>
    </Shell>
  );
}
