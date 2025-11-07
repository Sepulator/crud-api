import { router } from '@/router';
import { createServer } from 'node:http';

export const createAndStartServer = (port: number) => {
  const server = createServer((request, response) => {
    router(request, response);
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  return server;
};
