import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import PlayerService from '../service/playersService';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'Credencial Google não fornecida' });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    if (!email) {
      return res.status(400).json({ message: 'Email não encontrado na conta Google' });
    }

    const player = await PlayerService.playerByEmail(email);
    const playerArray = Array.isArray(player) ? player : [player];

    if (playerArray.length > 0 && playerArray[0]) {
      return res.status(200).json({
        message: 'Login efetuado com sucesso!',
        player: playerArray,
      });
    }

    return res.status(200).json({
      needsUsername: true,
      email,
    });
  } catch (error) {
    console.error('Google login error:', error);
    return res.status(401).json({ message: 'Falha na autenticação Google' });
  }
};

const googleRegister = async (req: Request, res: Response) => {
  try {
    const { credential, username } = req.body;
    if (!credential || !username || username.length < 3) {
      return res.status(400).json({
        message: 'Credencial Google e nome de usuário (mín. 3 caracteres) são obrigatórios',
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    if (!email) {
      return res.status(400).json({ message: 'Email não encontrado na conta Google' });
    }

    const existingByEmail = await PlayerService.playerByEmail(email);
    const existingArray = Array.isArray(existingByEmail) ? existingByEmail : [existingByEmail];
    if (existingArray.length > 0) {
      return res.status(400).json({ message: 'Este email já está cadastrado' });
    }

    const existingByUsername = await PlayerService.playerByUsername(username);
    const usernameArray = Array.isArray(existingByUsername) ? existingByUsername : [existingByUsername];
    if (usernameArray.length > 0 && usernameArray[0]) {
      return res.status(400).json({ message: 'Nome de usuário já em uso' });
    }

    const newPlayer = await PlayerService.createPlayer({ username, email });
    const playerData = Array.isArray(newPlayer) ? newPlayer : [newPlayer];

    return res.status(201).json({
      message: 'Conta criada com sucesso!',
      player: playerData,
    });
  } catch (error) {
    console.error('Google register error:', error);
    return res.status(500).json({ message: 'Erro ao criar conta' });
  }
};

export default { googleLogin, googleRegister };
