import express from 'express';
import GamesController from '../controller/gamesController';

const gameRouter = express.Router();

gameRouter.post('/', GamesController.createGame);

gameRouter.post('/month', GamesController.getGameByPlayerMonth);
gameRouter.post('/day', GamesController.getGameByPlayerDay);
gameRouter.post('/week', GamesController.getGameByPlayerWeek);

gameRouter.get('/monthFive', GamesController.allPlayersMonthFIVE);
gameRouter.get('/monthTen', GamesController.allPlayersMonthTEN);
gameRouter.get('/monthFifteen', GamesController.allPlayersMonthFIFTEEN);

export default gameRouter;
