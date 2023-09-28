import IStatistic from '../interface/statistic.interface';
import connection from './connection';

const createStatisc = async (statisc: IStatistic) => {
  const { username_id, victory, draw, defeat, rounds, matchs } = statisc;
  const [result] = await connection.execute(
    `INSERT INTO rpsdb_dev.statistic (username_id, victory, draw, defeat, rounds, matchs)
    VALUES (?, ?, ?, ?, ?, ?);`,
    [username_id, victory, draw, defeat, rounds, matchs]
  );

  return result;
}

const updtaeStatisc = async (statisc: IStatistic) => {
  const { username_id, victory, draw, defeat, rounds, matchs } = statisc;
  const [result] = await connection.execute(
    `UPDATE rpsdb_dev.statistic
    SET victory = victory + ?, draw = draw + ?, defeat = defeat + ?, rounds = rounds + ?, matchs = matchs + ?
    WHERE username_id = ?;`,
    [victory, draw, defeat, rounds, matchs, username_id]
  );

  return result;
}

const selecStatisticById = async (username_id: number) => {
  const [result] = await connection.execute(
    `SELECT * FROM rpsdb_dev.statistic
    WHERE username_id = ?;`,
    [username_id]
  )

  return result;
}

const statisticModel = { createStatisc, updtaeStatisc, selecStatisticById };
export default statisticModel;