import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

export default function Register() {
  const [isDisabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
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

  const makeRegister = () => {
    router.push('/game');
  }

  useEffect(() => {
    validateButton();
  }, [email, username])

    return (
      <>
        <h3>Register</h3>
        <form action="">
        <label htmlFor="username-user">Usuário</label>
        <input
          type="text"
          id="username-user"
          value={ username }
          name="username"
          onChange={ controlGeneralState }
          placeholder="nome de usuário"
        />

        <label htmlFor="email-user">Email</label>
        <input
          type="email"
          id="email-user"
          value={ email }
          name="email"
          onChange={ controlGeneralState }
          placeholder="seu email"
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ makeRegister }
        >
          Cadastrar
        </button>
      </form>
      </>
    )
  }
