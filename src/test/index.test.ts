import request from 'supertest';
import { server } from '../server';

const PORT = Number(process.env.PORT) || 5000;
const app = server.listen(PORT);
const host = `http://localhost:${PORT}`;

describe('GET /api/users', () => {
  afterAll(() => {
    app.close();
  });

  it('responds with empty db', async () => {
    const res = await request(host)
      .get('/api/users')
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
  });
});
