import { Request, Response } from 'express';
import ILogin from '../interface/login.interface';
import IPlayer from '../interface/player.interface';
import PlayerService from '../service/playersService';

const createPlayer = async (req: Request<IPlayer>, res: Response) => {
  try {
    const { body } = req;
    const newPlayer = await PlayerService.createPlayer(body);
    if(newPlayer) {
      return res.status(201).json({ newPlayer });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req: Request<ILogin>, res: Response) => {
  try {
    const { body } = req;
    const player = await PlayerService.login(body);
    if(player) {
      return res.status(200).json({ message: "Login efetuado com sucesso!"})
    }
    throw new Error();
  } catch (error) {
    res.status(401).json({ message: 'Username or password invalid' });
  }
}

const allPlayers = async (_req: Request<ILogin>, res: Response) => {
  const allPlayersList = await PlayerService.allPlayers();
  if (allPlayersList) {
    return res.status(200).json({ allPlayersList });
  }
}

const PlayerController = { createPlayer, login, allPlayers };
export default PlayerController;
