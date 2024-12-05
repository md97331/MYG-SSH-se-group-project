import { render, screen } from '@testing-library/react';
import Home from '../HomePage';

test('renders Home component with welcome message', () => {
  render(<Home />);

  // Check if the welcome message is displayed
  const welcomeMessage = screen.getByText(/Welcome to Group Delivery!/);
  expect(welcomeMessage).toBeInTheDocument();
});
