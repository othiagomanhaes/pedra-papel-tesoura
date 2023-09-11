import { Request, Response } from 'express';
import ILogin from '../interface/login.interface';
import IPlayer from '../interface/player.interface';
import PlayerService from '../service/playersService';

const createPlayer = async (req: Request<IPlayer>, res: Response) => {
  try {
    const { body } = req;
    const newPlayer = await PlayerService.createPlayer(body);
    return res.status(201).json({ message: newPlayer });
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

const playerById = async (req: Request<IPlayer>, res: Response) => {
  try {
    const { id } = req.params;
    
    const player = await PlayerService.playerById(Number(id));
    if(player) {
      return res.status(200).json({ player });
    }
  } catch (error) {
    res.status(404).json({ message: "player not found!" })
  }
}

const PlayerController = { createPlayer, login, allPlayers, playerById };
export default PlayerController;
