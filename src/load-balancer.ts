import { config as dotenvConfig } from 'dotenv';
import cluster from 'cluster';
import { availableParallelism } from 'os';

import { server } from './server';

dotenvConfig();
const PORT = Number(process.env.PORT) || 5000;

const cpus = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is runnig`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork({ PORT: PORT + i });
  }

  cluster.on('exit', (worker) => {
    console.log(`wokerk ${worker.process.pid} died`);
  });
} else {
  server.listen(PORT);
  console.log(`Woker ${process.pid} started on ${PORT}`);
}
