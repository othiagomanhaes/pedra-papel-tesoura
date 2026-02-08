import { useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin, googleRegister } from '../services/api';
import '../styles/login.css';

export default function Login() {
  const [needsUsername, setNeedsUsername] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [credential, setCredential] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setMessage('');
    const idToken = credentialResponse.credential;

    try {
      const response = await googleLogin(idToken);
      if (response?.player) {
        localStorage.setItem('user_id', JSON.stringify(response.player[0].id));
        router.push('/game');
      } else if (response?.needsUsername) {
        setNeedsUsername(true);
        setEmail(response.email);
        setCredential(idToken);
      } else {
        setMessage(response?.message || 'Erro ao fazer login');
      }
    } catch (error) {
      setMessage('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setMessage('Erro ao conectar com Google. Tente novamente.');
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3) {
      setMessage('O nome de usuário deve ter pelo menos 3 caracteres');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      const response = await googleRegister(credential, username.trim());
      if (response?.player) {
        localStorage.setItem('user_id', JSON.stringify(response.player[0].id));
        router.push('/game');
      } else {
        setMessage(response?.message || 'Erro ao criar conta');
      }
    } catch (error) {
      setMessage('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (needsUsername) {
    return (
      <div id="div-login">
        <h3 id="h3-username">Escolha seu nome de usuário</h3>
        <p className="login-email-hint">Email: {email}</p>
        <form id="form-login" onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            id="username-user"
            className="input-login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de usuário (mín. 3 caracteres)"
            autoComplete="off"
            minLength={3}
          />
          {message && <p className="login-message">{message}</p>}
          <button
            type="submit"
            disabled={loading || username.length < 3}
            id="btn-entrar"
          >
            {loading ? 'Criando conta...' : 'Confirmar'}
          </button>
        </form>
        <button
          type="button"
          className="btn-back-google"
          onClick={() => {
            setNeedsUsername(false);
            setUsername('');
            setCredential('');
            setMessage('');
          }}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div id="div-login">
      <form id="form-login">
        <div id="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            locale="pt-BR"
          />
        </div>
        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
}
