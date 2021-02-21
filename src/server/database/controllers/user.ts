import { Repository } from 'typeorm';
import { Role, User } from '../../types';
import { UserEntity } from '../entities/user';

export class UserController {
    private _rep;

    constructor(rep: Repository<UserEntity>) {
        this._rep = rep;
    }

    async registerUser(user: User): Promise<UserEntity> {
        return await this._rep.save(this._rep.create({
            email: user.email,
            username: user.username,
            passHash: user.passwordHash,
            role: Role.USER
        }));
    }

    async getUserByUsername(username: string): Promise<UserEntity | undefined> {
        return await this._rep.findOne({
            username
        });
    }
}
