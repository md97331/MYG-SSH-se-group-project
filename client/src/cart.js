import React, { useEffect, useState } from 'react';
import './Cart.css';
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'; // Plus and Minus icons

// Cart component
const Cart = ({ title, cartItems, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity, onCheckout, isIndividualTab }) => {
    return (
        <div>
            <h2>{title}</h2>
            <ul className="cart-list">
                {cartItems.length === 0 ? (
                    <li className="empty-cart">No items in the cart</li>
                ) : (
                    cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <div className="item-name">{item.name}</div>
                                {/* Quantity Controls */}
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-button"
                                        onClick={() => onDecreaseQuantity(index)}
                                        disabled={item.quantity <= 1} // Disable if quantity is 1
                                    >
                                        <AiOutlineMinus />
                                    </button>
                                    <div className="item-quantity">Quantity: {item.quantity}</div>
                                    <button
                                        className="quantity-button"
                                        onClick={() => onIncreaseQuantity(index)}
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                            </div>
                            {/* Check if price is valid before calling toFixed */}
                            <div className="item-price">
                                ${item.price ? item.price.toFixed(2) : '1.00'}
                            </div>
                            <button className="remove-button" onClick={() => onRemoveItem(index)}>
                                <FaTrashAlt /> {/* Trash can icon */}
                            </button>
                        </li>
                    ))
                )}
            </ul>
            {isIndividualTab && cartItems.length > 0 && (
                <button className="checkout-button" onClick={onCheckout}>
                    Checkout
                </button>
            )}
        </div>
    );
};

const App = () => {
    const [individualCart, setIndividualCart] = useState([
        {
            name: "Apple",
            image: "https://via.placeholder.com/50",
            quantity: 3,
            price: 1.5,
        },
        {
            name: "Banana",
            image: "https://via.placeholder.com/50",
            quantity: 2,
            price: 0.75,
        },
    ]);
    const [sharedCart, setSharedCart] = useState([
        {
            name: "Pepper",
            image: "https://via.placeholder.com/50",
            quantity: 3,
            price: 1,
        },
        {
            name: "Tomato",
            image: "https://via.placeholder.com/50",
            quantity: 2,
            price: 0.65,
        },
    ]);
    const [activeTab, setActiveTab] = useState('individual'); // Tracks which tab is active

    // Load individual cart from localStorage if it exists
    useEffect(() => {
        const savedCart = localStorage.getItem('individualCart');
        if (savedCart) {
            setIndividualCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('sharedCart');
        if (savedCart) {
            setSharedCart(JSON.parse(savedCart));
        }
    }, []);

    // Save individual cart to localStorage when it changes
    useEffect(() => {
        if (individualCart.length > 0) {
            localStorage.setItem('individualCart', JSON.stringify(individualCart));
        }
    }, [individualCart]);

    // Handle switching tabs
    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    //back button go to homepage
    const goToHomepage = () => {
        window.location.href = '/';
    };
    // Remove item from individual cart
    const removeItemFromIndividualCart = (index) => {
        const newCart = [...individualCart];
        newCart.splice(index, 1);
        setIndividualCart(newCart);
    };
    const handleCheckout = () => {
        alert('Proceeding to checkout!');
    };
    // Increase item quantity
    const increaseQuantity = (index) => {
        const updatedCart = [...individualCart];
        updatedCart[index].quantity += 1;
        setIndividualCart(updatedCart);
    };

    // Decrease item quantity
    const decreaseQuantity = (index) => {
        const updatedCart = [...individualCart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setIndividualCart(updatedCart);
        }
    };

    return (
        <div>
            {/* Top bar */}
            <div className="top-bar">
                <button className="back-arrow" onClick={() => goToHomepage()}>&larr;</button>
                <h1 className="shopping-cart-title">Shopping Cart</h1>
            </div>

            {/* Tab navigation bar */}
            <div className="tabs-bar">
                <div
                    className={`tab ${activeTab === 'shared' ? 'active' : ''}`}
                    onClick={() => setActiveTab('shared')}
                >
                    Group Order
                </div>
                <div
                    className={`tab ${activeTab === 'individual' ? 'active' : ''}`}
                    onClick={() => setActiveTab('individual')}
                >
                    Individual Order
                </div>
            </div>

            {/* Tab content */}
            <div className="tab-content">
                {activeTab === 'shared' && (
                    <Cart
                        title="Shared Cart"
                        cartItems={sharedCart}
                        onRemoveItem={() => alert('Cannot remove items from the shared cart in this demo')}
                        isIndividualTab={false}
                    />
                )}
                {activeTab === 'individual' && (
                    <Cart
                        title="Individual Cart"
                        cartItems={individualCart}
                        onRemoveItem={removeItemFromIndividualCart}
                        onIncreaseQuantity={increaseQuantity}
                        onDecreaseQuantity={decreaseQuantity}
                        onCheckout={handleCheckout}
                        isIndividualTab={activeTab === 'individual'}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
