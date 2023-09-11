import express from 'express';
import PlayerController from '../controller/playerController';

const playerRouter = express.Router();

playerRouter.get('/:id', PlayerController.playerById);

playerRouter.get('/', PlayerController.allPlayers);

export default playerRouter;