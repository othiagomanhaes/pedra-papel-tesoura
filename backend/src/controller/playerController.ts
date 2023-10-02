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
    if (player.length > 0) {
      return res.status(200).json({ message: "Login efetuado com sucesso!", player });
    }
    return res.status(404).json({ message: 'username ou email não cadastrados'});
  } catch (error) {
    res.status(401).json(error);
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
    const obj = {
      id: Number(req.params.id) | req.body.id,
    }

    const player = await PlayerService.playerById(Number(obj.id));
    return res.status(200).json({ player });

  } catch (error) {
    res.status(404).json({ error })
  }
}

const statisticPlayerById = async (req: Request<IPlayer>, res: Response) => {
  try {
    const obj = {
      id: Number(req.params.id) | Number(req.body.id),
    }

    const statiscPlayer = await PlayerService.statisticPlayerById(obj.id);
    return res.status(200).json({ statiscPlayer });

  } catch (error) {
    res.status(404).json({ error })
  }
}

const updateEmailById = async (req: Request<IPlayer>, res: Response) => {
  try {
    const { id, email } = req.body;
    await PlayerService.updateEmailById(id, email);
    return res.status(200).json({ message: 'email atualizado com sucesso'})
    
  } catch (error) {
    res.status(500).json(error);
  }
}

const updateUsernameById = async (req: Request<IPlayer>, res: Response) => {
  try {
    const { id, username } = req.body;
    await PlayerService.updateUsernameById(id, username);
    return res.status(200).json({ message: 'username atualizado com sucesso'});
    
  } catch (error) {
    res.status(500).json(error);
  }
}

const updateBioById = async (req: Request<IPlayer>, res: Response) => {
  try {
    const { id, bio } = req.body;
    await PlayerService.updateBioById(id, bio);
    return res.status(200).json({ message: 'bio atualizada com sucesso'});
    
  } catch (error) {
    res.status(500).json(error);
  }
}

const updateImageById = async (req: Request<IPlayer>, res: Response) => {
  try {
    const { id, image } = req.body;
    await PlayerService.updateImageById(id, image);
    return res.status(200).json({ message: 'imagem atualizada com sucesso'});
    
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteById = async (req: Request<IPlayer>, res: Response) => {
  try {
    const { id } = req.params;
    await PlayerService.deleteById(Number(id));
    return res.status(200).json({ message: 'player excluído com sucesso'})
    
  } catch (error) {
    res.status(500).json(error);
  }
}

const PlayerController = { 
  createPlayer,
  login,
  allPlayers,
  playerById,
  updateEmailById,
  updateUsernameById,
  deleteById,
  updateBioById,
  updateImageById,
  statisticPlayerById
};
export default PlayerController;
