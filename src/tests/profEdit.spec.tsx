/*
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor } from '@testing-library/react';
import editProfHandler from './editProf'; // Assuming this is the path to your editProf.js file

// Mock the getDatabase function
jest.mock('./db', () => ({
  getDatabase: jest.fn(() => ({
    collection: jest.fn(() => ({
      updateOne: jest.fn(),
    })),
  })),
}));

const server = setupServer(
  rest.post('/api/editProf', (req, res, ctx) => {
    return res(ctx.json({ message: 'Profile updated successfully' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

test('handles valid profile update', async () => {
  const validClientData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address1: '123 Main St',
    address2: 'Apt 456',
    city: 'City',
    state: 'State',
    zipcode: '12345',
    password: 'newpassword',
  };

  const req = {
    method: 'POST',
    body: validClientData,
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await editProfHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: 'Profile updated successfully',
  });
});

test('handles missing or invalid fields', async () => {
  const incompleteClientData = {
    // Missing some required fields...
  };

  const req = {
    method: 'POST',
    body: incompleteClientData,
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await editProfHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  // Adjust the expectations based on the specific missing fields you're testing
  // For example: expect(res.json).toHaveBeenCalledWith({ error: 'Missing or invalid name' });
});

test('handles profile update failure', async () => {
  const validClientData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address1: '123 Main St',
    address2: 'Apt 456',
    city: 'City',
    state: 'State',
    zipcode: '12345',
    password: 'newpassword',
  };

  const req = {
    method: 'POST',
    body: validClientData,
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Mock updateOne to return a modifiedCount of 0
  jest.spyOn(require('./db'), 'getDatabase').mockResolvedValue({
    collection: jest.fn(() => ({
      updateOne: jest.fn(() => ({
        modifiedCount: 0,
      })),
    })),
  });

  await editProfHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: 'Client not found' });
});
*/