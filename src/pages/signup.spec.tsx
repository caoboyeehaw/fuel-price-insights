import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import RegistrationPage from './signup';

// Mock the API endpoint
const server = setupServer(
  rest.post('/api/registration', (req, res, ctx) => {
    return res(ctx.json({ message: 'User registered successfully' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders the RegistrationPage component', () => {
  render(<RegistrationPage />);
  expect(screen.getByText('Registration')).toBeInTheDocument();
});

test('renders all form fields', () => {
  render(<RegistrationPage />);
  expect(screen.getByLabelText('Full Name:')).toBeInTheDocument();
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  // Add checks for all the other fields here...
});

test('handles form submission', async () => {
  // Suppress console output during testing
  jest.spyOn(console, 'log').mockImplementation(() => {});

  render(<RegistrationPage />);
  
  fireEvent.input(screen.getByLabelText('Full Name:'), {
    target: { value: 'John Doe' },
  });
  fireEvent.input(screen.getByLabelText('Email:'), {
    target: { value: 'john.doe@example.com' },
  });
  fireEvent.input(screen.getByLabelText('Password:'), {
    target: { value: 'password' },
  });
  // Do the same for all the other fields...

  fireEvent.click(screen.getByText('Register'));

  // Wait for the promise to resolve and check the output of the console.log call
  await waitFor(() => expect(console.log).toHaveBeenCalledWith({ message: 'User registered successfully' }));

  // Restore console.log
  jest.spyOn(console, 'log').mockRestore();
});
