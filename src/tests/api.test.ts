import { server } from '@/server';
import request from 'supertest';
import { User } from '@/types/user';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => '06e317af-d12a-4952-9b55-e21d60f1ba1e'),
    validate: jest.fn(() => true),
  };
});

const app = request(server);
const userMock: User = { id: '06e317af-d12a-4952-9b55-e21d60f1ba1e', username: 'Pew', age: 47, hobbies: ['dancing'] };

afterAll(() => {
  server.close();
});

describe('CRUD Operations', () => {
  test('Should get all records with a GET api/users request', async () => {
    const response = await app.get('/api/users').expect(200);

    expect(response.body).toEqual([]);
  });

  test('Should create a new user with a POST api/users request', async () => {
    const response = await app.post('/api/users').send(userMock).expect(201);

    expect(response.body).toEqual(userMock);
  });

  test('Should return all users with newly created with a GET api/users request', async () => {
    const response = await app.get(`/api/users`).expect(200);

    expect(response.body).toEqual([userMock]);
  });

  test('Should return newly created user with GET a api/users/{id} request', async () => {
    const response = await app.get(`/api/users/06e317af-d12a-4952-9b55-e21d60f1ba1e`).expect(200);

    expect(response.body).toEqual(userMock);
  });

  test('Should update the created record with a PUT api/users/{id} request', async () => {
    const updateData = {
      username: 'Updated User Pew',
      age: 57,
    };
    const response = await request(server).put(`/api/users/${userMock.id}`).send(updateData).expect(200);

    expect(response.body).toEqual({ ...userMock, ...updateData });
  });

  test('Should remove created user with a DELETE api/users/{id} request', async () => {
    const response = await request(server).delete(`/api/users/${userMock.id}`).expect(204);

    expect(response.body).toEqual('');
  });

  test('Should display NOT FOUND with a GET api/users/{id} request for deleted user', async () => {
    const response = await request(server).get(`/api/users/${userMock.id}`).expect(404);

    expect(response.body).toEqual(['User not found.']);
  });
});
