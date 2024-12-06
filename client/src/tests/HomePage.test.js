import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios'; // Import axios
import HomePage from '../components/HomePage/HomePage';

// Mock axios
jest.mock('axios');

test('renders HomePage correctly', async () => {
  await act(async () => {
      render(<HomePage />);
  });
  const headingElement = screen.getByText(/Welcome to Group Delivery!/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders location input and submit button', async () => {
    await act(async () => {
        render(<HomePage />);
    });
    const locationInput = screen.getByPlaceholderText(/Enter ZIP Code/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(locationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

test('renders and navigates to stores page', async () => {
  // Mock the axios response
  axios.get.mockResolvedValue({
    data: {
      supermarkets: [
        { supermarket_id: 1, name: 'Test Store 1', location: 'Test Location 1' },
      ],
    },
  });

  render(<HomePage />);
  const submitButton = await screen.findByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  // Find the "Visit Store" button and click it
  const storeButton = await screen.findByRole('button', { name: /visit store/i });
  fireEvent.click(storeButton);

  // Wait for the "Store Products" heading to appear
  const storeHeading = await screen.findByText(/Store Products/i);
  expect(storeHeading).toBeInTheDocument();
});
