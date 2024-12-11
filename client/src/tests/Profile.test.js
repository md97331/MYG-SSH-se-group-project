import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../components/Profile/Profile';
import { AuthContext } from '../AuthContext';

// Mock fetch API
global.fetch = jest.fn();

const mockUser = {
  id: 1,
  username: 'Giselle',
  group_id: null,
};

const mockLogin = jest.fn();
const mockLogout = jest.fn();

const renderProfile = (user = mockUser) =>
  render(
    <AuthContext.Provider
      value={{
        user,
        login: mockLogin,
        logout: mockLogout,
      }}
    >
      <Profile goToHome={jest.fn()} />
    </AuthContext.Provider>
  );

describe('Profile Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders profile correctly with user data', () => {
    renderProfile();

    expect(screen.getByText(/Welcome, Giselle!/i)).toBeInTheDocument();
    expect(screen.getByText(/User ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Group ID: No Group Assigned/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  test('handles logout functionality', () => {
    renderProfile();

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test('handles group creation', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ group_code: 'ABC123' }),
    });

    renderProfile();

    const createGroupButton = screen.getByRole('button', { name: /Create a Group Code/i });
    fireEvent.click(createGroupButton);

    expect(await screen.findByText(/Share this code with friends/i)).toBeInTheDocument();
    expect(await screen.findByText(/ABC123/i)).toBeInTheDocument();
  });

  test('handles failed group creation', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to create group' }),
    });

    renderProfile();

    const createGroupButton = screen.getByRole('button', { name: /Create a Group Code/i });
    fireEvent.click(createGroupButton);

    expect(await screen.findByText(/Failed to create group. Please try again./i)).toBeInTheDocument();
  });

  // test('handles joining a group', async () => {
  //   fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ message: 'Joined group successfully' }),
  //   });

  //   renderProfile();

  //   const joinInput = screen.getByPlaceholderText(/Enter group code/i);
  //   const joinButton = screen.getByRole('button', { name: /Join Group/i });

  //   fireEvent.change(joinInput, { target: { value: 'XYZ789' } });
  //   fireEvent.click(joinButton);

  //   expect(await screen.findByText(/You joined group XYZ789!/i)).toBeInTheDocument();
  //   expect(mockLogin).toHaveBeenCalledWith({ ...mockUser, group_id: 'XYZ789' });
  // });

  test('displays error for invalid group code format', () => {
    renderProfile();

    const joinInput = screen.getByPlaceholderText(/Enter group code/i);
    const joinButton = screen.getByRole('button', { name: /Join Group/i });

    fireEvent.change(joinInput, { target: { value: '123' } }); // Invalid format
    fireEvent.click(joinButton);

    expect(
      screen.getByText(/Invalid group code. Please enter a 6-character alphanumeric code./i)
    ).toBeInTheDocument();
  });
});