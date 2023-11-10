import { useEffect, useState } from "react";
import { getStatisticById } from '../services/api';
import Loading from "./loading";

const Historic = () => {

  const [player, setPlayer] = useState();

  const getInfoPLayer = async () => {
    const playerId = localStorage.getItem("user_id");
    if (playerId) {
      const playerHistoric = await getStatisticById(JSON.parse(playerId));
      setPlayer(playerHistoric[0]);
      console.log(playerHistoric);
    }
  }

  useEffect(() => {
    getInfoPLayer();
  },[])

  useEffect(() => {
  },[player])

  return(
    <>
      <h1>Historic</h1>
      <div>
        { player ? 
          <table>
            <thead>
              <tr>
                <th>Partidas</th>
                <th>Rodadas</th>
                <th>Vitórias</th>
                <th>Empates</th>
                <th>Derrotas</th>
                <th>Nível</th>
                <th>Pontos</th>
                <th>Ranking Geral</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{player.matchs}</td>
                <td>mexer no back</td>
                <td>{player.victory}</td>
                <td>{player.draw}</td>
                <td>{player.defeat}</td>
                <td>{player.level}</td>
                <td>{player.total_points}</td>
              </tr>
            </tbody>

          </table> : <Loading />}
      </div>
    </>
  )
}

export default Historic;
