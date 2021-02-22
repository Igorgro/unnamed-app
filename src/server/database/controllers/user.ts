import { Repository } from 'typeorm';

import { Role, User } from '../../types';
import { TokenEntity } from '../entities/token';
import { UserEntity } from '../entities/user';

export class UserController {
    private _userRep;
    private _tokenRep;

    constructor(userRep: Repository<UserEntity>, tokenRep: Repository<TokenEntity>) {
        this._userRep = userRep;
        this._tokenRep = tokenRep;
    }

    async registerUser(user: User): Promise<UserEntity> {
        return await this._userRep.save(this._userRep.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            passHash: user.passwordHash,
            role: Role.USER
        }));
    }

    async getUserByUsername(username: string): Promise<UserEntity | undefined> {
        return await this._userRep.findOne({
            username
        });
    }

    async setTokenForUser(user: UserEntity, token: string): Promise<void> {
        await this._tokenRep.save(this._tokenRep.create({
            token,
            user
        }));
    }

    async getUserByToken(token: string): Promise<UserEntity|undefined> {
        const tokenEnt =  await this._tokenRep.findOne({
            relations: ['user'],
            where: {
                token
            }
        });
        if (tokenEnt) {
            return tokenEnt.user;
        }
        return undefined;
    }
}
