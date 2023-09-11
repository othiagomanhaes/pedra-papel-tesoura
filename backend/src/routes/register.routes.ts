import express from 'express';
import PlayerController from '../controller/playerController';
import middlewares from '../middleware/validatePlayer';

const {  verifyPlayer, verifyAlreadyPlayer } = middlewares

const registerRouter = express.Router();

registerRouter.post('/', verifyPlayer, verifyAlreadyPlayer, PlayerController.createPlayer);

export default registerRouter;
