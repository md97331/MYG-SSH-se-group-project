import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import Cart from "../components/Cart/cart"; 

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

    test("checks out from the individual cart", () => {
        render(<Cart />);
        const checkoutButton = screen.getByText("Checkout");
        fireEvent.click(checkoutButton);

        expect(window.alert).toHaveBeenCalledWith("Proceeding to checkout!");
    });

    // test("renders shared cart and prevents item removal", () => {

    //     render(<Cart />);
        
    //     fireEvent.click(screen.getByText('Group Order'));
        
    //     const removeButton = screen.getAllByTestId("Remove-Button")
        
    //     fireEvent.click(removeButton);
    
    //     expect(window.alert).toHaveBeenCalledWith("Cannot remove items from the shared cart in this demo");
    // });
    
});

