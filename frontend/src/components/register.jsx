import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getRegister } from '../services/api';
import "../styles/register.css";


export default function Register() {
  const [isDisabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [alreadyPlayer, setAlreadyPlayer] = useState('');
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

  const makeRegister = async () => {
    const response = await getRegister(username, email)
    if (response.status === 201) {
      const { data: { message }} = response;
      localStorage.setItem("user_id", JSON.stringify(message.id))
      router.push('/game');
    } else {
      const { message } = response;
      setAlreadyPlayer(message);
    }
  }

  useEffect(() => {
    validateButton();
  }, [email, username])

    return (
      <div id="div-register">
        {/* <h3 id="h3-login">Registro</h3> */}
        <form 
          action=""
          id="form-register"
        >
          <label htmlFor="username-user"></label>
          <input
            type="text"
            id="username-user"
            className="input-register"
            value={ username }
            name="username"
            onChange={ controlGeneralState }
            placeholder="Nome de usuário"
            autoComplete='off'

          />

          <label htmlFor="email-user"></label>
          <input
            type="email"
            id="email-user"
            className="input-register"
            value={ email }
            name="email"
            onChange={ controlGeneralState }
            placeholder="Seu email"
            autoComplete='off'
          />
          <p>{ alreadyPlayer ? alreadyPlayer : '' }</p>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ makeRegister }
            id="btn-register"
          >
            Cadastrar
          </button>
        </form>
      </div>
    )
  }
