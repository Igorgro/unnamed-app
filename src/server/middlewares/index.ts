import { Request, Response, NextFunction } from 'express';

import { getDatabase } from '../database';

export async function authMiddleware(req: Request<{ token: string}>, res: Response, next: NextFunction): Promise<void> {
    const db = await getDatabase();

    if (typeof req.cookies == 'object') {
        const cookies = (req.cookies as { token?: string });
        if (cookies.token) {
            const user = await db.getUserController().getUserByToken(cookies.token);
            if (user) {
                res.locals.username = user.username;
                next();
            }
            else {
                res.statusCode = 401;
                res.send({
                    code: 401,
                    message: 'Unauthorized'
                });
            }
        }
        else {
            res.statusCode = 401;
            res.send({
                code: 401,
                message: 'Unauthorized'
            });
        }
    }
    else {
        res.statusCode = 401;
        res.send({
            code: 401,
            message: 'Unauthorized'
        });
    }
}
