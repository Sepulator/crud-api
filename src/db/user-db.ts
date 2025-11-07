import { OptionalUser, User, UserPayload } from '@/types/user';
import { v4 as uuidV4 } from 'uuid';

export const users: User[] = [];

export const createUser = async (users: User[], user: UserPayload) => {
  const id = uuidV4();
  const newUser = { id, ...user };
  users.push(newUser);

  return newUser;
};

export const getUser = async (users: User[], id: string) => {
  const user = users.find((user) => user.id === id) ?? null;
  return user;
};

export const deleteUser = async (users: User[], id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  const deletedUser = users.splice(index, 1)[0];

  return deletedUser ?? null;
};

export const updateUser = async (users: User[], id: string, payload: OptionalUser): Promise<User | null> => {
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

export const findAll = async (users: User[]) => users;
