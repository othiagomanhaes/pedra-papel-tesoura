import express from 'express';
import PlayerController from '../controller/playerController';
import middlewares from '../middleware/validatePlayer';

const { verifyAlreadyPlayerById, verifyEmail, verifyUsername, verifyBio } = middlewares;

const playerRouter = express.Router();

playerRouter.get('/', PlayerController.allPlayers);
playerRouter.get('/playerRanking', PlayerController.rankingPlayers);
playerRouter.get('/playerRankingByDay', PlayerController.rankingPlayersByDay);
playerRouter.get('/playerRankingByWeek', PlayerController.rankingPlayersByWeek);
playerRouter.get('/playerRankingByMonth', PlayerController.rankingPlayersByMonth);
playerRouter.get('/:id', verifyAlreadyPlayerById, PlayerController.playerById);
playerRouter.get('/statistic/:id', verifyAlreadyPlayerById, PlayerController.statisticPlayerById);

playerRouter.post('/editEmail', verifyAlreadyPlayerById, verifyEmail, PlayerController.updateEmailById);
playerRouter.post('/editUsername', verifyAlreadyPlayerById, verifyUsername, PlayerController.updateUsernameById);
playerRouter.post('/editBio', verifyBio, verifyAlreadyPlayerById, PlayerController.updateBioById);
playerRouter.post('/editImage', verifyAlreadyPlayerById, PlayerController.updateImageById);

playerRouter.delete('/:id', verifyAlreadyPlayerById, PlayerController.deleteById)

export default playerRouter;