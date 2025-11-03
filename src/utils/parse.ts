import { IncomingMessage } from 'node:http';

import { UserPayload } from '@/types/user';
import { validate } from 'uuid';

export const parseId = (url: string): string | null => {
  const splitUrl = url.split('/');
  const id = splitUrl[3] ?? null;
  return validate(id) ? id : null;
};

export const getRequestBody = (request: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON format in request body.'));
      }
    });

    request.on('error', reject);
  });
};

export const validateUserPayload = (data: unknown): { payload: UserPayload | null; errors: string[] } => {
  const errors: string[] = [];

  if (typeof data !== 'object' || data === null) {
    errors.push('Invalid JSON data provided.');
    return { payload: null, errors };
  }

  const payload = data as Record<string, unknown>;

  if (!('username' in payload) || typeof payload['username'] !== 'string') {
    errors.push('Username is required and must be a string.');
  }

  if (!('age' in payload) || typeof payload['age'] !== 'number') {
    errors.push('Age is required and must be a number.');
  }

  if (
    !('hobbies' in payload) ||
    !Array.isArray(payload['hobbies']) ||
    !payload['hobbies'].every((h) => typeof h === 'string')
  ) {
    errors.push('Hobbies is required and must be an array of strings.');
  }

  if (errors.length > 0) {
    return { payload: null, errors };
  }

  return {
    payload: {
      username: payload['username'] as string,
      age: payload['age'] as number,
      hobbies: payload['hobbies'] as string[],
    },
    errors: [],
  };
};
