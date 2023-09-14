import { Request, Response, NextFunction} from 'express';
import IPlayer from '../interface/player.interface';
import PlayerModel from '../model/playersModel';

const auxVerifyEmail = (email: string) => {
  if (!email) return false

  const rgx = /\S+@\S+\.\S+/;
  const validateEmail = rgx.test(email);
  if (!validateEmail) return false
  
  return true
}

const auxVerifyUsername = (username: string) => {
  const validateUsername = username.length >= 3;
  if (!validateUsername) return false
  return true
}

const verifyPlayer = (req: Request<IPlayer>, res: Response, next: NextFunction) => {
  const { username, email } = req.body;

  if (!auxVerifyUsername(username) || !auxVerifyEmail(email)) return res.status(400).json({ message: 'você deve preencher todos os campos!'});

  if (!auxVerifyUsername(username)) return res.status(400).json({ message: 'username precisa ter mais de três caracteres!' });

  if (!auxVerifyEmail(email)) return res.status(400).json({ message: 'email inválido!'});

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

const verifyAlreadyPlayerById = async (req: Request<IPlayer>, res: Response, next: NextFunction) => {

  const obj = {
    id: Number(req.params.id) | req.body.id,
  }
  const alreadyPlayerId = await PlayerModel.playerById(Number(obj.id));
  
  const becameString = JSON.stringify(alreadyPlayerId);
  const becameParse = JSON.parse(becameString);

  if (becameParse.length === 0) {
    return res.status(404).json({ message: "player not found!" });
  }

  next();
}

const verifyEmail = async (req: Request<IPlayer>, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!auxVerifyEmail(email)) return res.status(400).json({ message: 'email inválido!'});

  next();
}

const verifyUsername = async (req: Request<IPlayer>, res: Response, next: NextFunction) => {
  const { username } = req.body;
  if (!auxVerifyUsername(username)) return res.status(400).json({ message: 'username inválido!'});

  next();
}

const middlewares = { 
  verifyAlreadyPlayer,
  verifyPlayer,
  verifyAlreadyPlayerById,
  verifyEmail,
  verifyUsername
}

export default middlewares;
