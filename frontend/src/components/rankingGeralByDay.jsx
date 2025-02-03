import { useEffect, useState } from 'react';
import { getRankingGeralByDayApi } from '../services/api';

const RankingGeralByDay = () => {
  const [ranking, setRanking] = useState([]);

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
            ranking ? ranking.map(({image, username, total_points}, ind) => (
                <tr
                  key={ind}
                >
                  <td><img src={image} alt="" />{username}</td>
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
