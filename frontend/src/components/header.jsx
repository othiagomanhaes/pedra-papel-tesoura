import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/header.css';

const Header = () => {
  const [imgPlayer, setImgPlayer] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDKNFoKUmGW_iMp7ev7WAn_dO-fuXza84XoVmaBU5fdNioD7_5MXxR7aBzj7YNt1fzacs&usqp=CAU')
  const router = useRouter();

  const getLogout = () => {
    const response = localStorage.getItem('user_id');
    if (response) {
      localStorage.removeItem("user_id");
      router.push('/');
    }
  }

  const getInfoPlayer = () => {
    
  }

  return (
    <header id="header-game">
        <nav id="nav-header">
          <ul>
            <li>Jogo</li>
            <li>Ranking</li>
            <li>História do Jogo</li>
            <li>Desenvolvedor</li>
          </ul>
        </nav>

        <div id="div-user-header">
          <img src={imgPlayer} alt="imagem do usuário" id="img-user"/>
          <p>Username</p>
          <button
            type="text"
            onClick={ getLogout }
          >
            Logout
          </button>
        </div>
      </header>
  )
}

export default Header;
