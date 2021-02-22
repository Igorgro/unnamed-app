import { Router, Request, Response } from 'express';
import { authMiddleware } from '../../middlewares';

import { authRouter } from './auth';
import { userRouter } from './user';

export const apiRouter = Router();

// APIs without auth
apiRouter.get('/', (req: Request, res: Response) => {
    res.send({ version: '1.0' });
});
apiRouter.use('/auth', authRouter);

// APIs with auth
apiRouter.use(authMiddleware);

apiRouter.use('/user', userRouter);
