import { userService } from '@/services';
import type { ServerResponse } from 'http';

export function sendResponse(response: ServerResponse, statusCode: number, data: unknown) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
}

export async function getAllUsers(response: ServerResponse) {
  const result = await userService.getAllUsers();
  const statusCode = result.success ? 200 : 500;
  const data = result.success ? result.data : result.error;
  sendResponse(response, statusCode, data);
}
