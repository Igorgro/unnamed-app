import { Router, Request, Response } from 'express';

import { loginController, registerController } from '../../controllers/api';

export const apiRouter = Router();
apiRouter.get('/', (req: Request, res: Response) => {
    res.send({ version: '1.0' });
});

apiRouter.post('/login', loginController);
apiRouter.post('/register', registerController);
