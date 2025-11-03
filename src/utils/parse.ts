import { IncomingMessage } from 'node:http';

import { OptionalUser, UserKeys, UserPayload } from '@/types/user';
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

const validateString = (payload: Record<string, unknown>, prop: string) => {
  if (!(prop in payload)) {
    return undefined;
  }

  if (typeof payload[prop] !== 'string') {
    return null;
  }

  return payload[prop];
};

const validateNumber = (payload: Record<string, unknown>, prop: string) => {
  if (!(prop in payload)) {
    return undefined;
  }

  if (typeof payload[prop] !== 'number') {
    return null;
  }

  return payload[prop];
};

const validateArrayOfStrings = (payload: Record<string, unknown>, prop: string) => {
  if (!(prop in payload)) {
    return undefined;
  }

  if (!Array.isArray(payload[prop]) || !payload[prop].every((h) => typeof h === 'string')) {
    return null;
  }

  return payload[prop];
};

export const validateUserPayload = (data: unknown): { payload: UserPayload | null; errors: string[] } => {
  const errors: string[] = [];

  if (typeof data !== 'object' || data === null) {
    errors.push('Invalid JSON data provided.');
    return { payload: null, errors };
  }

  const payload = data as Record<string, unknown>;

  const username = validateString(payload, UserKeys.username);
  if (username === undefined) {
    errors.push('Username is required.');
  } else if (username === null) {
    errors.push('Username must be a string.');
  }

  const age = validateNumber(payload, UserKeys.age);
  if (age === undefined) {
    errors.push('Age is required.');
  } else if (age === null) {
    errors.push('Age must be a number.');
  }

  const hobbies = validateArrayOfStrings(payload, UserKeys.hobbies);
  if (hobbies === undefined) {
    errors.push('Hobbies is required.');
  } else if (hobbies === null) {
    errors.push('Hobbies must be an array of strings.');
  }

  if (errors.length > 0) {
    return { payload: null, errors };
  }

  return {
    payload: {
      username: username as string,
      age: age as number,
      hobbies: hobbies as string[],
    },
    errors: [],
  };
};

export const validateUserUpdatePayload = (data: unknown): { payload: OptionalUser | null; errors: string[] } => {
  const errors: string[] = [];

  if (typeof data !== 'object' || data === null) {
    errors.push('Invalid JSON data provided.');
    return { payload: null, errors };
  }

  const payload = data as Record<string, unknown>;
  const user: OptionalUser = {};

  const username = validateString(payload, UserKeys.username);
  if (username === null) {
    errors.push('Username must be a string.');
  } else if (username) {
    user.username = username;
  }

  const age = validateNumber(payload, UserKeys.age);
  if (age === null) {
    errors.push('Age must be a number.');
  } else if (age) {
    user.age = age;
  }

  const hobbies = validateArrayOfStrings(payload, UserKeys.hobbies);
  if (hobbies === null) {
    errors.push('Hobbies must be an array of strings.');
  } else if (hobbies) {
    user.hobbies = hobbies;
  }

  if (errors.length > 0) {
    return { payload: null, errors };
  }

  return {
    payload: user,
    errors: [],
  };
};
