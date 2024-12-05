import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage'; // Adjust path if needed
import axios from 'axios';

jest.mock('axios'); // Mock axios calls

test('renders HomePage correctly', () => {
    render(<HomePage />);
    const headingElement = screen.getByText(/Welcome to Group Delivery!/i);
    expect(headingElement).toBeInTheDocument();
});
