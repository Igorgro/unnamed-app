import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../../.env') });

import express from 'express';
import cookieParser from 'cookie-parser';
import { json } from 'body-parser';

import { indexRouter } from './routers';

import { getDatabase } from './database';

const app = express();

app.use(cookieParser());
app.use(json());

app.use('/', indexRouter);

const server = app.listen(3000);

process.on('SIGTERM', stopp);
process.on('SIGINT', stopp);

async function stopp() {
    server.close();
    await (await getDatabase()).close();
}
