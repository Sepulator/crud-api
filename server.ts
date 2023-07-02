import http from 'http';

import { getUsers, getUser } from './src/controllers';

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url?.startsWith('/api/users/') && req.method === 'GET') {
    const id = req.url?.split('/')[3] || null;
    getUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
