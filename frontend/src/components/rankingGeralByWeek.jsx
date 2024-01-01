import { useEffect, useState } from 'react';
import { getRankingGeralByWeekApi } from '../services/api';

const RankingGeralByWeek = () => {
  const [ranking, setRanking] = useState([]);

  const getAllPlayersByWeek = async () => {
    const response = await getRankingGeralByWeekApi();
    const responseSize = response.length
    const DEZ = 10;
    const lefting = DEZ - responseSize;
    const objDefault = {image: '', username: '', level: '', total_points: ''};

    if (responseSize > 10) {
      response.slice(0, 9);
      setRanking(response);
    } else {
      for (let i=0 ; i < lefting ; i+=1) {
        setRanking([...response , objDefault]);
      }
    }
  }

  useEffect(() => {
    getAllPlayersByWeek();
  }, []);

  return (
    <div className="ranking-geral">
      <h3>Ranking da Semana</h3>
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

export default RankingGeralByWeek;
