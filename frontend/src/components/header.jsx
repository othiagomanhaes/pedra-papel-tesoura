import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPlayerById } from '../services/api';
import '../styles/header.css';

const Header = () => {
  const [imgDefault, setImgDefault] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDKNFoKUmGW_iMp7ev7WAn_dO-fuXza84XoVmaBU5fdNioD7_5MXxR7aBzj7YNt1fzacs&usqp=CAU');
  const [playerNameDefault, SetPlayerNameDefault] = useState('username');
  const [imgPlayer, setImgPlayer] = useState('');
  const [usernamePlayer, setUsernamePlayer] = useState('');
  const router = useRouter();

  const getLogout = () => {
    const response = localStorage.getItem('user_id');
    if (response) {
      localStorage.removeItem("user_id");
      router.push('/');
    }
  }

  const getInfoPlayer = async () => {
    const response = localStorage.getItem('user_id');
    if (response) {
      const idPlayer = JSON.parse(response)
      const player = await getPlayerById(idPlayer);
      setImgPlayer(player[0].image);
      setUsernamePlayer(player[0].username);
    }
  }

  useEffect(() => {
    getInfoPlayer()
  }, [])

  return (
    <header id="header-game">
      <nav id="nav-header">
        <ul id="ul-header">
          <li className="li-header" onClick={ () => router.push('/game')}>Jogo</li>
          <li className="li-header" onClick={ () => router.push('/myProfile')}>Meu perfil</li>
          <li className="li-header">Ranking</li>
          <li className="li-header">História do Jogo</li>
          <li className="li-header">Desenvolvedor</li>
        </ul>
      </nav>

      <div id="div-user-header">
        <img src={ imgPlayer ? imgPlayer : imgDefault } alt="imagem do usuário" id="img-user"/>
        <p>{ usernamePlayer ? usernamePlayer : playerNameDefault }</p>
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
