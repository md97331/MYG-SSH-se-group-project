import React from 'react';
import './checkout.css';

const Checkout = ({ onBackToCart }) => {
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
                    <label htmlFor="payment">Payment Method</label>
                    <select id="payment" required>
                        <option value="">Select a payment method</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash-on-delivery">Cash on Delivery</option>
                    </select>
                </div>
                <button type="submit" className="checkout-button">
                    Place Order
                </button>
            </form>
            <button className="back-to-cart-button" onClick={onBackToCart}>
                Back to Cart
            </button>
        </div>
    );
};

export default Checkout;
