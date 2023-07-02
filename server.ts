import http from 'http';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from './src/controllers';

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url?.startsWith('/api/users/') && req.method === 'GET') {
    const id = req.url?.split('/')[3] || null;
    getUser(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (req.url?.startsWith('/api/users/') && req.method === 'PUT') {
    const id = req.url?.split('/')[3] || null;
    updateUser(req, res, id);
  } else if (req.url?.startsWith('/api/users/') && req.method === 'DELETE') {
    const id = req.url?.split('/')[3] || null;
    removeUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
