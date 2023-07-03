import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { User, UserRecord } from '../models';
import {
  validateUserRecord,
  getUserData,
  validateUpdateUserRecord,
} from '../helpers';

import { ErrorMessage } from '../error-messages';

export const getUsers = async (res: ServerResponse) => {
  try {
    const users = await User.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (res: ServerResponse, id: string | null) => {
  try {
    const user = id ? await User.findById(id) : null;
    if (id && validate(id) && !user) {
      ErrorMessage.UserNotFound(res);
    } else if (!user) {
      ErrorMessage.UserIdNotValid(res);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getUserData(req);
    const userData = validateUserRecord(body);
    if (userData) {
      const newUser = await User.create(userData);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } else {
      ErrorMessage.ParsingBody(res);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string | null,
) => {
  try {
    const user = id ? await User.findById(id) : null;
    if (id && validate(id) && !user) {
      ErrorMessage.UserNotFound(res);
    } else if (!user) {
      ErrorMessage.UserIdNotValid(res);
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
        ErrorMessage.ParsingBody(res);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async (res: ServerResponse, id: string | null) => {
  try {
    const user = id ? await User.findById(id) : null;
    if (id && validate(id) && !user) {
      ErrorMessage.UserNotFound(res);
    } else if (!user) {
      ErrorMessage.UserIdNotValid(res);
    } else {
      const removedID = await User.removeById(user.id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${removedID} removed.` }));
    }
  } catch (error) {
    console.log(error);
  }
};
