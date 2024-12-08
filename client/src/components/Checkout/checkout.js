import React, { useState } from 'react';
import Cart from "../Cart/cart";
import './checkout.css';

const Checkout = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setcvv] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [iscvvInvalid, setIscvvInvalid] = useState(false);
    const [currentPage, setCurrentPage] = useState('checkout');

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
                    <input type="month" id="expirationDate" required />

                    <label htmlFor="CVV">CVV</label>
                    <input type="text" id="cvv" value={cvv} onChange={handlecvv} required placeholder="Enter the CVV" />
                    {iscvvInvalid && <span className="error-message">CVV consists of 3 digits</span>}

                    <label htmlFor="nameOnCard">Name on Card</label>
                    <input type="text" id="nameOnCard" placeholder="Enter the name on card" required />
                </div>
                    <button className="placeOrder-button" type="submit">
                        Place Order
                    </button>
            </form>
        </div>
    );
};

export default Checkout;
