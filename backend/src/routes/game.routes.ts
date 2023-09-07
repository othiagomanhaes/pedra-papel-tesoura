import express from 'express';
import PlayerController from '../controller/playerController';

const gameRouter = express.Router();

gameRouter.get('/:id', PlayerController.playerById);

gameRouter.get('/', PlayerController.allPlayers);

export default gameRouter;