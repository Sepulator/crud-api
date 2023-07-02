import { v4 as uuidv4 } from 'uuid';

interface UserRecord {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const db: UserRecord[] = [
  { id: uuidv4(), username: 'Maximus', age: 20, hobbies: ['playing pianno'] },
];

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
