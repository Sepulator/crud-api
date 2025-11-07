import { createUser, deleteUser, findAll, getUser, updateUser, users } from '@/db/user-db';
import { OptionalUser, User, UserPayload } from '@/types/user';

interface DbMessage {
  type: string;
  payload?: any;
  id: string;
}

export const dbService = {
  findAll: async (): Promise<User[]> => {
    if (process.send) {
      return new Promise((resolve) => {
        const messageId = Math.random().toString(36).substring(7);
        process.send!({ type: 'findAll', id: messageId });
        process.on('message', (msg: DbMessage) => {
          if (msg.type === 'findAllResponse' && msg.id === messageId) {
            resolve(msg.payload);
          }
        });
      });
    } else {
      return findAll(users);
    }
  },

  createUser: async (userPayload: UserPayload): Promise<User> => {
    if (process.send) {
      return new Promise((resolve) => {
        const messageId = Math.random().toString(36).substring(7);
        process.send!({ type: 'createUser', payload: userPayload, id: messageId });
        process.on('message', (msg: DbMessage) => {
          if (msg.type === 'createUserResponse' && msg.id === messageId) {
            resolve(msg.payload);
          }
        });
      });
    } else {
      return createUser(users, userPayload);
    }
  },

  getUser: async (id: string): Promise<User | null> => {
    if (process.send) {
      return new Promise((resolve) => {
        const messageId = Math.random().toString(36).substring(7);
        process.send!({ type: 'getUser', payload: id, id: messageId });
        process.on('message', (msg: DbMessage) => {
          if (msg.type === 'getUserResponse' && msg.id === messageId) {
            resolve(msg.payload);
          }
        });
      });
    } else {
      return getUser(users, id);
    }
  },

  updateUser: async (id: string, payload: OptionalUser): Promise<User | null> => {
    if (process.send) {
      return new Promise((resolve) => {
        const messageId = Math.random().toString(36).substring(7);
        process.send!({ type: 'updateUser', payload: { id, ...payload }, id: messageId });
        process.on('message', (msg: DbMessage) => {
          if (msg.type === 'updateUserResponse' && msg.id === messageId) {
            resolve(msg.payload);
          }
        });
      });
    } else {
      return updateUser(users, id, payload);
    }
  },

  deleteUser: async (id: string): Promise<User | null> => {
    if (process.send) {
      return new Promise((resolve) => {
        const messageId = Math.random().toString(36).substring(7);
        process.send!({ type: 'deleteUser', payload: id, id: messageId });
        process.on('message', (msg: DbMessage) => {
          if (msg.type === 'deleteUserResponse' && msg.id === messageId) {
            resolve(msg.payload);
          }
        });
      });
    } else {
      return deleteUser(users, id);
    }
  },
};
