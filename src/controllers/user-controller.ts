import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { User } from '../models';

export const getUsers = async (
  _req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  try {
    const users = await User.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (
  _req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  id: string | null,
) => {
  try {
    const user = id ? await User.findById(id) : null;
    if (id && validate(id) && !user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else if (!user) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID not valid' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};
