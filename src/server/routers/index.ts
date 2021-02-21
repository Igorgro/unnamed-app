import { Router, Request, Response } from 'express';

import { apiRouter } from './api';

export const indexRouter = Router();
indexRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello, world');
});

indexRouter.use('/api', apiRouter);
