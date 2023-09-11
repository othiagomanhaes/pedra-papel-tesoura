import IGame from '../interface/game.interface';
import connection from './connection';

const createGame = async (game: IGame) => {
  const { username_id, round_id, points } = game;
  const [result] = await connection.execute(
    `INSERT INTO rpsdb_dev.games (username_id, rounds_id, points, date)
    VALUES (?, ?, ?, NOW());`,
    [username_id, round_id, points]
  )  

  return result;
}

const getGameByPlayerMonth = async (game: IGame) => {
  const { username_id, round_id } = game;
  const [result] = await connection.execute(
    `SELECT * FROM rpsdb_dev.games 
    WHERE username_id = ? AND rounds_id = ? AND DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m')
    ORDER BY points DESC
    LIMIT 1;`,
    [username_id, round_id]
  )

  return result;
}

const getGameByPlayerDay = async (game: IGame) => {
  const { username_id, round_id } = game;
  const [result] = await connection.execute(
    `SELECT * FROM rpsdb_dev.games 
    WHERE username_id = ? AND rounds_id = ? AND DATE_FORMAT(date, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
    ORDER BY points DESC
    LIMIT 1;`,
    [username_id, round_id]
  )

  return result;
}

const getGameByPlayerWeek = async (game: IGame) => {
  const { username_id, round_id } = game;
  const [result] = await connection.execute(
    `SELECT * FROM rpsdb_dev.games 
    WHERE WEEK(date) = WEEK(NOW())
    ORDER BY points DESC
    LIMIT 1;`,
    [username_id, round_id]
  )

  return result;
}

const allPlayersMonthFIVE = async () => {
  const [result] = await connection.execute(
    `SELECT Pla.username, Ro.quantity, MAX(Ga.points) AS max_points
    FROM rpsdb_dev.games AS Ga
    INNER JOIN rpsdb_dev.players AS Pla ON Pla.id = Ga.username_id
    INNER JOIN rpsdb_dev.rounds AS Ro ON Ro.id = Ga.rounds_id
    WHERE DATE_FORMAT(Ga.date, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') AND Ro.quantity = 5
    GROUP BY Pla.username, Ro.quantity
    ORDER BY max_points DESC;`,
  )

  return result;
}

const allPlayersMonthTEN = async () => {
  const [result] = await connection.execute(
    `SELECT Pla.username, Ro.quantity, MAX(Ga.points) AS max_points
    FROM rpsdb_dev.games AS Ga
    INNER JOIN rpsdb_dev.players AS Pla ON Pla.id = Ga.username_id
    INNER JOIN rpsdb_dev.rounds AS Ro ON Ro.id = Ga.rounds_id
    WHERE DATE_FORMAT(Ga.date, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') AND Ro.quantity = 10
    GROUP BY Pla.username, Ro.quantity
    ORDER BY max_points DESC;`,
  )

  return result;
}

const allPlayersMonthFIFTEEN = async () => {
  const [result] = await connection.execute(
    `SELECT Pla.username, Ro.quantity, MAX(Ga.points) AS max_points
    FROM rpsdb_dev.games AS Ga
    INNER JOIN rpsdb_dev.players AS Pla ON Pla.id = Ga.username_id
    INNER JOIN rpsdb_dev.rounds AS Ro ON Ro.id = Ga.rounds_id
    WHERE DATE_FORMAT(Ga.date, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') AND Ro.quantity = 15
    GROUP BY Pla.username, Ro.quantity
    ORDER BY max_points DESC;`,
  )

  return result;
}


const GamesModel = { 
  createGame,
  getGameByPlayerMonth,
  getGameByPlayerDay,
  getGameByPlayerWeek,
  allPlayersMonthFIVE,
  allPlayersMonthTEN,
  allPlayersMonthFIFTEEN
 };
export default GamesModel;
