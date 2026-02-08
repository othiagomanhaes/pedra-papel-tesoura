import { useEffect, useState } from "react";
import { getStatisticById, getRankingGeralApi } from '../services/api';
import Loading from "./loading";

const Historic = ({ playerId: playerIdProp }) => {

  const [player, setPlayer] = useState();
  const [playerPositionState, setPlayerPositionState] = useState('-');
  const [loading, setLoading] = useState(true);

  const getInfoPlayer = async () => {
    const playerId = playerIdProp || localStorage.getItem("user_id");
    if (playerId) {
      const id = typeof playerId === 'string' ? JSON.parse(playerId) : playerId;
      const playerHistoric = await getStatisticById(id);
      if (playerHistoric && playerHistoric[0]) {
        setPlayer(playerHistoric[0]);

        const rankingGeral = await getRankingGeralApi();
        if (Array.isArray(rankingGeral)) {
          const position = rankingGeral.findIndex((ele) => ele.id === id || ele.id === Number(id));
          setPlayerPositionState(position >= 0 ? position + 1 : '-');
        }
      } else {
        setPlayer(null);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    getInfoPlayer();
  }, [playerIdProp])

  useEffect(() => {
  },[player, playerPositionState])

  return(
    <>
      <h1>Histórico</h1>
      <div>
        { loading ? <Loading /> : player ? 
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

          </table> : <p className="historic-empty">Este jogador ainda não possui histórico de partidas.</p>}
      </div>
    </>
  )
}

export default Historic;
