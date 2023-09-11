import IGame from '../interface/game.interface';
import GamesModel from '../model/gamesModel';

const createGame = async (game: IGame) => {
  const newGame = await GamesModel.createGame(game);
  return newGame;
}

const getGameByPlayerMonth = async (game: IGame) => {
  const gameMonth = await GamesModel.getGameByPlayerMonth(game);
  return gameMonth;
}

const getGameByPlayerDay = async (game: IGame) => {
  const gameMonth = await GamesModel.getGameByPlayerMonth(game);
  return gameMonth;
}

const getGameByPlayerWeek = async (game: IGame) => {
  const gameWeek = await GamesModel.getGameByPlayerWeek(game);
  return gameWeek;
}

const allPlayersMonthFIVE = async () => {
  const allMonthFIVE = await GamesModel.allPlayersMonthFIVE();
  return allMonthFIVE;
}

const allPlayersMonthTEN = async () => {
  const allMonthTEN = await GamesModel.allPlayersMonthTEN();
  return allMonthTEN;
}

const allPlayersMonthFIFTEEN = async () => {
  const allMonthFIFTEEN = await GamesModel.allPlayersMonthFIFTEEN();
  return allMonthFIFTEEN;
}

const GamesService = { 
  createGame,
  getGameByPlayerMonth,
  getGameByPlayerDay,
  getGameByPlayerWeek,
  allPlayersMonthFIVE,
  allPlayersMonthTEN,
  allPlayersMonthFIFTEEN
 };

export default GamesService;