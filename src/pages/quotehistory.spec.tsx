// quotehistory.spec.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './quotehistory'

test('renders the Home component', () => {
  render(<Home />)
  expect(screen.getByText('Fuel Quote History')).toBeInTheDocument()
})

test('handles start date change', () => {
  render(<Home />)
  const startDateInput = screen.getByLabelText('Start Date:') as HTMLInputElement;
  fireEvent.change(startDateInput, { target: { value: '2023-06-01' } })
  expect(startDateInput.value).toBe('2023-06-01')
})

test('handles end date change', () => {
  render(<Home />)
  const endDateInput = screen.getByLabelText('End Date:') as HTMLInputElement;
  fireEvent.change(endDateInput, { target: { value: '2023-06-30' } })
  expect(endDateInput.value).toBe('2023-06-30')
})

