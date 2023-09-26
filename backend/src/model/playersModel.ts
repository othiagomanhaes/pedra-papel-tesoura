import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';
import ILogin from '../interface/login.interface';
import IPlayer from '../interface/player.interface';

const createPlayer = async (player: IPlayer): Promise<IPlayer> => {
  const { username, email } = player;
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO rpsdb_dev.players (username, email, date) 
    VALUES (?, ?, NOW())`,
     [username, email]
  );

  const { insertId } = result;
  return { id: insertId, ...player };
};

const login = async (loginData: ILogin) => {
  const { username, email } = loginData;
  const [result] = await connection.execute<RowDataPacket[] & ILogin>(
    `SELECT * FROM rpsdb_dev.players
    WHERE username = ? AND email = ?;`,
    [username, email]
  );

  return result;
}

const allPlayers = async (): Promise<IPlayer[]> => {
  const [result] = await connection.execute<RowDataPacket[] & IPlayer[]>(
    `SELECT * FROM rpsdb_dev.players;`
  )

  return result;
}

const playerById = async (id: number): Promise<IPlayer> => {
  const [result] = await connection.execute<ResultSetHeader & IPlayer>(
    `SELECT * FROM rpsdb_dev.players
    WHERE id = (?);`,
    [id]
  )  

  return result;
}

const playerByEmail = async (email: string): Promise<IPlayer> => {
  const [result] = await connection.execute<ResultSetHeader & IPlayer>(
    `SELECT * FROM rpsdb_dev.players WHERE email = ?`,
    [email]
  )

  return result;
}

const playerByUsername = async (username: string): Promise<IPlayer> => {
  const [result] = await connection.execute<ResultSetHeader & IPlayer>(
    `SELECT * FROM rpsdb_dev.players WHERE username = ?`,
    [username]
  )

  return result;
}

const updateEmailById = async (id: number, email: string): Promise<void> => {
  await connection.execute(
    `UPDATE rpsdb_dev.players
    SET email = ?
    WHERE id = ?;`,
    [email, id]
  )
}

const updateUsernameById = async (id: number, username: string): Promise<void> => {
  await connection.execute(
    `UPDATE rpsdb_dev.players
    SET username = ?
    WHERE id = ?;`,
    [username, id]
  )
}

const updateBioById = async (id: number, bio: string): Promise<void> => {
  await connection.execute(
    `UPDATE rpsdb_dev.players
    SET bio = ?
    WHERE id = ?;`,
    [bio, id]
  )
}

const updateImageById = async (id: number, image: string): Promise<void> => {
  await connection.execute(
    `UPDATE rpsdb_dev.players
    SET image = ?
    WHERE id = ?;`,
    [image, id]
  )
}

const updatePointsById = async (id: number, points: number): Promise<void> => {
  await connection.execute(
    `UPDATE rpsdb_dev.players
    SET total_points = total_points + ?
    WHERE id = ?;`,
    [points, id]
  )
}

const updtadeLevelById = async (id: number): Promise<void> => {
  await connection.execute(
    `UPDATE rpsdb_dev.players
    SET level = CASE
      WHEN total_points < 100 THEN 1
      ELSE FLOOR(1 + LOG(total_points / 100) / LOG(1.5))
    END
    WHERE id = ?;`,
    [id]
  )
}

const deleteById = async (id: number ): Promise<void> => {
  await connection.execute(
    `DELETE FROM rpsdb_dev.players
    WHERE id = ?;`,
    [id]
  )
}

const PlayerModel = { 
  createPlayer,
  login,
  allPlayers,
  playerById,
  playerByEmail,
  playerByUsername,
  updateEmailById,
  updateUsernameById,
  deleteById,
  updateBioById,
  updateImageById,
  updatePointsById,
  updtadeLevelById
};
export default PlayerModel;
