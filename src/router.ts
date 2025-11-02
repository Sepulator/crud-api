import { userController } from '@/controller';
import { IncomingMessage, ServerResponse } from 'node:http';

export const router = async (request: IncomingMessage, response: ServerResponse) => {
  const { method, url } = request;
  console.log(url, method);
  if (url === '/api/users' && method === 'GET') {
    await userController.getAllUsers(response);
  }
};
