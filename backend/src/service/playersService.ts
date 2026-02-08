import PlayerModel from '../model/playersModel';
import ILogin from '../interface/login.interface';
import IPlayer from '../interface/player.interface';
import statisticModel from '../model/statisticsModel';

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

const rankingPlayers = async () => {
  const allPlayersRanking = await PlayerModel.rankingPlayers();
  return allPlayersRanking;
}

const rankingPlayersByDay = async () => {
  const allPlayersRankingByDay =  await PlayerModel.rankingPlayersByDay();
  return allPlayersRankingByDay;
}

const rankingPlayersByWeek = async () => {
  const allPlayersRankingByWeek =  await PlayerModel.rankingPlayersByWeek();
  return allPlayersRankingByWeek;
}

const rankingPlayersByMonth = async () => {
  const allPlayersRankingByMonth =  await PlayerModel.rankingPlayersByMonth();
  return allPlayersRankingByMonth;
}

const playerById = async (id: number) => {
  const player = await PlayerModel.playerById(id);
  return player;
}

const playerByEmail = async (email: string) => {
  const player = await PlayerModel.playerByEmail(email);
  return player;
}

const playerByUsername = async (username: string) => {
  const player = await PlayerModel.playerByUsername(username);
  return player;
}

const statisticPlayerById = async (id: number) => {
  const statisc = await statisticModel.selecStatisticById(id);
  return statisc;
}

const updateEmailById = async (id: number, email: string) => {
  await PlayerModel.updateEmailById(id, email); 
}

const updateUsernameById = async (id: number, username: string) => {
  await PlayerModel.updateUsernameById(id, username); 
}

const updateBioById = async (id: number, bio: string) => {
  await PlayerModel.updateBioById(id, bio); 
}

const updateImageById = async (id: number, image: string) => {
  await PlayerModel.updateImageById(id, image); 
}

const deleteById = async (id: number) => {
  await PlayerModel.deleteById(id);
}

const PlayerService = { 
  createPlayer,
  login,
  allPlayers,
  rankingPlayers,
  rankingPlayersByDay,
  rankingPlayersByWeek,
  rankingPlayersByMonth,
  playerById,
  playerByEmail,
  playerByUsername,
  updateEmailById,
  updateUsernameById,
  deleteById,
  updateBioById,
  updateImageById,
  statisticPlayerById
};
export default PlayerService;
