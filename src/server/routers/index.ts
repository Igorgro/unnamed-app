
import { resolve } from 'path';
import { Router, static as estatic } from 'express';

import { apiRouter } from './api';

export const indexRouter = Router();
// indexRouter.get('/', (req: Request, res: Response) => {
//     res.send('Hello, world');
// });

indexRouter.use(estatic(resolve(__dirname, '../../../dist/app')));
indexRouter.use('/api', apiRouter);
indexRouter.get('*', (req, res) => {
    res.sendFile(
        resolve(__dirname, '../../../dist/app/index.html')
    );
});

