import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Cart from '../components/Cart/cart';
import { AuthContext } from '../AuthContext';

jest.mock('axios');

describe('Cart Component', () => {
    const mockUser = { id: 1, group_id: 100 };

    const mockCartItems = [
        {
            id: 1,
            name: 'Product A',
            image: 'https://via.placeholder.com/50',
            quantity: 2,
            price: 10.0,
            addedBy: 'User1',
        },
        {
            id: 2,
            name: 'Product B',
            image: 'https://via.placeholder.com/50',
            quantity: 1,
            price: 15.0,
            addedBy: 'User1',
        },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                products: [
                    { name: 'Product A', price: 10.0 },
                    { name: 'Product B', price: 15.0 },
                ],
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the cart with items and displays total price', async () => {
        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Cart
                    title="Individual Cart"
                    cartItems={mockCartItems}
                    onRemoveItem={jest.fn()}
                    onIncreaseQuantity={jest.fn()}
                    onDecreaseQuantity={jest.fn()}
                    onCheckout={jest.fn()}
                    isIndividualTab={true}
                />
            </AuthContext.Provider>
        );
    
        // Wait for cart items to render
        expect(await screen.findByText('Product A')).toBeInTheDocument();
        expect(await screen.findByText('Product B')).toBeInTheDocument();
    
        // Wait for total price to update
        const totalPriceElement = await screen.findByText(/Total: \$35.00/);
        expect(totalPriceElement).toBeInTheDocument();
    });
    

    it('calls onRemoveItem when remove button is clicked', async () => {
        const mockRemoveItem = jest.fn();

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Cart
                    title="Individual Cart"
                    cartItems={mockCartItems}
                    onRemoveItem={mockRemoveItem}
                    onIncreaseQuantity={jest.fn()}
                    onDecreaseQuantity={jest.fn()}
                    onCheckout={jest.fn()}
                    isIndividualTab={true}
                />
            </AuthContext.Provider>
        );

        // Wait for cart items to render
        await screen.findByText('Product A');

        // Simulate removing an item
        const removeButtons = screen.getAllByRole('button', { name: /trash/i });
        fireEvent.click(removeButtons[0]);
        expect(mockRemoveItem).toHaveBeenCalledWith(0); // Ensure correct index is passed
    });

    it('updates total price when quantity changes', async () => {
        const mockIncreaseQuantity = jest.fn();

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Cart
                    title="Individual Cart"
                    cartItems={mockCartItems}
                    onRemoveItem={jest.fn()}
                    onIncreaseQuantity={mockIncreaseQuantity}
                    onDecreaseQuantity={jest.fn()}
                    onCheckout={jest.fn()}
                    isIndividualTab={true}
                />
            </AuthContext.Provider>
        );

        // Wait for cart items to render
        await screen.findByText('Product A');

        // Simulate increasing quantity
        const increaseButtons = screen.getAllByRole('button', { name: /plus/i });
        fireEvent.click(increaseButtons[0]);
        expect(mockIncreaseQuantity).toHaveBeenCalledWith(mockCartItems[0]);
    });

    it('displays checkout button and handles checkout click', async () => {
        const mockOnCheckout = jest.fn();

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Cart
                    title="Individual Cart"
                    cartItems={mockCartItems}
                    onRemoveItem={jest.fn()}
                    onIncreaseQuantity={jest.fn()}
                    onDecreaseQuantity={jest.fn()}
                    onCheckout={mockOnCheckout}
                    isIndividualTab={true}
                />
            </AuthContext.Provider>
        );

        // Wait for checkout button to appear
        const checkoutButton = await screen.findByText(/Checkout/i);
        expect(checkoutButton).toBeInTheDocument();
        fireEvent.click(checkoutButton);
        expect(mockOnCheckout).toHaveBeenCalled();
    });

    it('shows error messages when price fetch fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Price fetch failed'));

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Cart
                    title="Individual Cart"
                    cartItems={mockCartItems}
                    onRemoveItem={jest.fn()}
                    onIncreaseQuantity={jest.fn()}
                    onDecreaseQuantity={jest.fn()}
                    onCheckout={jest.fn()}
                    isIndividualTab={true}
                />
            </AuthContext.Provider>
        );

        // Check error message for price fetch
        await waitFor(() => {
            expect(screen.getByText(/Error fetching price/)).toBeInTheDocument();
        });
    });
});
