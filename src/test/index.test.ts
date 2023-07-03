import request from 'supertest';
import { server } from '../server';
import { UserRecord } from 'models';

const PORT = Number(process.env.PORT) || 5000;
const app = server.listen(PORT);
const host = `http://localhost:${PORT}`;
const fakeid = '97321507-38c7-44d1-9fb8-9fc67b4210c8';
const user = { username: 'Bob', age: 27, hobbies: ['runnig'] };
let createdUser: UserRecord;

afterAll(() => {
  app.close();
});

describe('GET users via route /api/users', () => {
  it('responds with empty db on GET', async () => {
    const res = await request(host).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
  });

  it('responds with route not found on GET', async () => {
    const res = await request(host).get('/api/route/invalid');
    expect(res.status).toBe(404);
    expect(res.body.message).toStrictEqual('Invalid Route');
  });

  it('responds with user not found on GET', async () => {
    const res = await request(host).get('/api/users/');
    expect(res.status).toBe(400);
    expect(res.body.message).toStrictEqual('User ID not valid.');
  });

  it('responds with user ID not found on GET', async () => {
    const res = await request(host).get(`/api/users/${fakeid}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toStrictEqual('User not found.');
  });
});

describe('Valid POST, GET, PUT and DELETE user via route /api/users', () => {
  it('responds with newly created user body on POST', async () => {
    const res = await request(host).post('/api/users').send(user);
    expect(res.status).toBe(201);
    createdUser = res.body;
    expect(res.body).toStrictEqual({ id: createdUser.id, ...user });
  });

  it('responds with db containing newly created user on GET', async () => {
    const res = await request(host).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([{ id: createdUser.id, ...user }]);
  });

  it('responds with updated user on PUT', async () => {
    const age = 47;
    const res = await request(host)
      .put(`/api/users/${createdUser.id}`)
      .send({ age: age });
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ id: createdUser.id, ...user, age: age });
  });

  it('responds with no content after user deleted on DELETE', async () => {
    const res = await request(host).delete(`/api/users/${createdUser.id}`);
    expect(res.status).toBe(204);
    expect(res.body).toStrictEqual('');
  });
});

describe('Invalid POST, DELETE and PUT user via route /api/users', () => {
  it('responds with error parsing body on POST', async () => {
    const res = await request(host)
      .post('/api/users')
      .send({ age: 27, username: 'Bob' });
    expect(res.status).toBe(400);
    expect(res.body.message).toStrictEqual(
      'Error parsing body or does not contain required fields.',
    );
  });

  it('responds with user not found on PUT', async () => {
    const res = await request(host).put('/api/users/');
    expect(res.status).toBe(400);
    expect(res.body.message).toStrictEqual('User ID not valid.');
  });

  it('responds with user ID not found on PUT', async () => {
    const res = await request(host).put(`/api/users/${fakeid}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toStrictEqual('User not found.');
  });
  it('responds with user not found on DELETE', async () => {
    const res = await request(host).delete('/api/users/');
    expect(res.status).toBe(400);
    expect(res.body.message).toStrictEqual('User ID not valid.');
  });

  it('responds with user ID not found on DELETE', async () => {
    const res = await request(host).delete(`/api/users/${fakeid}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toStrictEqual('User not found.');
  });

  it('responds with error parsing body on PUT', async () => {
    const age = '47';
    const response = await request(host).post('/api/users').send(user);
    createdUser = response.body;
    const res = await request(host)
      .put(`/api/users/${createdUser.id}`)
      .send({ age: age });
    expect(res.status).toBe(400);
    expect(res.body.message).toStrictEqual(
      'Error parsing body or does not contain required fields.',
    );
  });
});
