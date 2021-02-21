import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user';

@Entity()
export class TokenEntity {
    @PrimaryColumn()
    token!: string;

    @ManyToOne(type => UserEntity, user => user.tokens)
    user!: UserEntity
}
