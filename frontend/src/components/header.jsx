import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { getPlayerById, updatePlayerBio, updatePlayerImage } from '../services/api';
import '../styles/header.css';

const Header = () => {
  const [imgDefault, setImgDefault] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDKNFoKUmGW_iMp7ev7WAn_dO-fuXza84XoVmaBU5fdNioD7_5MXxR7aBzj7YNt1fzacs&usqp=CAU');
  const [playerNameDefault, SetPlayerNameDefault] = useState('username');
  const [imgPlayer, setImgPlayer] = useState('');
  const [usernamePlayer, setUsernamePlayer] = useState('');
  const [bioPlayer, setBioPlayer] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editBio, setEditBio] = useState('');
  const [editImage, setEditImage] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const dropdownRef = useRef(null);
  const router = useRouter();

  const getLogout = () => {
    const response = localStorage.getItem('user_id');
    if (response) {
      localStorage.removeItem("user_id");
      setDropdownOpen(false);
      router.push('/');
    }
  }

  const getInfoPlayer = async () => {
    const response = localStorage.getItem('user_id');
    if (response) {
      const idPlayer = JSON.parse(response);
      const player = await getPlayerById(idPlayer);
      if (player && player[0]) {
        setImgPlayer(player[0].image || '');
        setUsernamePlayer(player[0].username || '');
        setBioPlayer(player[0].bio || '');
        setEditBio(player[0].bio || '');
        setEditImage(player[0].image || '');
      }
    }
  }

  const handleSaveBio = async () => {
    const userId = localStorage.getItem('user_id');
    if (userId && editBio !== undefined) {
      const result = await updatePlayerBio(JSON.parse(userId), editBio);
      if (result?.message) {
        setBioPlayer(editBio);
        setSaveMessage('Bio salva!');
        setTimeout(() => setSaveMessage(''), 2000);
      } else {
        setSaveMessage(result?.message || 'Erro ao salvar');
      }
    }
  }

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setEditImage(base64);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  }

  const handleSaveImage = async () => {
    const userId = localStorage.getItem('user_id');
    if (userId && editImage) {
      const result = await updatePlayerImage(JSON.parse(userId), editImage);
      if (result?.message) {
        setImgPlayer(editImage);
        setSaveMessage('Imagem salva!');
        setTimeout(() => setSaveMessage(''), 2000);
      } else {
        setSaveMessage(result?.message || 'Erro ao salvar');
      }
    } else if (!editImage) {
      setSaveMessage('Selecione uma imagem primeiro');
      setTimeout(() => setSaveMessage(''), 2000);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    if (!dropdownOpen) {
      getInfoPlayer();
    }
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    getInfoPlayer();
  }, []);

  return (
    <header id="header-game">
      {isMobile && (
        <button id="hamburger-menu" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      )}

      <nav id="nav-header">
        <ul id="ul-header" className={!isMobile || menuOpen ? '' : 'hidden'}>
          <li className="li-header" onClick={() => router.push('/game')}>Jogo</li>
          <li className="li-header" onClick={() => router.push('/myProfile')}>Meu perfil</li>
          <li className="li-header" onClick={() => router.push('/ranking')}>Ranking</li>
          <li className="li-header" onClick={() => router.push('/gameHistory')}>História do Jogo</li>
          <li className="li-header" onClick={() => router.push('/sobre')}>Desenvolvedor</li>
        </ul>
      </nav>

      <div id="div-user-header" ref={dropdownRef}>
        <div
          id="user-trigger"
          onClick={toggleDropdown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
        >
          <img
            src={imgPlayer ? imgPlayer : imgDefault}
            alt="imagem do usuário"
            id="img-user"
          />
          <p>{usernamePlayer ? usernamePlayer : playerNameDefault}</p>
        </div>

        {dropdownOpen && (
          <div id="user-dropdown">
            <div className="dropdown-section">
              <h4>Editar perfil</h4>

              <label htmlFor="edit-bio">Bio</label>
              <textarea
                id="edit-bio"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Sua bio..."
                maxLength={250}
                rows={3}
              />
              <button type="button" className="dropdown-btn-save" onClick={handleSaveBio}>
                Salvar bio
              </button>

              <label htmlFor="edit-image">Escolher imagem do dispositivo</label>
              <input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
              />
              {editImage && (
                <div className="image-preview">
                  <img src={editImage} alt="Preview" />
                </div>
              )}
              <button type="button" className="dropdown-btn-save" onClick={handleSaveImage}>
                Salvar imagem
              </button>

              {saveMessage && <p className="dropdown-message">{saveMessage}</p>}
            </div>

            <button type="button" id="dropdown-logout" onClick={getLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
