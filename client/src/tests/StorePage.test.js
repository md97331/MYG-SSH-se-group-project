import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import StoresPage from '../components/StoresPage/StoresPage';

// Mock axios
jest.mock('axios');

const mockAddToCart = jest.fn();

test('renders Store Products page with Home and Cart buttons', () => {
  render(
    <StoresPage
      storeId={1}
      addToCart={mockAddToCart}
      goToHome={jest.fn()}
      goToCart={jest.fn()}
    />
  );
  expect(screen.getByRole('button', { name: '🛒' })).toBeInTheDocument(); // Cart button
  expect(screen.getByRole('button', { name: '🏠' })).toBeInTheDocument(); // Home button
});

test('fetches and displays products from API', async () => {
  axios.get.mockResolvedValue({
    data: {
      products: [
        {
          product_id: 1,
          product_name: 'Test Product 1',
          price: 5.99,
          description: 'A test product',
          category: 'Test Category',
        },
      ],
    },
  });

  render(
    <StoresPage
      storeId={1}
      addToCart={mockAddToCart}
      goToHome={jest.fn()}
      goToCart={jest.fn()}
    />
  );

  // Wait for the products to load
  await waitFor(() => expect(screen.getByText('Test Category')).toBeInTheDocument());
  expect(screen.getByText('Test Product 1')).toBeInTheDocument();
  expect(screen.getByText('$5.99')).toBeInTheDocument();
});

test('displays predefined products when API call fails', async () => {
  axios.get.mockRejectedValue(new Error('API Error'));

  render(
    <StoresPage
      storeId={1}
      addToCart={mockAddToCart}
      goToHome={jest.fn()}
      goToCart={jest.fn()}
    />
  );

  // Wait for error handling
  await waitFor(() => expect(screen.getByText(/Failed to load products/i)).toBeInTheDocument());
});

test('handles add to cart functionality', async () => {
  axios.get.mockResolvedValue({
    data: {
      products: [
        {
          product_id: 1,
          product_name: 'Test Product 1',
          price: 5.99,
          description: 'A test product',
          category: 'Test Category',
        },
      ],
    },
  });

  render(
    <StoresPage
      storeId={1}
      addToCart={mockAddToCart}
      goToHome={jest.fn()}
      goToCart={jest.fn()}
    />
  );

  // Wait for the products to load
  await waitFor(() => screen.getByText('Test Product 1'));

  const addToCartButton = screen.getAllByText('+ Add to Cart')[0];
  fireEvent.click(addToCartButton);

  expect(mockAddToCart).toHaveBeenCalledWith({
    id: 1,
    name: 'Test Product 1',
    price: 5.99,
    description: 'A test product',
    image: 'https://via.placeholder.com/100',
  });
});
