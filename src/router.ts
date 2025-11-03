import { userController } from '@/controller';
import { IncomingMessage, ServerResponse } from 'node:http';

export const router = async (request: IncomingMessage, response: ServerResponse) => {
  const { method, url } = request;
  console.log(url, method);

  if (url === '/api/users' && method === 'GET') {
    await userController.getAllUsers(response);
  } else if (url === '/api/users' && method === 'POST') {
    await userController.createUser(request, response);
  } else if (url?.startsWith('/api/users/') && method === 'GET') {
    await userController.getUser(url, response);
  } else if (url?.startsWith('/api/users/') && method === 'PUT') {
    await userController.updateUser(request, response, url);
  }
};
