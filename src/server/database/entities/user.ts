import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../../types';
import { TokenEntity } from './token';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId!: number;

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    username!: string;

    @Column()
    passHash!: string;

    @Column()
    email!: string;

    @Column({
        type: 'enum',
        enum: Role
    })
    role!: Role

    @OneToMany(type => TokenEntity, token => token.user)
    tokens!: TokenEntity[]
}
