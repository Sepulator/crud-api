import { UserRecord } from '../models';

export interface UserRecordUpdate {
  username?: string;
  age?: number;
  hobbies?: string[];
}

export function validateUserRecord(
  body: string,
): Omit<UserRecord, 'id'> | null {
  try {
    const parsedData = JSON.parse(body) as Omit<UserRecord, 'id'>;
    if (
      typeof parsedData.username === 'string' &&
      typeof parsedData.age === 'number' &&
      Array.isArray(parsedData.hobbies) &&
      parsedData.hobbies.every((hobby) => typeof hobby === 'string')
    ) {
      return parsedData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export function validateUpdateUserRecord(
  body: string,
): UserRecordUpdate | null {
  try {
    const parsedData = JSON.parse(body) as UserRecordUpdate;

    if (
      typeof parsedData === 'object' &&
      (parsedData.username === undefined ||
        typeof parsedData.username === 'string') &&
      (parsedData.age === undefined || typeof parsedData.age === 'number') &&
      (parsedData.hobbies === undefined || Array.isArray(parsedData.hobbies))
    ) {
      return parsedData;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
