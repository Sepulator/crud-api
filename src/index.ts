import { server } from '@/server';
import { loadEnvFile, env } from 'node:process';

try {
  loadEnvFile();
} catch {
  console.error('.env file not found');
}

const PORT = env['PORT'] ?? 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
