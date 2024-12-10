import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Checkout from "./Checkout";
import { AuthContext } from "../../AuthContext";

describe("Checkout Component", () => {
    const mockUser = { username: "testuser", id: 1, groupId: "ABC123" };
    const mockOnPlaceOrder = jest.fn();

    const renderComponent = () =>
        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Checkout onPlaceOrder={mockOnPlaceOrder} />
            </AuthContext.Provider>
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // TEST CASES
    it("renders checkout form with required fields", () => {
        renderComponent();
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Address")).toBeInTheDocument();
        expect(screen.getByLabelText("Card Number")).toBeInTheDocument();
        expect(screen.getByLabelText("Expiration Date")).toBeInTheDocument();
        expect(screen.getByLabelText("CVV")).toBeInTheDocument();
        expect(screen.getByLabelText("Name on Card")).toBeInTheDocument();
        expect(screen.getByText("Place Order")).toBeInTheDocument();
    });

    it("allows valid card number input", () => {
        renderComponent();
        const cardNumberInput = screen.getByLabelText("Card Number");
        fireEvent.change(cardNumberInput, { target: { value: "1234567812345678" } });
        expect(cardNumberInput.value).toBe("1234567812345678");
    });

    it("shows error for invalid card number input", () => {
        renderComponent();
        const cardNumberInput = screen.getByLabelText("Card Number");
        fireEvent.change(cardNumberInput, { target: { value: "1234abcd" } });
        expect(screen.getByText("Only numbers are allowed.")).toBeInTheDocument();
    });

    it("allows valid CVV input", () => {
        renderComponent();
        const cvvInput = screen.getByLabelText("CVV");
        fireEvent.change(cvvInput, { target: { value: "123" } });
        expect(cvvInput.value).toBe("123");
    });

    it("shows error for invalid CVV input", () => {
        renderComponent();
        const cvvInput = screen.getByLabelText("CVV");
        fireEvent.change(cvvInput, { target: { value: "abc" } });
        expect(screen.getByText("CVV consists of 3 digits")).toBeInTheDocument();
    });

    it("allows valid expiration date input", () => {
        renderComponent();
        const expirationDateInput = screen.getByLabelText("Expiration Date");
        const validDate = new Date();
        validDate.setMonth(validDate.getMonth() + 1); // Ensure it's a valid future date
        const month = validDate.getMonth() + 1;
        const year = validDate.getFullYear();
        const formattedDate = `${year}-${month.toString().padStart(2, "0")}`;
        fireEvent.change(expirationDateInput, { target: { value: formattedDate } });
        expect(expirationDateInput.value).toBe(formattedDate);
    });

    it("shows error for expired card date", () => {
        renderComponent();
        const expirationDateInput = screen.getByLabelText("Expiration Date");
        fireEvent.change(expirationDateInput, { target: { value: "2022-01" } });
        expect(screen.getByText("Your card is exprired.")).toBeInTheDocument();
    });

    it("submits the form when all inputs are valid", () => {
        renderComponent();

        fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john.doe@example.com" } });
        fireEvent.change(screen.getByLabelText("Address"), { target: { value: "123 Main St" } });
        fireEvent.change(screen.getByLabelText("Card Number"), { target: { value: "1234567812345678" } });
        fireEvent.change(screen.getByLabelText("CVV"), { target: { value: "123" } });

        const validDate = new Date();
        validDate.setMonth(validDate.getMonth() + 1); // Ensure it's a valid future date
        const month = validDate.getMonth() + 1;
        const year = validDate.getFullYear();
        const formattedDate = `${year}-${month.toString().padStart(2, "0")}`;
        fireEvent.change(screen.getByLabelText("Expiration Date"), { target: { value: formattedDate } });

        fireEvent.change(screen.getByLabelText("Name on Card"), { target: { value: "John Doe" } });

        const submitButton = screen.getByText("Place Order");
        fireEvent.click(submitButton);

        expect(mockOnPlaceOrder).toHaveBeenCalledTimes(1);
    });
});
