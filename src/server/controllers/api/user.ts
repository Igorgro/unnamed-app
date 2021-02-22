import { Response, Request } from 'express';
import { getDatabase } from '../../database';

export async function profileController(req: Request, res: Response): Promise<void> {
    const db = await getDatabase();
    if (res.locals.username) {
        const user = await db.getUserController().getUserByUsername(res.locals.username);
        if (user) {
            res.send({
                code: 200,
                message: 'Success',
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            });
        }
        else {
            res.statusCode = 400;
            res.send({
                code: 400,
                message: 'Error'
            });
        }
    }

}
