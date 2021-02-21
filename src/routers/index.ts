import { Router, Request, Response } from 'express';

export const indexRouter = Router();
indexRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello, world');
});
