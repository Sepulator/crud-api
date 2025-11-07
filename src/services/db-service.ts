import cluster from 'node:cluster';
import { createUser, deleteUser, findAll, getUser, updateUser, users } from '@/db/user-db';
import { OptionalUser, User, UserPayload } from '@/types/user';
import { handleDbMessage } from '@/utils/messaging';

export const dbService = {
  findAll: async (): Promise<User[]> => {
    if (cluster.isWorker) {
      return await handleDbMessage('findAll');
    } else {
      return await findAll(users);
    }
  },

  createUser: async (userPayload: UserPayload): Promise<User> => {
    if (cluster.isWorker) {
      return await handleDbMessage('createUser', userPayload);
    } else {
      return createUser(users, userPayload);
    }
  },

  getUser: async (id: string): Promise<User | null> => {
    if (cluster.isWorker) {
      return await handleDbMessage('getUser', id);
    } else {
      return getUser(users, id);
    }
  },

  updateUser: async (id: string, payload: OptionalUser): Promise<User | null> => {
    if (cluster.isWorker) {
      return handleDbMessage('updateUser', { id, ...payload });
    } else {
      return updateUser(users, id, payload);
    }
  },

  deleteUser: async (id: string): Promise<User | null> => {
    if (cluster.isWorker) {
      return handleDbMessage('deleteUser', id);
    } else {
      return deleteUser(users, id);
    }
  },
};
