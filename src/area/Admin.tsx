import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { AREA_URL, buscarFotos, chamarAdmin, dataBR, miniatura, reais, resumoSelecao, supabase, whatsapp } from './supabase';
import type { Foto, FotoDrive, Galeria, Perfil } from './supabase';
import { Aviso, Botao, BotaoCopiar, Campo, CampoBusca, Carregando, Cartao, SeloStatus, Shell, Titulo, contem } from './ui';

type Dados = { clientes: Perfil[]; galerias: Galeria[]; fotos: Foto[] };

function mensagemAcesso(nome: string, email: string, senha: string) {
  return [
    `Olá, ${nome.split(' ')[0]}! Aqui é a Vitória Boso.`,
    'Suas fotos vão ficar na minha área do cliente:',
    AREA_URL,
    '',
    `Email: ${email}`,
    `Senha provisória: ${senha}`,
    '',
    'No primeiro acesso você vai criar a sua própria senha.',
  ].join('\n');
}

function mensagemGaleria(cliente: Perfil, g: Galeria) {
  return [
    `Olá, ${cliente.nome.split(' ')[0]}! Suas fotos de "${g.titulo}" já estão na área do cliente:`,
    AREA_URL,
    '',
    `Seu pacote inclui ${g.fotos_incluidas} fotos. Cada foto extra fica ${reais(Number(g.valor_extra))}.`,
    g.prazo ? `Faça sua seleção até ${dataBR(g.prazo)}.` : 'Escolha com calma e clique em "Finalizar seleção" quando terminar.',
  ].join('\n');
}

export function Admin({ perfil, onSair }: { perfil: Perfil; onSair: () => void }) {
  const [aba, setAba] = useState<'galerias' | 'clientes'>('galerias');
  const [dados, setDados] = useState<Dados | null>(null);
  const [erro, setErro] = useState('');
  const [detalhe, setDetalhe] = useState<string | null>(null);
  const [criandoGaleria, setCriandoGaleria] = useState(false);

  const carregar = useCallback(async () => {
    try {
      const [clientes, galerias, fotos] = await Promise.all([
        supabase.from('profiles').select('*').eq('is_admin', false).order('nome'),
        supabase.from('galerias').select('*').order('created_at', { ascending: false }),
        buscarFotos(),
      ]);
      if (clientes.error || galerias.error) throw new Error();
      setDados({ clientes: clientes.data as Perfil[], galerias: galerias.data as Galeria[], fotos });
    } catch {
      setErro('Não foi possível carregar o painel. Recarregue a página.');
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const galeriaDetalhe = dados?.galerias.find((g) => g.id === detalhe);

  return (
    <Shell nome={perfil.nome} onSair={onSair} largo>
      {erro && <Aviso>{erro}</Aviso>}
      {!dados && !erro && <Carregando />}

      {dados && galeriaDetalhe && (
        <DetalheGaleria
          galeria={galeriaDetalhe}
          cliente={dados.clientes.find((c) => c.id === galeriaDetalhe.cliente_id)}
          fotos={dados.fotos.filter((f) => f.galeria_id === galeriaDetalhe.id)}
          onVoltar={() => setDetalhe(null)}
          onMudou={carregar}
        />
      )}

      {dados && !galeriaDetalhe && criandoGaleria && (
        <NovaGaleria
          clientes={dados.clientes}
          onCancelar={() => setCriandoGaleria(false)}
          onCriada={async (id) => {
            await carregar();
            setCriandoGaleria(false);
            setDetalhe(id);
          }}
          onNovoCliente={() => {
            setCriandoGaleria(false);
            setAba('clientes');
          }}
        />
      )}

      {dados && !galeriaDetalhe && !criandoGaleria && (
        <>
          <Titulo kicker="Painel da Vitória">Área do cliente</Titulo>
          <div className="mb-8 flex gap-2" role="tablist">
            {(['galerias', 'clientes'] as const).map((a) => (
              <button
                key={a}
                type="button"
                role="tab"
                aria-selected={aba === a}
                onClick={() => setAba(a)}
                className={`focus-ring rounded-full px-5 py-2 text-sm font-semibold transition ${aba === a ? 'bg-[#27384f] text-white' : 'border border-[#27384f]/20 bg-white'}`}
              >
                {a === 'galerias' ? `Galerias (${dados.galerias.length})` : `Clientes (${dados.clientes.length})`}
              </button>
            ))}
          </div>
          {aba === 'galerias' ? (
            <ListaGalerias dados={dados} onAbrir={setDetalhe} onNova={() => setCriandoGaleria(true)} />
          ) : (
            <Clientes clientes={dados.clientes} galerias={dados.galerias} onMudou={carregar} />
          )}
        </>
      )}
    </Shell>
  );
}

function ListaGalerias({ dados, onAbrir, onNova }: { dados: Dados; onAbrir: (id: string) => void; onNova: () => void }) {
  const [busca, setBusca] = useState('');
  const clienteDe = (g: Galeria) => dados.clientes.find((c) => c.id === g.cliente_id);
  const encontradas = dados.galerias.filter((g) => contem([g.titulo, clienteDe(g)?.nome, clienteDe(g)?.email], busca));

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:w-96">
          <CampoBusca valor={busca} onMudar={setBusca} placeholder="Buscar por galeria ou cliente" />
        </div>
        <Botao variante="gold" onClick={onNova}>+ Nova galeria</Botao>
      </div>
      {dados.galerias.length === 0 && <Aviso tipo="info">Nenhuma galeria ainda. Cadastre o cliente e depois crie a galeria com o link da pasta do Drive.</Aviso>}
      {dados.galerias.length > 0 && encontradas.length === 0 && <Aviso tipo="info">Nenhuma galeria encontrada para “{busca}”.</Aviso>}
      <div className="space-y-3">
        {encontradas.map((g) => {
          const cliente = clienteDe(g);
          const fotos = dados.fotos.filter((f) => f.galeria_id === g.id);
          const r = resumoSelecao(g, fotos.filter((f) => f.selecionada).length);
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onAbrir(g.id)}
              className="focus-ring flex w-full items-center gap-4 rounded-2xl border border-[#27384f]/10 bg-white p-3 text-left transition hover:border-[#27384f]/30"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#27384f]/10">
                {fotos[0] && <img src={miniatura(fotos[0].drive_id, 200)} referrerPolicy="no-referrer" alt="" loading="lazy" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-xl">{g.titulo}</span>
                  <SeloStatus status={g.status} />
                </div>
                <p className="truncate text-sm text-[#27384f]/65">
                  {cliente?.nome ?? 'Cliente removido'} · {fotos.length} fotos · {r.selecionadas} escolhidas de {g.fotos_incluidas}
                  {r.extras > 0 && ` · ${r.extras} extras (${reais(r.total)})`}
                </p>
              </div>
              <span className="text-[#27384f]/40" aria-hidden="true">›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Clientes({ clientes, galerias, onMudou }: { clientes: Perfil[]; galerias: Galeria[]; onMudou: () => void }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [acesso, setAcesso] = useState<{ nome: string; email: string; telefone: string | null; senha: string } | null>(null);
  const [excluindo, setExcluindo] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const encontrados = clientes.filter((c) => contem([c.nome, c.email, c.telefone, c.telefone?.replace(/\D/g, '')], busca));

  async function criar(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setSalvando(true);
    try {
      const r = await chamarAdmin<{ senha: string }>({ acao: 'criar_cliente', nome, email, telefone });
      setAcesso({ nome: nome.trim(), email: email.trim().toLowerCase(), telefone: telefone.trim() || null, senha: r.senha });
      setNome('');
      setEmail('');
      setTelefone('');
      onMudou();
    } catch (falha) {
      setErro((falha as Error).message);
    }
    setSalvando(false);
  }

  async function novaSenha(c: Perfil) {
    setErro('');
    setOcupado(c.id);
    try {
      const r = await chamarAdmin<{ senha: string }>({ acao: 'nova_senha', id: c.id });
      setAcesso({ nome: c.nome, email: c.email, telefone: c.telefone, senha: r.senha });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (falha) {
      setErro((falha as Error).message);
    }
    setOcupado(null);
  }

  async function excluir(c: Perfil) {
    setErro('');
    setOcupado(c.id);
    try {
      await chamarAdmin({ acao: 'excluir_cliente', id: c.id });
      setExcluindo(null);
      onMudou();
    } catch (falha) {
      setErro((falha as Error).message);
    }
    setOcupado(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="space-y-5">
        {acesso && (
          <Cartao className="border-[#dcbe7e] bg-[#fffaf0]">
            <p className="section-kicker">Acesso criado</p>
            <p className="mt-2 text-sm text-[#27384f]/75">Envie esta mensagem para {acesso.nome.split(' ')[0]}. A senha só aparece agora.</p>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-white p-3 font-sans text-sm">{mensagemAcesso(acesso.nome, acesso.email, acesso.senha)}</pre>
            <div className="mt-3 flex flex-wrap gap-2">
              <BotaoCopiar texto={mensagemAcesso(acesso.nome, acesso.email, acesso.senha)} rotulo="Copiar mensagem" />
              {acesso.telefone && (
                <a className="btn btn-navy !px-5 !py-2.5 !text-sm" href={whatsapp(acesso.telefone, mensagemAcesso(acesso.nome, acesso.email, acesso.senha))} target="_blank" rel="noreferrer">
                  Enviar no WhatsApp
                </a>
              )}
              <Botao variante="ghost" onClick={() => setAcesso(null)}>Fechar</Botao>
            </div>
          </Cartao>
        )}

        <Cartao>
          <h2 className="text-2xl">Novo cliente</h2>
          <p className="mt-1 text-sm text-[#27384f]/65">O sistema gera uma senha provisória. No primeiro acesso o cliente cria a dele.</p>
          <form onSubmit={criar} className="mt-5 space-y-4">
            <Campo rotulo="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
            <Campo rotulo="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Campo rotulo="WhatsApp (opcional)" type="tel" placeholder="(48) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            {erro && <Aviso>{erro}</Aviso>}
            <Botao type="submit" carregando={salvando} className="w-full">Criar acesso</Botao>
          </form>
        </Cartao>
      </div>

      <div className="space-y-3">
        {clientes.length > 0 && <CampoBusca valor={busca} onMudar={setBusca} placeholder="Buscar cliente por nome, email ou WhatsApp" />}
        {clientes.length === 0 && <Aviso tipo="info">Nenhum cliente cadastrado ainda.</Aviso>}
        {clientes.length > 0 && encontrados.length === 0 && <Aviso tipo="info">Nenhum cliente encontrado para “{busca}”.</Aviso>}
        {encontrados.map((c) => {
          const qtd = galerias.filter((g) => g.cliente_id === c.id).length;
          return (
            <Cartao key={c.id} className="!p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-xl">{c.nome}</p>
                  <p className="truncate text-sm text-[#27384f]/65">
                    {c.email}
                    {c.telefone && ` · ${c.telefone}`} · {qtd} galeria{qtd === 1 ? '' : 's'}
                    {c.must_change_password && ' · ainda não acessou'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Botao variante="ghost" onClick={() => novaSenha(c)} carregando={ocupado === c.id && excluindo !== c.id}>Nova senha</Botao>
                  {excluindo === c.id ? (
                    <>
                      <Botao variante="perigo" onClick={() => excluir(c)} carregando={ocupado === c.id}>Confirmar exclusão</Botao>
                      <Botao variante="ghost" onClick={() => setExcluindo(null)}>Cancelar</Botao>
                    </>
                  ) : (
                    <Botao variante="perigo" onClick={() => setExcluindo(c.id)}>Excluir</Botao>
                  )}
                </div>
              </div>
              {excluindo === c.id && (
                <p className="mt-3 text-sm text-[#8a2a2a]">Isso apaga o acesso de {c.nome.split(' ')[0]} e as galerias e seleções dele no site. As fotos no Drive não são apagadas.</p>
              )}
            </Cartao>
          );
        })}
      </div>
    </div>
  );
}

type NovaGaleriaProps = {
  clientes: Perfil[];
  onCancelar: () => void;
  onCriada: (id: string) => void;
  onNovoCliente: () => void;
};

function NovaGaleria({ clientes, onCancelar, onCriada, onNovoCliente }: NovaGaleriaProps) {
  const [clienteId, setClienteId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [link, setLink] = useState('');
  const [incluidas, setIncluidas] = useState('');
  const [valorExtra, setValorExtra] = useState('');
  const [prazo, setPrazo] = useState('');
  const [fotosDrive, setFotosDrive] = useState<FotoDrive[] | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function buscar() {
    setErro('');
    setFotosDrive(null);
    setBuscando(true);
    try {
      const r = await chamarAdmin<{ fotos: FotoDrive[] }>({ acao: 'listar_drive', url: link });
      setFotosDrive(r.fotos);
    } catch (falha) {
      setErro((falha as Error).message);
    }
    setBuscando(false);
  }

  async function publicar(e: FormEvent) {
    e.preventDefault();
    setErro('');
    if (!fotosDrive?.length) return setErro('Busque as fotos do Drive antes de publicar.');
    const valor = Number(valorExtra.replace(/\./g, '').replace(',', '.')) || 0;
    setSalvando(true);
    const { data: galeria, error } = await supabase
      .from('galerias')
      .insert({
        cliente_id: clienteId,
        titulo: titulo.trim(),
        drive_url: link.trim(),
        fotos_incluidas: Number(incluidas) || 0,
        valor_extra: valor,
        prazo: prazo || null,
      })
      .select()
      .single();
    if (error || !galeria) {
      setSalvando(false);
      return setErro('Não foi possível criar a galeria.');
    }
    const linhas = fotosDrive.map((f, i) => ({ galeria_id: galeria.id, drive_id: f.id, nome: f.nome, ordem: i }));
    for (let i = 0; i < linhas.length; i += 500) {
      const { error: erroFotos } = await supabase.from('fotos').insert(linhas.slice(i, i + 500));
      if (erroFotos) {
        await supabase.from('galerias').delete().eq('id', galeria.id);
        setSalvando(false);
        return setErro('Não foi possível salvar as fotos. Nada foi publicado, tente de novo.');
      }
    }
    setSalvando(false);
    onCriada(galeria.id);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <button type="button" onClick={onCancelar} className="focus-ring mb-6 rounded-full text-sm font-medium text-[#27384f]/70 hover:text-[#27384f]">← Voltar</button>
      <Titulo kicker="Nova galeria">Publicar fotos para um cliente</Titulo>
      {clientes.length === 0 ? (
        <Aviso tipo="info">
          Primeiro cadastre o cliente.{' '}
          <button type="button" className="font-semibold underline underline-offset-4" onClick={onNovoCliente}>Cadastrar cliente</button>
        </Aviso>
      ) : (
        <form onSubmit={publicar} className="space-y-5">
          <Cartao className="space-y-4">
            <label className="block">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#27384f]/70">Cliente</span>
              <select
                required
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#27384f]/20 bg-white px-4 py-3 text-base outline-none focus:border-[#27384f] focus:ring-2 focus:ring-[#dcbe7e]/60"
              >
                <option value="">Escolha o cliente…</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome} · {c.email}</option>
                ))}
              </select>
            </label>
            <Campo rotulo="Nome da galeria" required placeholder="Ex.: Aniversário de 1 ano da Alice" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </Cartao>

          <Cartao className="space-y-4">
            <Campo
              rotulo="Link da pasta no Google Drive"
              required
              placeholder="https://drive.google.com/drive/folders/…"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                setFotosDrive(null);
              }}
              ajuda='No Drive: botão Compartilhar → "Qualquer pessoa com o link" → Copiar link.'
            />
            <Botao type="button" variante="ghost" onClick={buscar} carregando={buscando} disabled={!link.trim()}>Buscar fotos</Botao>
            {fotosDrive && (
              <div>
                <Aviso tipo="ok">{fotosDrive.length} fotos encontradas na pasta.</Aviso>
                <div className="mt-3 grid grid-cols-6 gap-1.5">
                  {fotosDrive.slice(0, 12).map((f) => (
                    <img key={f.id} src={miniatura(f.id, 200)} referrerPolicy="no-referrer" alt={f.nome} loading="lazy" className="aspect-square w-full rounded-md object-cover" />
                  ))}
                </div>
              </div>
            )}
          </Cartao>

          <Cartao className="grid gap-4 sm:grid-cols-3">
            <Campo rotulo="Fotos no pacote" type="number" min={0} required inputMode="numeric" value={incluidas} onChange={(e) => setIncluidas(e.target.value)} />
            <Campo rotulo="Valor da foto extra (R$)" required inputMode="decimal" placeholder="25,00" value={valorExtra} onChange={(e) => setValorExtra(e.target.value)} />
            <Campo rotulo="Prazo (opcional)" type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} />
          </Cartao>

          {erro && <Aviso>{erro}</Aviso>}
          <div className="flex justify-end gap-2">
            <Botao type="button" variante="ghost" onClick={onCancelar}>Cancelar</Botao>
            <Botao type="submit" variante="gold" carregando={salvando} disabled={!fotosDrive?.length}>Publicar galeria</Botao>
          </div>
        </form>
      )}
    </div>
  );
}

type DetalheProps = {
  galeria: Galeria;
  cliente?: Perfil;
  fotos: Foto[];
  onVoltar: () => void;
  onMudou: () => Promise<void> | void;
};

function DetalheGaleria({ galeria, cliente, fotos, onVoltar, onMudou }: DetalheProps) {
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [ocupado, setOcupado] = useState('');
  const [excluindo, setExcluindo] = useState(false);
  const [verTodas, setVerTodas] = useState(false);

  const marcadas = useMemo(() => fotos.filter((f) => f.selecionada), [fotos]);
  const r = resumoSelecao(galeria, marcadas.length);
  const listaNomes = marcadas.map((f) => f.nome).join('\n');

  async function mudarStatus(status: Galeria['status']) {
    setErro('');
    setOcupado(status);
    const { error } = await supabase
      .from('galerias')
      .update({ status, finalizada_em: status === 'finalizada' ? new Date().toISOString() : null })
      .eq('id', galeria.id);
    if (error) setErro('Não foi possível alterar a galeria.');
    await onMudou();
    setOcupado('');
  }

  async function sincronizar() {
    setErro('');
    setAviso('');
    setOcupado('sync');
    try {
      const r = await chamarAdmin<{ fotos: FotoDrive[] }>({ acao: 'listar_drive', url: galeria.drive_url });
      const existentes = new Set(fotos.map((f) => f.drive_id));
      const novas = r.fotos.filter((f) => !existentes.has(f.id));
      const inicio = fotos.length;
      for (let i = 0; i < novas.length; i += 500) {
        const { error } = await supabase
          .from('fotos')
          .upsert(
            novas.slice(i, i + 500).map((f, j) => ({ galeria_id: galeria.id, drive_id: f.id, nome: f.nome, ordem: inicio + i + j })),
            { onConflict: 'galeria_id,drive_id', ignoreDuplicates: true },
          );
        if (error) throw new Error('Não foi possível salvar as novas fotos.');
      }
      setAviso(novas.length ? `${novas.length} nova${novas.length === 1 ? '' : 's'} foto${novas.length === 1 ? '' : 's'} adicionada${novas.length === 1 ? '' : 's'}.` : 'Nenhuma foto nova na pasta.');
      await onMudou();
    } catch (falha) {
      setErro((falha as Error).message);
    }
    setOcupado('');
  }

  async function excluir() {
    setOcupado('excluir');
    const { error } = await supabase.from('galerias').delete().eq('id', galeria.id);
    setOcupado('');
    if (error) return setErro('Não foi possível excluir a galeria.');
    await onMudou();
    onVoltar();
  }

  const mostradas = verTodas ? fotos : marcadas;

  return (
    <div>
      <button type="button" onClick={onVoltar} className="focus-ring mb-6 rounded-full text-sm font-medium text-[#27384f]/70 hover:text-[#27384f]">← Todas as galerias</button>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SeloStatus status={galeria.status} />
          <h1 className="mt-3 text-4xl sm:text-5xl">{galeria.titulo}</h1>
          <p className="mt-2 text-[#27384f]/70">
            {cliente?.nome ?? 'Cliente removido'} · {fotos.length} fotos · pacote de {galeria.fotos_incluidas} · extra {reais(Number(galeria.valor_extra))}
            {galeria.prazo && ` · prazo ${dataBR(galeria.prazo)}`}
          </p>
        </div>
        <a className="text-sm font-semibold text-[#27384f] underline underline-offset-4" href={galeria.drive_url} target="_blank" rel="noreferrer">Abrir pasta no Drive</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ['Escolhidas', String(r.selecionadas)],
          ['Do pacote', `${r.incluidas} de ${galeria.fotos_incluidas}`],
          ['Extras', String(r.extras)],
          ['Valor extra', reais(r.total)],
        ].map(([rotulo, valor]) => (
          <Cartao key={rotulo} className="!p-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#27384f]/60">{rotulo}</p>
            <p className="font-display mt-1 text-3xl">{valor}</p>
          </Cartao>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {cliente && galeria.status === 'aberta' && (
          <a className="btn btn-navy !px-5 !py-2.5 !text-sm" href={whatsapp(cliente.telefone ?? '', mensagemGaleria(cliente, galeria))} target="_blank" rel="noreferrer">
            Avisar cliente no WhatsApp
          </a>
        )}
        {marcadas.length > 0 && <BotaoCopiar texto={listaNomes} rotulo="Copiar nomes das escolhidas" />}
        {galeria.status === 'finalizada' && <Botao variante="ghost" onClick={() => mudarStatus('aberta')} carregando={ocupado === 'aberta'}>Reabrir seleção</Botao>}
        {galeria.status === 'aberta' && <Botao variante="ghost" onClick={sincronizar} carregando={ocupado === 'sync'}>Buscar novas fotos do Drive</Botao>}
        {galeria.status !== 'arquivada' ? (
          <Botao variante="ghost" onClick={() => mudarStatus('arquivada')} carregando={ocupado === 'arquivada'}>Arquivar</Botao>
        ) : (
          <Botao variante="ghost" onClick={() => mudarStatus(marcadas.length ? 'finalizada' : 'aberta')} carregando={!!ocupado}>Desarquivar</Botao>
        )}
        {excluindo ? (
          <>
            <Botao variante="perigo" onClick={excluir} carregando={ocupado === 'excluir'}>Confirmar exclusão</Botao>
            <Botao variante="ghost" onClick={() => setExcluindo(false)}>Cancelar</Botao>
          </>
        ) : (
          <Botao variante="perigo" onClick={() => setExcluindo(true)}>Excluir galeria</Botao>
        )}
      </div>
      {cliente && !cliente.telefone && galeria.status === 'aberta' && (
        <p className="mt-2 text-xs text-[#27384f]/55">Sem WhatsApp cadastrado: o botão abre o WhatsApp para você escolher o contato.</p>
      )}
      {excluindo && <p className="mt-3 text-sm text-[#8a2a2a]">Isso apaga a galeria e a seleção do cliente no site. As fotos no Drive continuam lá.</p>}
      {erro && <div className="mt-4"><Aviso>{erro}</Aviso></div>}
      {aviso && <div className="mt-4"><Aviso tipo="ok">{aviso}</Aviso></div>}
      {galeria.status === 'arquivada' && <div className="mt-4"><Aviso tipo="info">Galeria arquivada: o cliente não vê mais estas fotos.</Aviso></div>}

      <div className="mt-10 flex items-center justify-between gap-3">
        <h2 className="text-3xl">{verTodas ? 'Todas as fotos' : 'Fotos escolhidas'}</h2>
        <Botao variante="ghost" onClick={() => setVerTodas((v) => !v)}>{verTodas ? 'Ver só as escolhidas' : 'Ver todas'}</Botao>
      </div>
      {mostradas.length === 0 && <div className="mt-4"><Aviso tipo="info">O cliente ainda não escolheu nenhuma foto.</Aviso></div>}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {mostradas.map((f) => (
          <figure key={f.id} className={`overflow-hidden rounded-lg bg-[#27384f]/10 ${verTodas && f.selecionada ? 'ring-4 ring-[#dcbe7e]' : ''}`}>
            <img src={miniatura(f.drive_id, 400)} referrerPolicy="no-referrer" alt={f.nome} loading="lazy" className="aspect-square w-full object-cover" />
            <figcaption className="truncate px-1.5 py-1 text-[0.7rem] text-[#27384f]/75">{f.nome}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
