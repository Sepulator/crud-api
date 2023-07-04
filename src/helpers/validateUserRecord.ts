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
    const isValidUserName = typeof parsedData.username === 'string';
    const isValidAge = typeof parsedData.age === 'number';
    const isValidHobbies =
      Array.isArray(parsedData.hobbies) &&
      parsedData.hobbies.every((hobby) => typeof hobby === 'string');
    if (isValidAge && isValidHobbies && isValidUserName) {
      return {
        username: parsedData.username,
        age: parsedData.age,
        hobbies: parsedData.hobbies,
      };
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
    const parsed = JSON.parse(body) as UserRecordUpdate;
    const isValidUserName =
      parsed.username === undefined || typeof parsed.username === 'string';
    const isValidAge =
      parsed.age === undefined || typeof parsed.age === 'number';
    const isValidHobbies =
      parsed.hobbies === undefined ||
      (Array.isArray(parsed.hobbies) &&
        parsed.hobbies.every((hobby) => typeof hobby === 'string'));

    if (isValidAge && isValidHobbies && isValidUserName) {
      return {
        username: parsed.username,
        age: parsed.age,
        hobbies: parsed.hobbies,
      };
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
