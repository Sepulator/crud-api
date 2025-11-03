import { User, UserPayload } from '@/types/user';
import { v4 as uuidV4 } from 'uuid';

const users: User[] = [
  { age: 18, id: '82086638-2e31-4a6a-9aad-2ab83a8a5e3d', username: 'John', hobbies: ['chess'] },
  { age: 21, id: 'a2e1ca7e-2ff1-4ac3-9de8-e6831e3c8ac4', username: 'Flint', hobbies: ['surfing'] },
  { age: 27, id: '4d233929-de43-4793-8a31-585ed3b58118', username: 'Pew', hobbies: ['singing'] },
];

const createUser = async (user: UserPayload) => {
  const id = uuidV4();
  const newUser = { id, ...user };
  users.push(newUser);

  return newUser;
};

const getUserById = async (id: string) => {
  const user = users.find((user) => user.id === id) ?? null;
  return user;
};

export const db = {
  findAll: async () => users,
  createUser,
  getUserById,
};
