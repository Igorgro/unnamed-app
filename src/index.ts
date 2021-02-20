import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../.env') });

import { getDatabase } from './database';
import { User } from './types';

(async function() {
    const db = await getDatabase();

    const user: User =  {
        username: 'vpupkin',
        email: 'vpupkin@edu.com',
        password: '12345'
    };
    await db.getUserController().registerUser(user);

    await db.close();
})().catch(console.log);
