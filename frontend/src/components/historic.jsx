import { useEffect, useState } from "react";
import { getStatisticById, getRankingGeralApi } from '../services/api';
import Loading from "./loading";

const Historic = () => {

  const [player, setPlayer] = useState();
  const [playerPositionState, setPlayerPositionState] = useState('-');

  const getInfoPLayer = async () => {
    const playerId = localStorage.getItem("user_id");
    if (playerId) {
      const playerHistoric = await getStatisticById(JSON.parse(playerId));
      setPlayer(playerHistoric[0]);

      const rankingGeral = await getRankingGeralApi();
      const playerPosition = rankingGeral.forEach((ele, ind) => {
        if (ele.id === Number(playerId)) {
          setPlayerPositionState(ind + 1)
        }
      })
    }

  }

  useEffect(() => {
    getInfoPLayer();
  },[])

  useEffect(() => {
  },[player, playerPositionState])

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
                <td>{player.rounds}</td>
                <td>{player.victory}</td>
                <td>{player.draw}</td>
                <td>{player.defeat}</td>
                <td>{player.level}</td>
                <td>{player.total_points}</td>
                <td>{playerPositionState}º</td>
              </tr>
            </tbody>

          </table> : <Loading />}
      </div>
    </>
  )
}

export default Historic;
