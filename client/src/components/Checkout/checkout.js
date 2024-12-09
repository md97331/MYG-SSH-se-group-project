import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import Cart from "../Cart/cart";
import './checkout.css';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const groupId = user.groupId;
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setcvv] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [iscvvInvalid, setIscvvInvalid] = useState(false);
    const [currentPage, setCurrentPage] = useState('checkout');
    const [expirationDate, setExpirationDate] = useState('');
    const [isDateInvalid, setIsDateInvalid] = useState(false);

    const handleExpirationDateChange = (event) => {
        const selectedDate = event.target.value;
        setExpirationDate(selectedDate);

        // Validate the expiration date
        const currentDate = new Date();
        const selectedMonthYear = new Date(selectedDate + '-01'); // Add '-01' to get a full date

        // Check if the selected date is at least one month in the future
        currentDate.setMonth(currentDate.getMonth()); // Move current date to the next month
        if (selectedMonthYear < currentDate) {
            setIsDateInvalid(true);
        } else {
            setIsDateInvalid(false);
        }
    };

    // Handle card number input, ensuring only numbers are entered
    const handleCardNumberChange = (event) => {
        const value = event.target.value;

        // Check if the value contains non-numeric characters
        if (/[^0-9]/.test(value)) {
            setIsInvalid(true); // Set to true if non-numeric characters are entered
        } else {
            setIsInvalid(false); // Set to false if only numeric characters are entered
        }

        // Update the card number value with only digits
        setCardNumber(value.replace(/[^0-9]/g, '').slice(0, 16));
    };

    if (currentPage.name === 'cart') {
        return <Cart goToHome={() => setCurrentPage({ name: 'cart', storeId: null })} />;
    }


    const handlecvv = (event) => {
        const value = event.target.value;

        // Only allow digits and limit the length to 3
        if (/[^0-9]/.test(value)) {
            setIscvvInvalid(true);
        } else {
            setIscvvInvalid(false);
        }

        // Update the cvv with only the first 3 digits
        setcvv(value.replace(/[^0-9]/g, '').slice(0, 3));

    };

    const onPlaceOrder = () => {
        const payload = {
            group_id: groupId,
        };

        // Make the API call
        fetch('http://localhost:5001/api/cart/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to checkout cart');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.message); // Log success message
                alert('Order placed successfully!');
            })
            .catch((error) => {
                console.error('Error checking out cart:', error);
                alert('Failed to place order. Please try again.');
            });
    };


    return (
        <div className="checkout-container">
            <button className="back-to-cart-button" type="button" onClick={() => setCurrentPage({ name: 'cart' })}>
                Back to Cart
            </button>
            <h1>Checkout</h1>
            <form className="checkout-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your full name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter your address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="payment">Payment Information</label>

                    <label htmlFor="cardNumber"> Card Number</label>
                    <input type="text" id="cardnumber" value={cardNumber} onChange={handleCardNumberChange} required placeholder="Enter card number"
                    />
                    {isInvalid && <span className="error-message">Only numbers are allowed.</span>}

                    <label htmlFor="expirationDate">Expiration Date</label>
                    <input type="month" id="expirationDate" value={expirationDate} onChange={handleExpirationDateChange} required />
                    {isDateInvalid && (
                        <span className="error-message">
                            Your card is exprired.
                        </span>
                    )}

                    <label htmlFor="CVV">CVV</label>
                    <input type="text" id="cvv" value={cvv} onChange={handlecvv} required placeholder="Enter the CVV" />
                    {iscvvInvalid && <span className="error-message">CVV consists of 3 digits</span>}

                    <label htmlFor="nameOnCard">Name on Card</label>
                    <input type="text" id="nameOnCard" placeholder="Enter the name on card" required />
                </div>
                <button className="placeOrder-button" type="submit" onClick={onPlaceOrder}>
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
