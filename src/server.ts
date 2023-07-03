import { IncomingMessage, ServerResponse, createServer } from 'http';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from './controllers';
import { ErrorMessage } from './error-messages';

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
      ErrorMessage.InvalidRoute(res);
    }
  } catch (error) {
    ErrorMessage.ServerError(res);
  }
});

export { server };
