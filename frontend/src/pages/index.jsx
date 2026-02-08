import Link from 'next/link';
import Login from '../components/login';
import Image from 'next/image';
import jokenpo from '../imgs/jokenpo.png';
import '../styles/index.css';

export default function Home() {
  return (
    <div id="div-mother-home">
      <div id="div-titulos">
        <h1 id="title-pt">Pedra, Papel e Tesoura</h1>
        <h1 id="title-ko">Jokenpo</h1>
        <h1 id="title-en">Rock, Paper and Scissor</h1>
      </div>
      <h1 id="h1-loginRegister">Entre com sua conta <span className="span-h1">Google</span> para jogar!</h1>
      <div id="main-div">
        <Image
          src={jokenpo}
          alt="jokenpo"
          id="img-jokenpo"
        />
        <div id="div-mae-loginRegister">
          <div id="div-loginRegister">
            <Login />
          </div>
          <Link href="/sobre" id="link-sobre-desenvolvedor">
            Sobre o desenvolvedor
          </Link>
        </div>
      </div>
    </div>
  );
}
