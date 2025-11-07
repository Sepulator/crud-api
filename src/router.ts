import { userController } from '@/controller';
import { sendResponse } from '@/controller/user-controller';
import { IncomingMessage, ServerResponse } from 'node:http';

export const router = async (request: IncomingMessage, response: ServerResponse) => {
  const { method, url } = request;
  console.log(url, method);

  try {
    if (url === '/api/users' && method === 'GET') {
      await userController.getAllUsers(response);
    } else if (url === '/api/users' && method === 'POST') {
      await userController.createUser(request, response);
    } else if (url?.startsWith('/api/users/') && method === 'GET') {
      await userController.getUser(url, response);
    } else if (url?.startsWith('/api/users/') && method === 'PUT') {
      await userController.updateUser(request, response, url);
    } else if (url?.startsWith('/api/users/') && method === 'DELETE') {
      await userController.deleteUser(url, response);
    } else {
      sendResponse(response, 404, 'Endpoint not found');
    }
  } catch (error) {
    sendResponse(response, 505, error instanceof Error ? error.message : 'Internal server error');
  }
};
