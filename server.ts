import http from 'http';
import { v4 as uuidv4 } from 'uuid';

import { Record } from './src/types';

const PORT = process.env.PORT || 5000;

const db: Record[] = [
  { id: uuidv4(), username: 'Maximus', age: 20, hobbies: ['playing pianno'] },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(db));
});

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
