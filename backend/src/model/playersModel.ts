import {ResultSetHeader, RowDataPacket} from 'mysql2';
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

const PlayerModel = { createPlayer, login, allPlayers, playerById };
export default PlayerModel;
