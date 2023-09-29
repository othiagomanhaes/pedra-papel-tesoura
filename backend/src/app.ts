import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import loginRouter from './routes/login.routes';
import registerRouter from './routes/register.routes';
import playerRouter from './routes/player.routes';
import gameRouter from './routes/game.routes';


const app: Application = express();

app.use(cors());

app.use(express.json());


app.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'To servindo bem' })
});

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/player', playerRouter);
app.use('/game', gameRouter);

export default app;
