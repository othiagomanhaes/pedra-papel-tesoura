import express from 'express';
import PlayerController from '../controller/playerController';

const loginRouter = express.Router();

loginRouter.post('/', PlayerController.login);

export default loginRouter;