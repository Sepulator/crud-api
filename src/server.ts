import { router } from '@/router';
import { createServer } from 'node:http';
import { loadEnvFile, env } from 'node:process';

loadEnvFile('.env');

const PORT = env['PORT'] ?? 4000;

export const server = createServer((request, response) => {
  router(request, response);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
