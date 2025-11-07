import { createAndStartServer } from '@/server';
import { env } from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(env['PORT']) || 4000;

createAndStartServer(PORT);
