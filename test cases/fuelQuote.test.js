import { render, screen, fireEvent, wiatFor } from '@testing-library/react';
import Fuel_quote from './fuel_quote_form';
import { useForm } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn()
}));

describe('Fuel_quote form', () => {
    beforeEach(() => {
      useForm.mockImplementation(() => ({
        register: jest.fn(),
        handleSubmit: jest.fn(),
        formState: { errors: {} },
      }));

      render(<fuel_quote />);
    });
  
    test('form submits correctly', async () => {
      const fetchMock = jest.spyOn(global, 'fetch');        //checking fetch to see if it works properly
      fetchMock.mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }));
  
      fireEvent.submit(screen.getByText('Confirm'));
  
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
        fetchMock.mockClear();
      });
    });
  
    test('form shows validation messages', () => {
      // validation messages go here
        
    });
  });