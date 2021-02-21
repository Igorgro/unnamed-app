import { Response, Request } from 'express';
import bcrypt from 'bcrypt';

import { getDatabase } from '../database';
import { BasicResponse, LoginInfo, RegisterInfo } from './types';

export async function loginController(req: Request<unknown, unknown, LoginInfo>, res: Response<BasicResponse>): Promise<void> {
    const db = await getDatabase();

    const user = await db.getUserController().getUserByUsername(req.body.username);
    if(user) {
        if (await bcrypt.compare(req.body.password, user.passHash)) {
            res.statusCode = 200;
            res.send({
                code: 200,
                message: 'Success'
            });
        }
        else {
            res.statusCode = 400;
            res.send({
                code: 400,
                message: 'Invalid password'
            });
        }
    }
    else {
        res.statusCode = 400;
        res.send({
            code: 400,
            message: 'No such user'
        });
    }
}

export async function registerController(req: Request<unknown, unknown, RegisterInfo>, res: Response<BasicResponse>): Promise<void> {
    const db = await getDatabase();

    await db.getUserController().registerUser({
        username: req.body.username,
        passwordHash: await bcrypt.hash(req.body.password, await bcrypt.genSalt(2)),
        email: req.body.email
    });

    res.send({
        code: 200,
        message: 'Success'
    });
}
