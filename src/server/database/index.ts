import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import { UserController } from './controllers/user';
import { TokenEntity } from './entities/token';
import { UserEntity } from './entities/user';

interface DatabaseOptions {
    host: string
    port: number
    username: string
    password: string
    database: string
}

class Database {
    private _options: ConnectionOptions;
    private _conn!: Connection;

    private _userController!: UserController;

    constructor(options: DatabaseOptions) {
        this._options = {
            type: 'postgres',
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            entities: [
                UserEntity,
                TokenEntity
            ],
            synchronize: true,
            logging: false
        };
    }

    async initialize(): Promise<void> {
        this._conn = await createConnection(this._options);
        this._userController = new UserController(this._conn.getRepository(UserEntity), this._conn.getRepository(TokenEntity));
    }

    getUserController(): UserController {
        return this._userController;
    }

    async close(): Promise<void> {
        await this._conn.close();
    }
}

let database: Database;

export async function getDatabase(): Promise<Database> {
    if (!database) {
        try {
            database = new Database({
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASS || '',
                database: process.env.DB_NAME || 'postgres'
            });
            await database.initialize();
        }
        catch {
            console.log('Error connect to database');
        }
    }
    return database;
}
