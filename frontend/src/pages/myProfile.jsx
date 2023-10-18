import { useEffect, useState } from "react"
import { getStatisticById } from '../services/api';
import Header from "../components/header";
import Historic from "../components/historic";

export default function MyProfile () {
  const [imgDefault, setImgDefault] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDKNFoKUmGW_iMp7ev7WAn_dO-fuXza84XoVmaBU5fdNioD7_5MXxR7aBzj7YNt1fzacs&usqp=CAU');
  const [playerNameDefault, SetPlayerNameDefault] = useState('username');
  const [bioDefault, setBioDefault] = useState('Bio');
  const [idPlayer, setIdPlayer] = useState(0);

  const getInfoPLayer = async () => {
    const playerId = localStorage.getItem("user_id");
    if (playerId) {
      const player = await getStatisticById(JSON.parse(playerId));
      setIdPlayer(JSON.parse(playerId))
      console.log(player);
    }
  }

  useEffect(() => {
    getInfoPLayer();
  },[])

  return(
    <>
      <Header />
      <h1>Meu Perfil</h1>
      <div>
        <img src={ imgDefault } alt="" />
        <p>{ playerNameDefault }</p>
        <p>{ bioDefault }</p>
      </div>
      <Historic id={ idPlayer }/>
    </>
  )
}