import { createServer } from 'node:http';
const PORT = 4000;

const server = createServer((request, response) => {
  const { method, url } = request;

  console.log(method, url);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
