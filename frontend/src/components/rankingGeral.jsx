import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRankingGeralApi } from '../services/api';
import '../styles/rankingGeral.css';

const RankingGeral = () => {
  const [ranking, setRanking] = useState([]);
  const router = useRouter();

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
            ranking ? ranking.map(({image, username, level, total_points, id}, ind) => (
                <tr
                  key={ind}
                  onClick={() => id && router.push(`/player/${id}`)}
                  className="ranking-row-clickable"
                >
                  <td>
                    <img
                      src={image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="28" height="28"%3E%3Ccircle cx="14" cy="14" r="14" fill="%23ddd"/%3E%3C/svg%3E'}
                      alt=""
                    />
                    {username}
                  </td>
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
