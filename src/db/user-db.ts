import { User } from '@/types/user';

const users: User[] = [
  { age: 18, id: '1', username: 'John', hobbies: ['chess'] },
  { age: 21, id: '2', username: 'Flint', hobbies: ['surfing'] },
  { age: 27, id: '3', username: 'Pew', hobbies: ['singing'] },
];

export const db = {
  findAll: async () => users,
};
