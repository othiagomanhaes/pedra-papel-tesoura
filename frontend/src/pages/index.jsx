import { useState } from 'react';
import Login from '../components/login';
import Register from '../components/register';
import Image from 'next/image';
import jokenpo from '../imgs/jokenpo.png';
import "../styles/index.css";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <div id="div-titulos">
        <h1 id="title-pt">Pedra, Papel e Tesoura</h1>
        <h1 id="title-ko">Jokenpo</h1>
        <h1 id="title-en">Rock, Paper and Scissor</h1>
      </div>
        <h1 id="h1-loginRegister">Você não precisa de senha, apenas um <span className="span-h1">usuário</span> e <span className="span-h1">email</span>!!</h1>
      <div id="main-div">
        <Image 
          src={ jokenpo }
          alt="jokenpo"
          id="img-jokenpo"
        />
        <div id="div-mae-loginRegister">
          <div id="div-loginRegister">
            { isLogin ? <Login /> : <Register /> }
            <button
              id="btn-loginRegister"
              onClick={ () => { setIsLogin(!isLogin) } }
            >
              { isLogin ? 'Primeiro Cadastro' : 'Vá para Login' }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
