import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getLogin } from '../services/api';
import "../styles/login.css";

export default function Login() {
  const [isDisabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [notFoundUser, setNotFoundUser] = useState('');
  const router = useRouter();

  const validateButton = () => {
    const validaUsername = username.length >= 3;
    const reg = /\S+@\S+\.\S+/;
    const validaEmail = reg.test(email);

    (validaEmail && validaUsername) ? setDisabled(false) : setDisabled(true)

  }

  const controlGeneralState = ({ target }) => {
    const { name, value } = target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
  }

  const makeLogin = async () => {
    const response = await getLogin(username, email);
    if (response.status === 200) {
      const { data: { player } } = response;
      localStorage.setItem("user_id", JSON.stringify(player[0].id));
      router.push('/game');
    } else {
      const { message } = response;
      setNotFoundUser(message);
    }
  }

  useEffect(() => {
    validateButton();
  }, [email, username])

  return (
    <div id="div-login">
      <h3 id="h3-login">Login</h3>
      <form 
        action=""
        id="form-login"
      >
        <label 
          htmlFor="username-user"
        >
        </label>
        <input
          type="text"
          id="username-user"
          className="input-login"
          value={ username }
          name="username"
          onChange={ controlGeneralState }
          placeholder="Nome de usuário"
        />

        <label 
          htmlFor="email-user"
        >
        </label>
        <input
          type="email"
          id="email-user"
          className="input-login"
          value={ email }
          name="email"
          onChange={ controlGeneralState }
          placeholder="Seu email"
        />
        <p>{ notFoundUser ? notFoundUser : ''}</p>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ makeLogin }
          id="btn-entrar"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
