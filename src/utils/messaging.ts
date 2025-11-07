import { DbMessage } from '@/types/db-message';
import { v4 as uuidV4 } from 'uuid';

export const handleDbMessage = <T, U>(type: string, payload?: T): Promise<U> => {
  return new Promise((resolve) => {
    const messageId = uuidV4();
    process.send!({ type, payload, id: messageId });
    process.on('message', (msg: DbMessage<U>) => {
      if (msg.type === `${type}Response` && msg.id === messageId && msg.payload) {
        return resolve(msg.payload);
      }
    });
  });
};
