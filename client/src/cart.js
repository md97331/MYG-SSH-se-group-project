import React, { useEffect, useState } from 'react';
import './cart.css'; 
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai'


// Cart component
const Cart = ({ title, cartItems, onRemoveItem }) => {
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
                    
                  <div className="item-quantity">Quantity: {item.quantity}</div>
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

  // Remove item from individual cart
  const removeItemFromIndividualCart = (index) => {
    const newCart = [...individualCart];
    newCart.splice(index, 1);
    setIndividualCart(newCart);
  };


  return (
    <div>
      {/* Top bar */}
        <div className="top-bar">
        <button className="back-arrow" onClick={() => alert('Back button clicked')}>&larr;</button>
        <h1 className="shopping-cart-title">Shopping Cart</h1>
</div>


      {/* Tab navigation bar */}
      <div className="tabs-bar">
        <div
          className={`tab ${activeTab === 'individual' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('individual')}
        >
          Individual Order
        </div>
        <div
          className={`tab ${activeTab === 'shared' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('shared')}
        >
          Group Order
        </div>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === 'individual' && (
          <Cart
            //title="Individual Cart"
            cartItems={individualCart}
            onRemoveItem={removeItemFromIndividualCart}
          />
        )}
        {activeTab === 'shared' && (
          <Cart
            //title="Shared Cart"
            cartItems={sharedCart}
            onRemoveItem={() => alert('Cannot remove items from the shared cart in this demo')}
          />
        )}
      </div>
    </div>
  );

};

export default App;
