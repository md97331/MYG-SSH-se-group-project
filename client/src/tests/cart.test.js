import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import Cart from "../components/Cart/cart"; 
import App from "../components/HomePage/HomePage";

describe("Shopping Cart App", () => {
    // Mock `window.alert`
    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders the shopping cart with tabs", () => {
        render(<Cart />);
        expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
        expect(screen.getByText("Group Order")).toBeInTheDocument();
        expect(screen.getByText("Individual Order")).toBeInTheDocument();
    });

    test("switches between tabs", () => {
        render(<Cart />);
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

