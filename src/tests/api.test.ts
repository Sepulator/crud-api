import { server } from '@/server';
import request from 'supertest';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => '1'),
  };
});
// import { User } from '@/types/user';

// const userMock: User = { id: '06e317af-d12a-4952-9b55-e21d60f1ba1e', username: 'Pew', age: 47, hobbies: ['dancing'] };
// let createdUser: User;

afterAll(() => {
  server.close();
});

describe('CRUD Operations', () => {
  test('Get all records with a GET api/users request', async () => {
    const response = await request(server).get('/api/users').expect(200);

    expect(response.body).toEqual([]);
  });
});
