import cluster from 'node:cluster';
import { createServer, request } from 'node:http';
import os from 'node:os';
import { createAndStartServer } from './server';
import { createUser, deleteUser, findAll, getUser, updateUser, users } from './db/user-db';

const PORT = process.env['PORT'] ? Number(process.env['PORT']) : 4000;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);
  const workerPorts: number[] = [];
  let currentWorker = 0;

  for (let i = 0; i < numCPUs - 1; i++) {
    const workerPort = PORT + 1 + i;
    workerPorts.push(workerPort);
    const worker = cluster.fork({ PORT: workerPort });

    worker.on('message', async (msg: any) => {
      if (msg.type === 'findAll') {
        const result = await findAll(users);
        worker.send({ type: 'findAllResponse', payload: result, id: msg.id });
      } else if (msg.type === 'createUser') {
        const result = await createUser(users, msg.payload);
        worker.send({ type: 'createUserResponse', payload: result, id: msg.id });
      } else if (msg.type === 'getUser') {
        const result = await getUser(users, msg.payload);
        worker.send({ type: 'getUserResponse', payload: result, id: msg.id });
      } else if (msg.type === 'updateUser') {
        const { id, ...payload } = msg.payload;
        const result = await updateUser(users, id, payload);
        worker.send({ type: 'updateUserResponse', payload: result, id: msg.id });
      } else if (msg.type === 'deleteUser') {
        const result = await deleteUser(users, msg.payload);
        worker.send({ type: 'deleteUserResponse', payload: result, id: msg.id });
      }
    });
  }

  const loadBalancer = createServer((req, res) => {
    const worker = cluster.workers![Object.keys(cluster.workers!)[currentWorker]!];
    if (worker) {
      const workerPort = workerPorts[currentWorker];
      const options = {
        hostname: 'localhost',
        port: workerPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      };

      const proxyReq = request(options, (proxyRes: any) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxyReq, { end: true });

      proxyReq.on('error', (err: any) => {
        console.error(`Proxy request error: ${err}`);
        res.writeHead(500);
        res.end('Load balancer error');
      });
    } else {
      res.writeHead(503);
      res.end('No workers available');
    }

    currentWorker = (currentWorker + 1) % workerPorts.length;
  });

  loadBalancer.listen(PORT, () => {
    console.log(`Load balancer running on port ${PORT}`);
    console.log(`Workers listening on ports: ${workerPorts.join(', ')}`);
  });
} else {
  const workerPort = process.env['PORT'] ? Number(process.env['PORT']) : 0;
  createAndStartServer(workerPort);
  console.log(`Worker ${process.pid} started and listening on port ${workerPort}`);
}
