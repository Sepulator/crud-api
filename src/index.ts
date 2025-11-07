import { createAndStartServer } from '@/server';
import { env } from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(env['PORT']) || 4000;

createAndStartServer(PORT);
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
