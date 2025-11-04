import { OptionalUser, User, UserPayload } from '@/types/user';
import { v4 as uuidV4 } from 'uuid';

const users: User[] = [];

const createUser = async (user: UserPayload) => {
  const id = uuidV4();
  const newUser = { id, ...user };
  users.push(newUser);

  return newUser;
};

const getUser = async (id: string) => {
  const user = users.find((user) => user.id === id) ?? null;
  return user;
};

const deleteUser = async (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  const deletedUser = users.splice(index, 1)[0];

  return deletedUser ?? null;
};

const updateUser = async (id: string, payload: OptionalUser): Promise<User | null> => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  const updatedUser: User = {
    ...(users[index] as User),
    ...payload,
  };

  users[index] = updatedUser;

  return updatedUser;
};

export const db = {
  findAll: async () => users,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
