import { ServerResponse } from 'http';

export const UserNotFound = (res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'User not found.' }));
};

export const UserIdNotValid = (res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'User ID not valid.' }));
};

export const ServerError = (res: ServerResponse) => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Internal Server Error' }));
};

export const InvalidRoute = (res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Invalid Route' }));
};

export const ParsingBody = (res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: 'Error parsing body or does not contain required fields.',
    }),
  );
};
