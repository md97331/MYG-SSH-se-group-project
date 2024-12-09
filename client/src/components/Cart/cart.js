import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../AuthContext';
import Checkout from '../Checkout/checkout';
import './cart.css';

const Cart = ({ title, cartItems, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity, onCheckout, isIndividualTab }) => {
    return (
        <div className="cart-container">
            <h2>{title}</h2>
            {isIndividualTab && cartItems.length > 0 && (
                <button className="checkout-button" onClick={() => onCheckout()}>
                    Checkout
                </button>
            )}
            <ul className="cart-list">
                {cartItems.length === 0 ? (
                    <li className="empty-cart">No items in the cart</li>
                ) : (
                    cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <div className="item-name">{item.name}</div>
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-button"
                                        onClick={() => onDecreaseQuantity(item)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <AiOutlineMinus />
                                    </button>
                                    <div className="item-quantity">Quantity: {item.quantity}</div>
                                    <button
                                        className="quantity-button"
                                        onClick={() => onIncreaseQuantity(item)}
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                                {!isIndividualTab && (
                                    <div className="added-by">
                                        Added by: {item.addedBy}
                                    </div>
                                )}
                            </div>
                            <div className="item-price">
                                ${item.price ? item.price.toFixed(2) : '1.00'}
                            </div>
                            <button className="remove-button" onClick={() => onRemoveItem(index)}>
                                <FaTrashAlt />
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};



const App = () => {
    const [currentPage, setCurrentPage] = useState('cart');
    const [individualCart, setIndividualCart] = useState([]);
    const [sharedCart, setSharedCart] = useState([]);
    const [activeTab, setActiveTab] = useState('individual');
    const { user } = useContext(AuthContext);
    const userId = user?.id || null;
    const groupId = user?.group_id || null;

    // Fetch cart items from the backend
    useEffect(() => {
        fetch(`http://localhost:5001/api/cart/${groupId}`)
            .then((response) => response.json())
            .then(async (data) => {
                if (data.cart) {

                    const uncheckedItems = data.cart.filter(item => item.is_checked_out === 0);

                    // Fetch usernames for each added_by_user
                    const cartWithUsernames = await Promise.all(
                        uncheckedItems.map(async (item) => {
                            const userResponse = await fetch(`http://localhost:5001/api/users/${item.added_by_user}`);
                            const userData = await userResponse.json();
                            return {
                                id: item.id,
                                name: item.product_name,
                                image: item.image_url || "https://via.placeholder.com/50",
                                quantity: item.quantity,
                                price: item.price || 1.0,
                                addedBy: userData.user.username || "Unknown User",
                                addById: userData.user.id
                            };
                        })
                    );

                    // Set the shared cart
                    setSharedCart(cartWithUsernames);
                    const userCart = cartWithUsernames.filter(item => item.addById === userId);
                    setIndividualCart(userCart);
                }
            })
            .catch((error) => console.error("Error fetching cart:", error));
    }, [groupId]);

    const handleCheckout = () => {
        setCurrentPage('checkout');
    };

    const increaseQuantity = (product) => {
        const payload = {
            group_id: groupId,
            product_name: product.name,
            added_by_user: userId,
            action: "add",
            quantity: 1
        };

        // Make the API call
        fetch('http://localhost:5001/api/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update cart');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.message); // Log success message
                setIndividualCart((prevCart) => {
                    const existingItem = prevCart.find((item) => item.name === product.name);
                    if (existingItem) {
                        return prevCart.map((item) =>
                            item.name === product.name
                                ? { ...item, quantity: (item.quantity || 1) + 1 }
                                : item
                        );
                    } else {
                        return [...prevCart, { ...product, quantity: 1 }];
                    }
                });
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
            });
    }

    const decreaseQuantity = (product) => {
        const payload = {
            group_id: groupId,
            product_name: product.name,
            added_by_user: userId,
            action: "subtract",
            quantity: 1
        };

        // Make the API call
        fetch('http://localhost:5001/api/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update cart');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.message); // Log success message
                setIndividualCart((prevCart) => {
                    const existingItem = prevCart.find((item) => item.name === product.name);
                    if (existingItem) {
                        return prevCart.map((item) =>
                            item.name === product.name
                                ? { ...item, quantity: (item.quantity || 1) - 1 }
                                : item
                        );
                    } else {
                        return [...prevCart, { ...product, quantity: 1 }];
                    }
                });
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
            });
    };

    const removeItemFromIndividualCart = (index) => {
        const itemId = individualCart[index].id;
        fetch('http://localhost:5001/api/cart/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId }),
        })
            .then((response) => response.json())
            .then(() => {
                const newCart = [...individualCart];
                newCart.splice(index, 1);
                setIndividualCart(newCart);
                setSharedCart(newCart)
            })
            .catch((error) => console.error("Error removing item:", error));
    };

    const onPlaceOrder = async (event, cardNumber, cvv, expirationDate, isDateInvalid) => {
        event.preventDefault(); // Prevent default form submission
    
        // Validate fields
        if (!cardNumber || cardNumber.length !== 16) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }
        if (!cvv || cvv.length !== 3) {
            alert("Please enter a valid 3-digit CVV.");
            return;
        }
        if (!expirationDate || isDateInvalid) {
            alert("Please enter a valid expiration date.");
            return;
        }
    
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const nameOnCard = document.getElementById('nameOnCard').value.trim();
    
        if (!name || !email || !address || !nameOnCard) {
            alert("All fields are required. Please fill in the missing information.");
            return;
        }
    
        const payload = {
            group_id: groupId,
            user_id: userId
        };
    
        try {
            // Checkout API call
            const checkoutResponse = await fetch('http://localhost:5001/api/cart/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!checkoutResponse.ok) {
                throw new Error(`Failed to checkout cart id: ${userId} groupId: ${groupId}`);
            }
    
            const checkoutData = await checkoutResponse.json();
            console.log(checkoutData.message); // Log success message
            alert('Order placed successfully!');
    
            // Fetch updated cart
            const cartResponse = await fetch(`http://localhost:5001/api/cart/${groupId}`);
            const cartData = await cartResponse.json();
    
            if (cartData.cart) {
                const uncheckedItems = cartData.cart.filter(
                    item => item.product_name && item.quantity > 0 && item.is_checked_out === 0
                );
    
                // Fetch usernames and enrich data
                const validItems = await Promise.all(
                    uncheckedItems.map(async (item) => {
                        const userResponse = await fetch(`http://localhost:5001/api/users/${item.added_by_user}`);
                        const userData = await userResponse.json();
                        return {
                            id: item.id,
                            name: item.product_name,
                            image: item.image_url || "https://via.placeholder.com/50",
                            quantity: item.quantity,
                            price: item.price || 1.0,
                            addedBy: userData.user.username || "Unknown User",
                            addedByUserId: item.added_by_user,
                        };
                    })
                );
    
                // Update cart state
                setSharedCart(validItems);
                const userCart = validItems.filter(item => item.addedByUserId === userId);
                setIndividualCart(userCart);
            }
        } catch (error) {
            console.error('Error checking out cart:', error);
            alert('Failed to place order. Please try again.');
        }
    
        setCurrentPage({ name: 'cart' });
    };
    

    if (currentPage === 'checkout') {
        return <Checkout onPlaceOrder={onPlaceOrder} />;
    }

    return (
        <div>
            <div className="top-bar">
                <button className="back-arrow" onClick={() => (window.location.href = '/')}>
                    🏠
                </button>
                <h1 className="shopping-cart-title">Shopping Cart</h1>
            </div>

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

            <div className="tab-content">
                {activeTab === 'shared' && (
                    <Cart
                        title="Shared Cart"
                        cartItems={sharedCart}
                        onRemoveItem={() => alert("Cannot remove items from the shared cart")}
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
                        isIndividualTab={true}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
