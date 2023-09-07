import express, { Application, Request, Response } from 'express';
import loginRouter from './routes/login.routes';
import registerRouter from './routes/register.routes';


const app: Application = express();

app.use(express.json());


app.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'To servindo bem' })
});

app.use('/register', registerRouter);
app.use('/login', loginRouter);

export default app;
