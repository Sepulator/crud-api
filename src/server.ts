import { router } from '@/router';
import { createServer } from 'node:http';

const server = createServer((request, response) => {
  router(request, response);
});

export { server };
