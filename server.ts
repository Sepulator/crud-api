import http from 'http';
import { config as dotenvConfig } from 'dotenv';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from './src/controllers';

dotenvConfig();
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  try {
    const id = req.url?.split('/')[3] || null;
    const usersUrl = req.url?.startsWith('/api/users/');

    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (usersUrl && req.method === 'GET') {
      getUser(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (usersUrl && req.method === 'PUT') {
      updateUser(req, res, id);
    } else if (usersUrl && req.method === 'DELETE') {
      removeUser(req, res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid Route' }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
});

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
