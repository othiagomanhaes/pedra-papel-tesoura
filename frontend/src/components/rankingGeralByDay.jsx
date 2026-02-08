import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRankingGeralByDayApi } from '../services/api';
import '../styles/rankingGeral.css';

const RankingGeralByDay = () => {
  const [ranking, setRanking] = useState([]);
  const router = useRouter();

  const getAllPlayersByDay = async () => {
    const response = await getRankingGeralByDayApi();
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
    }
  }

  useEffect(() => {
    getAllPlayersByDay();
  }, []);

  return (
    <div className="ranking-geral">
      <h3>Ranking do Dia</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            {/* <th>Nível</th> */}
            <th>Pontos</th>
          </tr>
        </thead>

        <tbody>
          {
            ranking ? ranking.map(({image, username, total_points, username_id}, ind) => (
                <tr
                  key={ind}
                  onClick={() => username_id && router.push(`/player/${username_id}`)}
                  className="ranking-row-clickable"
                >
                  <td>
                  <img
                    src={image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="28" height="28"%3E%3Ccircle cx="14" cy="14" r="14" fill="%23ddd"/%3E%3C/svg%3E'}
                    alt=""
                  />
                  {username}
                </td>
                  {/* <td>{level}</td> */}
                  <td>{total_points}</td>
                </tr>
              )) : 'Loading'
          }
        </tbody>
      </table>
    </div>
  )
}


export default RankingGeralByDay;
