import { useEffect, useState } from 'react';
import { GaleriaSelecao } from './GaleriaSelecao';
import { buscarFotos, dataBR, miniatura, reais, supabase } from './supabase';
import type { Galeria, Perfil } from './supabase';
import { Aviso, Carregando, SeloStatus, Shell, Titulo } from './ui';

type GaleriaComCapa = Galeria & { capa?: string; total: number; marcadas: number };

export function ClienteGalerias({ perfil, onSair }: { perfil: Perfil; onSair: () => void }) {
  const [galerias, setGalerias] = useState<GaleriaComCapa[] | null>(null);
  const [erro, setErro] = useState('');
  const [aberta, setAberta] = useState<string | null>(null);

  async function carregar() {
    const { data, error } = await supabase.from('galerias').select('*').order('created_at', { ascending: false });
    if (error) return setErro('Não foi possível carregar suas galerias.');
    const lista = (data as Galeria[]) ?? [];
    const fotos = await buscarFotos().catch(() => []);
    const comCapa = lista.map((g) => {
      const daGaleria = fotos.filter((f) => f.galeria_id === g.id);
      return { ...g, capa: daGaleria[0]?.drive_id, total: daGaleria.length, marcadas: daGaleria.filter((f) => f.selecionada).length };
    });
    setGalerias(comCapa);
    // Com uma galeria só esperando seleção, já abre direto nela.
    const abertas = comCapa.filter((g) => g.status === 'aberta');
    if (comCapa.length === 1 && abertas.length === 1) setAberta(abertas[0].id);
  }

  useEffect(() => {
    carregar();
  }, []);

  const atual = galerias?.find((g) => g.id === aberta);
  if (atual) {
    return (
      <GaleriaSelecao
        galeria={atual}
        perfil={perfil}
        onSair={onSair}
        onVoltar={
          galerias && galerias.length > 1
            ? () => {
                setAberta(null);
                carregar();
              }
            : undefined
        }
        onFinalizada={carregar}
      />
    );
  }

  return (
    <Shell nome={perfil.nome} onSair={onSair}>
      <Titulo kicker="Área do cliente" sub="Escolha uma galeria para ver as fotos e fazer a sua seleção.">
        Suas galerias
      </Titulo>
      {erro && <Aviso>{erro}</Aviso>}
      {!galerias && !erro && <Carregando />}
      {galerias && galerias.length === 0 && (
        <Aviso tipo="info">Ainda não há galerias para você. Assim que a Vitória publicar as fotos, elas aparecem aqui.</Aviso>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galerias?.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setAberta(g.id)}
            className="focus-ring group overflow-hidden rounded-2xl border border-[#27384f]/10 bg-white text-left shadow-[0_10px_30px_rgba(39,56,79,0.06)] transition hover:-translate-y-1"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#27384f]/10">
              {g.capa && <img src={miniatura(g.capa, 600)} referrerPolicy="no-referrer" alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
            </div>
            <div className="space-y-2 p-5">
              <SeloStatus status={g.status} />
              <h2 className="text-2xl">{g.titulo}</h2>
              <p className="text-sm text-[#27384f]/65">
                {g.total} fotos · {g.fotos_incluidas} no pacote · extra {reais(Number(g.valor_extra))}
              </p>
              <p className="text-sm text-[#27384f]/65">
                {g.marcadas} selecionada{g.marcadas === 1 ? '' : 's'}
                {g.status === 'aberta' && g.prazo ? ` · escolha até ${dataBR(g.prazo)}` : ''}
              </p>
            </div>
          </button>
        ))}
      </div>
    </Shell>
  );
}
