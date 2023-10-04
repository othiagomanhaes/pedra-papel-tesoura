import '../styles/header.css';

const Header = () => {
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
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDKNFoKUmGW_iMp7ev7WAn_dO-fuXza84XoVmaBU5fdNioD7_5MXxR7aBzj7YNt1fzacs&usqp=CAU" alt="imagem do usuário" id="img-user"/>
          <p>Username</p>
        </div>
      </header>
  )
}

export default Header;
