import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReturnUser from '../components/Profile/ReturnUser';
import { AuthContext } from '../AuthContext';

// Mock fetch API
global.fetch = jest.fn();

const mockLogin = jest.fn();
const mockGoToHome = jest.fn();

const renderReturnUser = () =>
  render(
    <AuthContext.Provider value={{ login: mockLogin }}>
      <ReturnUser goToHome={mockGoToHome} />
    </AuthContext.Provider>
  );

describe('ReturnUser Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockLogin.mockClear();
  });

  test('renders the Return User form correctly', () => {
    renderReturnUser();

    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: { id: 1, username: 'testuser', group_id: null },
      }),
    });

    renderReturnUser();

    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        id: 1,
        username: 'testuser',
        group_id: null,
      });
      expect(mockGoToHome).toHaveBeenCalled();
    });
  });

  test('handles failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid username or password' }),
    });

    renderReturnUser();

    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });
});
