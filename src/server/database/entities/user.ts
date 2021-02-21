import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../types';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId!: number;

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
}
