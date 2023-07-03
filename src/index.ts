import { config as dotenvConfig } from 'dotenv';

import { server } from './server';

dotenvConfig();
const PORT = Number(process.env.PORT) || 5000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
