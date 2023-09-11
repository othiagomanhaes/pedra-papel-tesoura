import { Request, Response } from 'express';
import IGame from '../interface/game.interface';
import GamesService from '../service/gamesService';

const createGame = async (req: Request<IGame>, res: Response) => {
  try {
    const { body } = req;
    await GamesService.createGame(body);
    res.status(201).json({ message: 'Jogo criado com sucesso' })
  } catch (error) {
    res.status(500).json(error);
  }
}

const getGameByPlayerMonth = async (req: Request<IGame>, res: Response) => {
  try {
    const { body } = req;
    const gameMonth = await GamesService.getGameByPlayerMonth(body);
    res.status(200).json({ message: gameMonth });
  } catch (error) {
    res.status(500).json(error);
  }
}

const getGameByPlayerDay = async (req: Request<IGame>, res: Response) => {
  try {
    const { body } = req;
    const gameDay = await GamesService.getGameByPlayerMonth(body);
    res.status(200).json({ message: gameDay });
  } catch (error) {
    res.status(500).json(error);
  }
}

const getGameByPlayerWeek = async (req: Request<IGame>, res: Response) => {
  try {
    const { body } = req;
    const gameWeek = await GamesService.getGameByPlayerWeek(body);
    res.status(200).json({ message: gameWeek });
  } catch (error) {
    res.status(500).json(error);
  }
}

const allPlayersMonthFIVE = async (_req: Request<IGame>, res: Response) => {
  try {
    const allMonthFIVE = await GamesService.allPlayersMonthFIVE();
    res.status(200).json({ message: allMonthFIVE });
  } catch (error) {
    res.status(500).json(error);
  }
}

const allPlayersMonthTEN = async (_req: Request<IGame>, res: Response) => {
  try {
    const allMonthTEN = await GamesService.allPlayersMonthTEN();
    res.status(200).json({ message: allMonthTEN });
  } catch (error) {
    res.status(500).json(error);
  }
}

const allPlayersMonthFIFTEEN = async (_req: Request<IGame>, res: Response) => {
  try {
    const allMonthFIFTEEN = await GamesService.allPlayersMonthFIFTEEN();
    res.status(200).json({ message: allMonthFIFTEEN });
  } catch (error) {
    res.status(500).json(error);
  }
}


const GamesController = { 
  createGame,
  getGameByPlayerMonth,
  getGameByPlayerDay,
  getGameByPlayerWeek,
  allPlayersMonthFIVE,
  allPlayersMonthTEN,
  allPlayersMonthFIFTEEN
}
export default GamesController;
