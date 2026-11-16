// Função "admin" (Supabase Edge Function).
// Só a Vitória (perfil is_admin) consegue chamar. Faz o que o navegador não pode fazer sozinho:
// criar contas de cliente com senha provisória, gerar nova senha, excluir cliente e listar as fotos de uma pasta do Drive.
import { createClient } from 'npm:@supabase/supabase-js@2.49.4';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function resposta(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
}

// Sem letras parecidas (l, I, O, 0) para não confundir quem digita.
function gerarSenha() {
  const letras = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const s = Array.from(bytes, (b) => letras[b % letras.length]).join('');
  return `${s.slice(0, 4)}-${s.slice(4, 8)}-${s.slice(8, 12)}`;
}

function idDaPasta(link: string) {
  const texto = link.trim();
  const m = texto.match(/folders\/([A-Za-z0-9_-]{10,})/) || texto.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
  if (m) return m[1];
  if (/^[A-Za-z0-9_-]{10,}$/.test(texto)) return texto;
  return null;
}

const ehImagem = (nome: string) => /\.(jpe?g|png|webp)$/i.test(nome);
const ordenar = (a: { nome: string }, b: { nome: string }) => a.nome.localeCompare(b.nome, 'pt-BR', { numeric: true });

function decodificar(s: string) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function listarDrive(pasta: string) {
  const chave = Deno.env.get('GOOGLE_API_KEY');
  const fotos: { id: string; nome: string }[] = [];

  if (chave) {
    // Caminho oficial (API do Google Drive), usado se uma chave for configurada.
    let pagina = '';
    do {
      const params = new URLSearchParams({
        q: `'${pasta}' in parents and trashed = false and mimeType contains 'image/'`,
        fields: 'nextPageToken, files(id, name)',
        pageSize: '1000',
        key: chave,
      });
      if (pagina) params.set('pageToken', pagina);
      const r = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);
      if (!r.ok) throw new Error('O Google Drive recusou a leitura da pasta.');
      const dados = await r.json();
      for (const f of dados.files ?? []) fotos.push({ id: f.id, nome: f.name });
      pagina = dados.nextPageToken ?? '';
    } while (pagina);
  } else {
    // Sem chave: lê a visualização pública da pasta (precisa estar como "qualquer pessoa com o link").
    const r = await fetch(`https://drive.google.com/embeddedfolderview?id=${pasta}`);
    if (!r.ok) throw new Error('Não consegui abrir a pasta. Ela está compartilhada como "qualquer pessoa com o link"?');
    const html = await r.text();
    const re = /id="entry-([A-Za-z0-9_-]+)"[\s\S]*?class="flip-entry-title">([^<]*)</g;
    for (const m of html.matchAll(re)) {
      const nome = decodificar(m[2].trim());
      if (ehImagem(nome)) fotos.push({ id: m[1], nome });
    }
  }

  return fotos.filter((f) => ehImagem(f.nome)).sort(ordenar);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Confere quem está chamando: precisa estar logado e ser admin.
  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
  const { data: quem } = await supabase.auth.getUser(token);
  if (!quem?.user) return resposta({ erro: 'Sessão expirada. Entre de novo.' }, 401);
  const { data: perfil } = await supabase.from('profiles').select('is_admin').eq('id', quem.user.id).single();
  if (!perfil?.is_admin) return resposta({ erro: 'Acesso restrito.' }, 403);

  let corpo: Record<string, string>;
  try {
    corpo = await req.json();
  } catch {
    return resposta({ erro: 'Pedido inválido.' }, 400);
  }

  try {
    switch (corpo.acao) {
      case 'criar_cliente': {
        const nome = (corpo.nome ?? '').trim();
        const email = (corpo.email ?? '').trim().toLowerCase();
        const telefone = (corpo.telefone ?? '').trim() || null;
        if (!nome || !/^\S+@\S+\.\S+$/.test(email)) return resposta({ erro: 'Preencha nome e um email válido.' }, 400);

        const senha = gerarSenha();
        const { data, error } = await supabase.auth.admin.createUser({
          email,
          password: senha,
          email_confirm: true,
          user_metadata: { nome },
        });
        if (error) {
          const jaExiste = /already|registered|exists/i.test(error.message);
          return resposta({ erro: jaExiste ? 'Já existe um cliente com esse email.' : error.message }, 400);
        }
        const { error: erroPerfil } = await supabase
          .from('profiles')
          .insert({ id: data.user.id, nome, email, telefone, must_change_password: true });
        if (erroPerfil) {
          await supabase.auth.admin.deleteUser(data.user.id);
          return resposta({ erro: erroPerfil.message }, 400);
        }
        return resposta({ id: data.user.id, senha });
      }

      case 'nova_senha': {
        const { data: alvo } = await supabase.from('profiles').select('is_admin').eq('id', corpo.id).single();
        if (!alvo) return resposta({ erro: 'Cliente não encontrado.' }, 404);
        if (alvo.is_admin) return resposta({ erro: 'A senha da conta admin não é trocada por aqui.' }, 400);
        const senha = gerarSenha();
        const { error } = await supabase.auth.admin.updateUserById(corpo.id, { password: senha });
        if (error) return resposta({ erro: error.message }, 400);
        await supabase.from('profiles').update({ must_change_password: true }).eq('id', corpo.id);
        return resposta({ senha });
      }

      case 'excluir_cliente': {
        const { data: alvo } = await supabase.from('profiles').select('is_admin').eq('id', corpo.id).single();
        if (!alvo) return resposta({ erro: 'Cliente não encontrado.' }, 404);
        if (alvo.is_admin) return resposta({ erro: 'A conta admin não pode ser excluída.' }, 400);
        const { error } = await supabase.auth.admin.deleteUser(corpo.id);
        if (error) return resposta({ erro: error.message }, 400);
        return resposta({ ok: true });
      }

      case 'listar_drive': {
        const pasta = idDaPasta(corpo.url ?? '');
        if (!pasta) return resposta({ erro: 'Esse não parece um link de pasta do Google Drive.' }, 400);
        const fotos = await listarDrive(pasta);
        if (!fotos.length) {
          return resposta(
            { erro: 'Não encontrei fotos JPG nessa pasta. Confira se ela está compartilhada como "qualquer pessoa com o link".' },
            400,
          );
        }
        return resposta({ pasta, fotos });
      }

      default:
        return resposta({ erro: 'Ação desconhecida.' }, 400);
    }
  } catch (e) {
    return resposta({ erro: e instanceof Error ? e.message : 'Erro inesperado.' }, 500);
  }
});
