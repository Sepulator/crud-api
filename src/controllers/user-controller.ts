import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { User, UserRecord } from '../models';
import {
  validateUserRecord,
  getUserData,
  validateUpdateUserRecord,
} from '../helpers';

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
      res.end(JSON.stringify({ message: 'User not found.' }));
    } else if (!user) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID not valid.' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  try {
    const body = await getUserData(req);
    const userData = validateUserRecord(body);
    if (userData) {
      const newUser = await User.create(userData);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Error parsing body or does not contain required fields.',
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  id: string | null,
) => {
  try {
    const user = id ? await User.findById(id) : null;
    if (id && validate(id) && !user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found.' }));
    } else if (!user) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID not valid.' }));
    } else {
      const body = await getUserData(req);
      const userData = validateUpdateUserRecord(body);
      if (userData) {
        const updatedUser: UserRecord = {
          id: user.id,
          username: userData.username || user.username,
          age: userData.age || user.age,
          hobbies: userData.hobbies || user.hobbies,
        };
        const newUser = await User.update(updatedUser);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'Error parsing body or does not contain required fields.',
          }),
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
