import { useEffect, useState } from "react"
import { getStatisticById } from '../services/api';
import Header from "../components/header";
import Historic from "../components/historic";
import Loading from "../components/loading";
import '../styles/myProfile.css';

export default function MyProfile () {
  const [imgDefault, setImgDefault] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDKNFoKUmGW_iMp7ev7WAn_dO-fuXza84XoVmaBU5fdNioD7_5MXxR7aBzj7YNt1fzacs&usqp=CAU');
  const [bioDefault, setBioDefault] = useState('Bio');
  const [player, setPlayer] = useState();

  const getInfoPLayer = async () => {
    const playerId = localStorage.getItem("user_id");
    if (playerId) {
      const playerHistoric = await getStatisticById(JSON.parse(playerId));
      setPlayer(playerHistoric[0]);
    }
  }

  useEffect(() => {
    getInfoPLayer();
  },[])

  useEffect(() => {
  },[player])

  return(
    <div id="profile-page">
      <Header />
      <main id="profile-main">
        <section id="profile-card">
          <h1>Meu Perfil</h1>
          <div id="profile-content">
            { player ? 
            <>
              <img src={ player.image.length === 0 ? imgDefault : player.image } alt="Avatar do jogador" id="profile-avatar" />
              <p id="profile-username">{ player.username }</p>
              <p id="profile-bio">{ player.bio.length === 0 ? bioDefault : player.bio }</p>
            </>
             : <Loading />}
          </div>
        </section>
        <section id="historic-section">
          <Historic />
        </section>
      </main>
    </div>
  )
}