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

const allPlayersWeekFIVE = async (_req: Request<IGame>, res: Response) => {
  try {
    const allWeekFIVE = await GamesService.allPlayersWeekFIVE();
    res.status(200).json({ message: allWeekFIVE });
  } catch (error) {
    res.status(500).json(error);
  }
}

const allPlayersWeekTEN = async (_req: Request<IGame>, res: Response) => {
  try {
    const allWeekTEN = await GamesService.allPlayersWeekTEN();
    res.status(200).json({ message: allWeekTEN });
  } catch (error) {
    res.status(500).json(error);
  }
}

const allPlayersWeekFIFTEEN = async (_req: Request<IGame>, res: Response) => {
  try {
    const allWeeKFIFTEEN = await GamesService.allPlayersWeekFIFTEEN();
    res.status(200).json({ message: allWeeKFIFTEEN });
  } catch (error) {
    res.status(500).json(error);
  }
}

const allPlayersDayFIVE = async (_req: Request<IGame>, res: Response) => {
  try {
    const allDayFIVE = await GamesService.allPlayersDayFIVE();
    res.status(200).json({ message: allDayFIVE });
  } catch (error) {
    res.status(500).json(error);
  }
}

const allPlayersDayTEN = async (_req: Request<IGame>, res: Response) => {
  try {
    const allDayTEN = await GamesService.allPlayersDayTEN();
    res.status(200).json({ message: allDayTEN });
  } catch (error) {
    res.status(500).json(error);
  }
}

const allPlayersDayFIFTEEN = async (_req: Request<IGame>, res: Response) => {
  try {
    const allDayFIFTEEN = await GamesService.allPlayersDayFIFTEEN();
    res.status(200).json({ message: allDayFIFTEEN });
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
  allPlayersMonthFIFTEEN,
  allPlayersWeekFIVE,
  allPlayersWeekTEN,
  allPlayersWeekFIFTEEN,
  allPlayersDayFIVE,
  allPlayersDayTEN,
  allPlayersDayFIFTEEN
}
export default GamesController;
