import { v4 as uuidv4 } from 'uuid';

export interface UserRecord {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export let db: UserRecord[] = [];

export const findAll = (): Promise<UserRecord[]> => {
  return new Promise((resolve) => {
    resolve(db);
  });
};

export const findById = (id: string): Promise<UserRecord | null> => {
  return new Promise((resolve) => {
    const user = db.find((u) => u.id === id) || null;
    resolve(user);
  });
};

export const create = (
  user: Omit<UserRecord, 'id'>,
  id?: string,
): Promise<UserRecord> => {
  return new Promise((resolve) => {
    const newUser = { id: id || uuidv4(), ...user };
    db.push(newUser);
    resolve(newUser);
  });
};

export const update = (user: UserRecord): Promise<UserRecord> => {
  return new Promise((resolve) => {
    const index = db.findIndex((u) => u.id === user.id);
    db[index] = user;
    resolve(user);
  });
};

export const removeById = (id: string): Promise<string> => {
  return new Promise((resolve) => {
    db = db.filter((u) => u.id !== id);
    resolve(id);
  });
};
