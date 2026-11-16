import { createClient } from '@supabase/supabase-js';

// Chave pública (publishable): pode ficar no site. O que protege os dados são as regras do banco (RLS).
const SUPABASE_URL = 'https://prwslwhafpqzelukuknu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_AJpc5jBjgzdcCrZ0A_ONMA_791ZtpVx';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const SITE_URL = 'https://marlouun.github.io/portfolio-vitoria-boso/';
export const AREA_URL = `${SITE_URL}?area=cliente`;
export const WHATSAPP_VITORIA = '5548991842048';

export type Perfil = {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  is_admin: boolean;
  must_change_password: boolean;
  created_at: string;
};

export type StatusGaleria = 'aberta' | 'finalizada' | 'arquivada';

export type Galeria = {
  id: string;
  cliente_id: string;
  titulo: string;
  drive_url: string;
  fotos_incluidas: number;
  valor_extra: number;
  status: StatusGaleria;
  prazo: string | null;
  created_at: string;
  finalizada_em: string | null;
};

export type Foto = {
  id: string;
  galeria_id: string;
  drive_id: string;
  nome: string;
  ordem: number;
  selecionada: boolean;
};

export type FotoDrive = { id: string; nome: string };

// Endereço direto da imagem no Google. A tag <img> precisa de referrerPolicy="no-referrer":
// com o endereço do site como origem, o Google recusa a imagem.
export function miniatura(driveId: string, largura = 800) {
  return `https://lh3.googleusercontent.com/d/${driveId}=w${largura}`;
}

export function reais(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function dataBR(iso: string | null) {
  if (!iso) return '';
  const [a, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${a}`;
}

export function whatsapp(numero: string, texto: string) {
  const digitos = numero.replace(/\D/g, '');
  if (!digitos) return `https://wa.me/?text=${encodeURIComponent(texto)}`;
  const comPais = digitos.length <= 11 ? `55${digitos}` : digitos;
  return `https://wa.me/${comPais}?text=${encodeURIComponent(texto)}`;
}

export function resumoSelecao(galeria: Pick<Galeria, 'fotos_incluidas' | 'valor_extra'>, selecionadas: number) {
  const extras = Math.max(0, selecionadas - galeria.fotos_incluidas);
  return {
    selecionadas,
    incluidas: Math.min(selecionadas, galeria.fotos_incluidas),
    faltam: Math.max(0, galeria.fotos_incluidas - selecionadas),
    extras,
    total: extras * Number(galeria.valor_extra),
  };
}

// O Supabase devolve no máximo 1000 linhas por vez; aqui busca página a página.
export async function buscarFotos(galeriaId?: string): Promise<Foto[]> {
  const todas: Foto[] = [];
  for (let de = 0; ; de += 1000) {
    let consulta = supabase.from('fotos').select('*').order('galeria_id').order('ordem').range(de, de + 999);
    if (galeriaId) consulta = consulta.eq('galeria_id', galeriaId);
    const { data, error } = await consulta;
    if (error) throw error;
    todas.push(...((data as Foto[]) ?? []));
    if (!data || data.length < 1000) return todas;
  }
}

// Chama a função "admin" do Supabase e devolve a resposta, ou lança o erro já em português.
export async function chamarAdmin<T>(corpo: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('admin', { body: corpo });
  if (error) {
    let mensagem = 'Não foi possível concluir. Tente de novo.';
    const contexto = (error as { context?: Response }).context;
    if (contexto && typeof contexto.json === 'function') {
      try {
        const corpoErro = await contexto.json();
        if (corpoErro?.erro) mensagem = corpoErro.erro;
      } catch {
        // resposta sem JSON: fica a mensagem padrão
      }
    }
    throw new Error(mensagem);
  }
  return data as T;
}

export function traduzirErro(mensagem: string) {
  if (/invalid login credentials/i.test(mensagem)) return 'Email ou senha incorretos.';
  if (/should be different/i.test(mensagem)) return 'A nova senha precisa ser diferente da provisória.';
  if (/at least|weak|short/i.test(mensagem)) return 'Escolha uma senha mais forte, com pelo menos 8 caracteres.';
  if (/rate limit|too many/i.test(mensagem)) return 'Muitas tentativas. Aguarde um minuto e tente de novo.';
  if (/failed to fetch|network/i.test(mensagem)) return 'Sem conexão. Confira sua internet.';
  return mensagem;
}
