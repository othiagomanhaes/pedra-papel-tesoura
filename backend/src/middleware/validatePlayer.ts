import { Request, Response, NextFunction} from 'express';
import IPlayer from '../interface/player.interface';
import PlayerModel from '../model/playersModel';

const verifyPlayer = (req: Request<IPlayer>, res: Response, next: NextFunction) => {
  const { username, email } = req.body;

  if (!username || !email) return res.status(400).json({ message: 'você deve preencher todos os campos!'});

  const validateUsername = username.length >= 3;
  if (!validateUsername) return res.status(400).json({ message: 'username precisa ter mais de três caracteres!' });

  const rgx = /\S+@\S+\.\S+/;
  const validateEmail = rgx.test(email);
  if (!validateEmail) return res.status(400).json({ message: 'email inválido!'});

  next();
}

const verifyAlreadyPlayer = async (req: Request<IPlayer>, res: Response, next: NextFunction) => {
  const { body } = req;
  const alreadyEmail = await PlayerModel.playerByEmail(body.email);
  const alreadyUsername = await PlayerModel.playerByUsername(body.username);

  const stringAlreadyEmail = JSON.stringify(alreadyEmail);
  const parseAlreadyEmail = JSON.parse(stringAlreadyEmail);
  const stringAlreadyUsername = JSON.stringify(alreadyUsername);
  const parseAlreadyUsername = JSON.parse(stringAlreadyUsername);

  if (parseAlreadyEmail.length > 0) {
    return res.status(400).json({ message: 'email já cadastrado'});
  }

  if (parseAlreadyUsername.length > 0) {
    return res.status(400).json({ message: 'username já cadastrado'});
  }

  next();
}

const middlewares = { verifyAlreadyPlayer, verifyPlayer }

export default middlewares;
