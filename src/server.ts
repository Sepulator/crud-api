import { IncomingMessage, ServerResponse, createServer } from 'http';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from './controllers';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    const id = req.url?.split('/')[3] || null;
    const usersUrl = req.url?.startsWith('/api/users/');

    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(res);
    } else if (usersUrl && req.method === 'GET') {
      getUser(res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (usersUrl && req.method === 'PUT') {
      updateUser(req, res, id);
    } else if (usersUrl && req.method === 'DELETE') {
      removeUser(res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid Route' }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
});

export { server };
