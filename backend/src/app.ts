import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());


app.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'To servindo bem' })
});

export default app;
