import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../models';

export const getUsers = async (
  req: IncomingMessage,
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
