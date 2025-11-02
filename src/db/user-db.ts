import { User, UserPayload } from '@/types/user';
import { v4 as uuidV4 } from 'uuid';

const users: User[] = [
  { age: 18, id: '1', username: 'John', hobbies: ['chess'] },
  { age: 21, id: '2', username: 'Flint', hobbies: ['surfing'] },
  { age: 27, id: '3', username: 'Pew', hobbies: ['singing'] },
];

const createUser = async (user: UserPayload) => {
  const id = uuidV4();
  const newUser = { id, ...user };
  users.push(newUser);

  return newUser;
};

export const db = {
  findAll: async () => users,
  createUser,
};
