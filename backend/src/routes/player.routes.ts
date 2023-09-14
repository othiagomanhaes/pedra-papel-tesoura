import express from 'express';
import PlayerController from '../controller/playerController';
import middlewares from '../middleware/validatePlayer';

const { verifyAlreadyPlayerById, verifyEmail, verifyUsername } = middlewares;

const playerRouter = express.Router();

playerRouter.get('/:id', verifyAlreadyPlayerById, PlayerController.playerById);
playerRouter.get('/', PlayerController.allPlayers);
playerRouter.post('/editEmail', verifyAlreadyPlayerById, verifyEmail, PlayerController.updateEmailById);
playerRouter.post('/editUsername', verifyAlreadyPlayerById, verifyUsername, PlayerController.updateUsernameById);
playerRouter.delete('/:id', verifyAlreadyPlayerById, PlayerController.deleteById)

export default playerRouter;