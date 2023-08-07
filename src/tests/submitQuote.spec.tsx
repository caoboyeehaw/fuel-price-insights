/*
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor } from '@testing-library/react';
import submitFuelQuoteHandler from './submitFuelQuote'; // Assuming this is the path to your submitFuelQuote.js file

// Mock getSession and getDatabase functions
jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

jest.mock('./db', () => ({
  getDatabase: jest.fn(() => ({
    collection: jest.fn(() => ({
      insertOne: jest.fn(),
    })),
  })),
}));

const server = setupServer(
  rest.post('/api/submitFuelQuote', (req, res, ctx) => {
    return res(ctx.json({ message: 'Quote submitted successfully', quoteId: 'mockQuoteId' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

test('handles authenticated quote submission', async () => {
  const req = {
    method: 'POST',
    body: {
      // Quote data object...
    },
  };

  const session = {
    user: {
      email: 'test@example.com',
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Mock the getSession function to return the session
  jest.spyOn(require('next-auth/react'), 'getSession').mockResolvedValue(session);

  await submitFuelQuoteHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: 'Quote submitted successfully',
    quoteId: 'mockQuoteId',
  });
});

test('handles unauthenticated quote submission', async () => {
  const req = {
    method: 'POST',
    body: {
      // Quote data object...
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Mock the getSession function to return null (unauthenticated)
  jest.spyOn(require('next-auth/react'), 'getSession').mockResolvedValue(null);

  await submitFuelQuoteHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ message: 'Not authenticated' });
});

*/