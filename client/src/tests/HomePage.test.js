/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../HomePage';

test('renders HomePage correctly', () => {
    render(<HomePage />);
    const headingElement = screen.getByText(/Welcome to Group Delivery!/i);
    expect(headingElement).toBeInTheDocument();
});

test('renders location input and submit button', () => {
    render(<HomePage />);
    const locationInput = screen.getByPlaceholderText(/Enter ZIP Code/i);
    const submitButton = screen.getByText(/Submit/i);
    expect(locationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

test('renders and navigates to stores page', () => {
    render(<HomePage />);
    const storeButton = screen.getByText(/Visit Store/i);
    fireEvent.click(storeButton);
    const storeHeading = screen.getByText(/Store Products/i);
    expect(storeHeading).toBeInTheDocument();
});
