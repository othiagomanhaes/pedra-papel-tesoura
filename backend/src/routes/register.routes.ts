import express from 'express';
import PlayerController from '../controller/playerController';

const registerRouter = express.Router();

registerRouter.post('/', PlayerController.createPlayer);

registerRouter.get('/', PlayerController.allPlayers)

export default registerRouter;
