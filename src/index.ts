import { server } from '@/server';
import { env } from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

const PORT = env['PORT'] ?? 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
