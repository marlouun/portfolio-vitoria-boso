import { useState } from 'react';
import type { FormEvent } from 'react';
import { WHATSAPP_VITORIA, supabase, traduzirErro, whatsapp } from './supabase';
import { Aviso, Botao, Campo, Shell } from './ui';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password: senha });
    setEnviando(false);
    if (error) setErro(traduzirErro(error.message));
  }

  return (
    <Shell>
      <div className="mx-auto max-w-md">
        <p className="section-kicker text-center">Área do cliente</p>
        <h1 className="mt-3 text-center text-5xl">Bem-vindo(a)</h1>
        <p className="font-script mt-2 text-center text-3xl text-[#6f8aa6]">suas memórias esperam por você</p>

        <form onSubmit={entrar} className="mt-10 space-y-5 rounded-2xl border border-[#27384f]/10 bg-white p-6 shadow-[0_18px_54px_rgba(18,45,72,0.08)] sm:p-8">
          <Campo rotulo="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Campo rotulo="Senha" type="password" autoComplete="current-password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
          {erro && <Aviso>{erro}</Aviso>}
          <Botao type="submit" carregando={enviando} className="w-full py-3">
            Entrar
          </Botao>
          <p className="text-center text-sm text-[#27384f]/65">
            Esqueceu a senha?{' '}
            <a
              className="font-semibold text-[#27384f] underline underline-offset-4"
              href={whatsapp(WHATSAPP_VITORIA, 'Oi, Vitória! Esqueci a senha da área do cliente. Pode gerar uma nova para mim?')}
              target="_blank"
              rel="noreferrer"
            >
              Fale com a Vitória
            </a>
          </p>
        </form>
      </div>
    </Shell>
  );
}

export function TrocarSenha({ nome, onPronto, onSair }: { nome: string; onPronto: () => void; onSair: () => void }) {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function salvar(e: FormEvent) {
    e.preventDefault();
    setErro('');
    if (senha.length < 8) return setErro('A senha precisa ter pelo menos 8 caracteres.');
    if (senha !== confirmar) return setErro('As duas senhas não são iguais.');
    setEnviando(true);
    const { error } = await supabase.auth.updateUser({ password: senha });
    if (error) {
      setEnviando(false);
      return setErro(traduzirErro(error.message));
    }
    await supabase.rpc('senha_alterada');
    setEnviando(false);
    onPronto();
  }

  return (
    <Shell nome={nome} onSair={onSair}>
      <div className="mx-auto max-w-md">
        <p className="section-kicker text-center">Primeiro acesso</p>
        <h1 className="mt-3 text-center text-4xl">Crie sua senha</h1>
        <p className="mt-3 text-center text-[#27384f]/70">
          Olá, {nome.split(' ')[0]}! A senha que você recebeu é provisória. Escolha uma só sua para continuar.
        </p>
        <form onSubmit={salvar} className="mt-8 space-y-5 rounded-2xl border border-[#27384f]/10 bg-white p-6 sm:p-8">
          <Campo rotulo="Nova senha" type="password" autoComplete="new-password" required value={senha} onChange={(e) => setSenha(e.target.value)} ajuda="Pelo menos 8 caracteres." />
          <Campo rotulo="Repita a nova senha" type="password" autoComplete="new-password" required value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
          {erro && <Aviso>{erro}</Aviso>}
          <Botao type="submit" carregando={enviando} className="w-full py-3">
            Salvar e continuar
          </Botao>
        </form>
      </div>
    </Shell>
  );
}
