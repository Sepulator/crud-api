import { UserRecord } from '../models';

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
