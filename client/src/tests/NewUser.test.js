import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewUser from '../components/Profile/NewUser';
import { AuthContext } from '../AuthContext';

// Mock fetch API
global.fetch = jest.fn();

const mockLogin = jest.fn();
const mockGoToHome = jest.fn();

const renderNewUser = () =>
  render(
    <AuthContext.Provider value={{ login: mockLogin }}>
      <NewUser goToHome={mockGoToHome} />
    </AuthContext.Provider>
  );

describe('NewUser Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockLogin.mockClear();
  });

  test('renders the New User form correctly', () => {
    renderNewUser();

    expect(screen.getByPlaceholderText(/Enter a username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter a password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('handles successful user registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'User created successfully' }),
    });

    renderNewUser();

    fireEvent.change(screen.getByPlaceholderText(/Enter a username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter a password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/User successfully created/i)).toBeInTheDocument();
    });
  });

  test('handles failed user registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to create user' }),
    });

    renderNewUser();

    fireEvent.change(screen.getByPlaceholderText(/Enter a username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter a password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to create user/i)).toBeInTheDocument();
    });
  });
});
