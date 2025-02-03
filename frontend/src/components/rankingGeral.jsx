import { useEffect, useState } from 'react';
import { getRankingGeralApi } from '../services/api';

import '../styles/rankingGeral.css';

const RankingGeral = () => {
  const [ranking, setRanking] = useState([]);

  const getAllPlayers = async () => {
    const response = await getRankingGeralApi();
    const responseSize = response.length
    const DEZ = 10;
    const lefting = DEZ - responseSize;
    const objDefault = {image: '', username: '', level: '', total_points: ''};

    if (responseSize >= 10) {     
      setRanking(response.slice(0, 10));
    } else {
      for (let i=0 ; i < lefting ; i+=1) {
        setRanking([...response , objDefault]);
      }
      console.log(ranking, "ranking");
    }
  }

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <div className="ranking-geral">
      <h3 id="ranking-geral-h3">Ranking Geral</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Nível</th>
            <th>Pontos</th>
          </tr>
        </thead>

        <tbody>
          {
            ranking ? ranking.map(({image, username, level, total_points}, ind) => (
                <tr
                  key={ind}
                >
                  <td><img src={image} alt="" />{username}</td>
                  <td>{level}</td>
                  <td>{total_points}</td>
                </tr>
              )) : 'Loading'
          }
        </tbody>
      </table>
    </div>
  )
}

export default RankingGeral;
