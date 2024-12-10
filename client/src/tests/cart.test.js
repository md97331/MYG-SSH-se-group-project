import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContext } from '../AuthContext'; // Import the context
import Cart from '../components/Cart/cart';

describe("Shopping Cart App", () => {
    const mockUser = { id: 1, group_id: 1, username: "Test User" };

    test("renders the shopping cart with tabs", () => {
        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Cart />
            </AuthContext.Provider>
        );
        expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
        expect(screen.getByText("Group Order")).toBeInTheDocument();
        expect(screen.getByText("Individual Order")).toBeInTheDocument();
    });

    test("switches between tabs", () => {
        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Cart />
            </AuthContext.Provider>
        );
        const groupTab = screen.getByText("Group Order");
        const individualTab = screen.getByText("Individual Order");

        // Check initial state (default: Individual Tab)
        expect(screen.getByText("Individual Cart")).toBeInTheDocument();
        fireEvent.click(groupTab);

        // Switch to Group Tab
        expect(screen.getByText("Shared Cart")).toBeInTheDocument();
        fireEvent.click(individualTab);

        // Switch back to Individual Tab
        expect(screen.getByText("Individual Cart")).toBeInTheDocument();
    });
});
