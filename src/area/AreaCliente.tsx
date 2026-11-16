import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Login, TrocarSenha } from './Acesso';
import { Admin } from './Admin';
import { ClienteGalerias } from './ClienteGalerias';
import { supabase } from './supabase';
import type { Perfil } from './supabase';
import { Aviso, Carregando, Shell } from './ui';

// Porta de entrada de ?area=cliente: decide entre login, troca de senha, painel da Vitória ou galerias do cliente.
export function AreaCliente() {
  const [sessao, setSessao] = useState<Session | null | undefined>(undefined);
  const [perfil, setPerfil] = useState<Perfil | null | undefined>(undefined);

  useEffect(() => {
    document.title = 'Área do cliente · Vitória Boso';
    supabase.auth.getSession().then(({ data }) => setSessao(data.session));
    const { data } = supabase.auth.onAuthStateChange((_evento, nova) => setSessao(nova));
    return () => data.subscription.unsubscribe();
  }, []);

  const carregarPerfil = useCallback(async (id: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
    setPerfil((data as Perfil) ?? null);
  }, []);

  const userId = sessao?.user.id;
  useEffect(() => {
    if (userId) carregarPerfil(userId);
    else setPerfil(undefined);
  }, [userId, carregarPerfil]);

  const sair = () => supabase.auth.signOut();

  if (sessao === undefined) return <Shell><Carregando /></Shell>;
  if (!sessao) return <Login />;
  if (perfil === undefined) return <Shell><Carregando /></Shell>;
  if (perfil === null) {
    return (
      <Shell onSair={sair}>
        <Aviso>Esta conta ainda não tem acesso à área do cliente. Fale com a Vitória.</Aviso>
      </Shell>
    );
  }
  if (perfil.must_change_password) {
    return <TrocarSenha nome={perfil.nome} onSair={sair} onPronto={() => carregarPerfil(perfil.id)} />;
  }
  if (perfil.is_admin) return <Admin perfil={perfil} onSair={sair} />;
  return <ClienteGalerias perfil={perfil} onSair={sair} />;
}
