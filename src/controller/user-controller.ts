import { userService } from '@/services';
import { UserPayload } from '@/types/user';
import { getRequestBody } from '@/utils/parse';
import type { IncomingMessage, ServerResponse } from 'node:http';

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

export async function createUser(request: IncomingMessage, response: ServerResponse) {
  try {
    const body = (await getRequestBody(request)) as Partial<UserPayload>;
    const result = await userService.createUser(body);
    const statusCode = result.success ? 201 : 400;
    const data = result.success ? result.data : result.error;
    sendResponse(response, statusCode, data);
  } catch (error) {
    sendResponse(response, 400, error instanceof Error ? error.message : 'Invalid request body');
  }
}

export async function getUser(url: string, response: ServerResponse) {
  const result = await userService.getUser(url);
  const statusCode = result.success ? (result.data ? 200 : 404) : 400;
  const data = result.success && result.data ? result.data : result.error;
  sendResponse(response, statusCode, data);
}

export async function updateUser(request: IncomingMessage, response: ServerResponse, url: string) {
  try {
    const body = (await getRequestBody(request)) as Partial<UserPayload>;
    const result = await userService.updatedUser(url, body);
    const statusCode = result.success ? (result.data ? 200 : 404) : 400;
    const data = result.success && result.data ? result.data : result.error;
    sendResponse(response, statusCode, data);
  } catch (error) {
    sendResponse(response, 400, error instanceof Error ? error.message : 'Invalid request body');
  }
}
