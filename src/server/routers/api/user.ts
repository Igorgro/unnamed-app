import { Router } from 'express';

import { profileController  } from '../../controllers/api/user';

export const userRouter = Router();

userRouter.get('/profile', profileController);
