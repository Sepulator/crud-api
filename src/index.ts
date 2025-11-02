import { router } from '@/router';
import { createServer } from 'node:http';

const PORT = 4000;

const server = createServer((request, response) => {
  router(request, response);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
