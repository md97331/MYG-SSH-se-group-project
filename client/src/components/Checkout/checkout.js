import React, { useState } from 'react';
import './checkout.css';
import Cart from '../Cart/cart';

const Checkout = ({ onBackToCart }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setcvv] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [iscvvInvalid, setIscvvInvalid] = useState(false);

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
        setCardNumber(value.replace(/[^0-9]/g, ''));
    };
    const [currentPage, setCurrentPage] = useState('checkout');

    if (currentPage === 'cart') {
        return <Cart />;
    }

    const handleBackToCart = () => {
        setCurrentPage('cart');
    };
    

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

    return (
        <div className="checkout-container">
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

                    <label2 htmlFor="cardNumber"> Card Number</label2>
                    <input type="text" id="cardnumber" value={cardNumber} onChange={handleCardNumberChange} required placeholder="Enter card number"
                    />
                    {isInvalid && <span className="error-message">Only numbers are allowed.</span>}

                    <label2 htmlFor="expirationDate">Expiration Date</label2>
                    <input type="month" id="expirationDate" required />

                    <label2 htmlFor="CVV">CVV</label2>
                    <input type="text" id="cvv" value={cvv} onChange={handlecvv} required placeholder="Enter the CVV" />
                    {iscvvInvalid && <span className="error-message">CVV consists of 3 digits</span>}

                    <label2 htmlFor="nameOnCard">Name on Card</label2>
                    <input type="text" id="nameOnCard" placeholder="Enter the name on card" required />

                    <div className="button-container">
                        <button className="back-to-cart-button" onClick={handleBackToCart}>Back to Cart</button>
                        <button type="submit" className="checkout-button">Place Order</button>
                    </div>
                </div>

            </form>


        </div>
    );
};

export default Checkout;
