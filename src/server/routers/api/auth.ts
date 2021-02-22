import { Router } from 'express';

import { loginController, registerController } from '../../controllers/api/auth';

export const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
