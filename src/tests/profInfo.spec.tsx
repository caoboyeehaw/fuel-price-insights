/*
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import bcrypt from 'bcrypt';
import { render, fireEvent, waitFor } from '@testing-library/react';
import registrationHandler from './profileinfo'; // Assuming this is the path to your profileinfo.js file

// Mock the getDatabase function and bcrypt.hash
jest.mock('./db', () => ({
  getDatabase: jest.fn(() => ({
    collection: jest.fn(() => ({
      findOne: jest.fn(),
      insertOne: jest.fn(),
    })),
  })),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn((password, salt) => `hashed-${password}-${salt}`),
}));

const server = setupServer(
  rest.post('/api/profileinfo', (req, res, ctx) => {
    return res(ctx.json({ message: 'Registration successful' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

test('handles valid registration', async () => {
  const req = {
    method: 'POST',
    body: {
      email: 'test@example.com',
      password: 'password123',
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await registrationHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: 'Registration successful',
  });
  expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
});

test('handles invalid email', async () => {
  const req = {
    method: 'POST',
    body: {
      email: '',
      password: 'password123',
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await registrationHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Please enter a valid email' });
  expect(bcrypt.hash).not.toHaveBeenCalled();
});

test('handles invalid password', async () => {
  const req = {
    method: 'POST',
    body: {
      email: 'test@example.com',
      password: '',
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await registrationHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Please enter a valid password' });
  expect(bcrypt.hash).not.toHaveBeenCalled();
});
*/