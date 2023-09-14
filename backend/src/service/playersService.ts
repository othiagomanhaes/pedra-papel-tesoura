import PlayerModel from '../model/playersModel';
import ILogin from '../interface/login.interface';
import IPlayer from '../interface/player.interface';

const createPlayer = async (player: IPlayer): Promise<IPlayer> => {
  const newPlayer = await PlayerModel.createPlayer(player);
  return newPlayer;
};

const login = async (loginData: ILogin) => {
  const player = await PlayerModel.login(loginData);  
  return player;
}

const allPlayers = async () => {
  const allPlayersList = await PlayerModel.allPlayers();
  return allPlayersList;
}

const playerById = async (id: number) => {
  const player = await PlayerModel.playerById(id);
  return player;
}

const updateEmailById = async (id: number, email: string) => {
  await PlayerModel.updateEmailById(id, email); 
}

const updateUsernameById = async (id: number, username: string) => {
  await PlayerModel.updateUsernameById(id, username); 
}

const deleteById = async (id: number) => {
  await PlayerModel.deleteById(id);
}

const PlayerService = { 
  createPlayer,
  login,
  allPlayers,
  playerById,
  updateEmailById,
  updateUsernameById,
  deleteById
};
export default PlayerService;
