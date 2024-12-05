import React from 'react';

const StoresPage = ({ addToCart, goToHome, goToCart }) => {
    const categories = {
        Fruits: [
            { id: 1, name: 'Apple', price: 1.5, image: 'https://via.placeholder.com/100' },
            { id: 2, name: 'Banana', price: 1.0, image: 'https://via.placeholder.com/100' },
            { id: 3, name: 'Orange', price: 2.0, image: 'https://via.placeholder.com/100' },
            { id: 4, name: 'Grapes', price: 3.0, image: 'https://via.placeholder.com/100' },
            { id: 5, name: 'Strawberry', price: 4.0, image: 'https://via.placeholder.com/100' },
            { id: 6, name: 'Pineapple', price: 3.5, image: 'https://via.placeholder.com/100' },
            { id: 7, name: 'Mango', price: 2.5, image: 'https://via.placeholder.com/100' },
        ],
        Vegetables: [
            { id: 8, name: 'Carrot', price: 1.2, image: 'https://via.placeholder.com/100' },
            { id: 9, name: 'Broccoli', price: 2.5, image: 'https://via.placeholder.com/100' },
            { id: 10, name: 'Potato', price: 0.8, image: 'https://via.placeholder.com/100' },
            { id: 11, name: 'Spinach', price: 1.5, image: 'https://via.placeholder.com/100' },
            { id: 12, name: 'Tomato', price: 2.0, image: 'https://via.placeholder.com/100' },
            { id: 13, name: 'Onion', price: 1.0, image: 'https://via.placeholder.com/100' },
            { id: 14, name: 'Peppers', price: 2.5, image: 'https://via.placeholder.com/100' },
        ],
        Dairy: [
            { id: 15, name: 'Milk', price: 3.0, image: 'https://via.placeholder.com/100' },
            { id: 16, name: 'Cheese', price: 4.0, image: 'https://via.placeholder.com/100' },
            { id: 17, name: 'Butter', price: 2.5, image: 'https://via.placeholder.com/100' },
            { id: 18, name: 'Yogurt', price: 1.0, image: 'https://via.placeholder.com/100' },
            { id: 19, name: 'Cream', price: 2.0, image: 'https://via.placeholder.com/100' },
            { id: 20, name: 'Ice Cream', price: 5.0, image: 'https://via.placeholder.com/100' },
        ],
        Meats: [
            { id: 21, name: 'Chicken Breast', price: 5.0, image: 'https://via.placeholder.com/100' },
            { id: 22, name: 'Ground Beef', price: 6.0, image: 'https://via.placeholder.com/100' },
            { id: 23, name: 'Pork Chops', price: 4.5, image: 'https://via.placeholder.com/100' },
            { id: 24, name: 'Salmon', price: 8.0, image: 'https://via.placeholder.com/100' },
            { id: 25, name: 'Turkey Slices', price: 3.5, image: 'https://via.placeholder.com/100' },
            { id: 26, name: 'Lamb Chops', price: 10.0, image: 'https://via.placeholder.com/100' },
            { id: 27, name: 'Bacon', price: 4.0, image: 'https://via.placeholder.com/100' },
        ],
        Snacks: [
            { id: 28, name: 'Chips', price: 2.0, image: 'https://via.placeholder.com/100' },
            { id: 29, name: 'Chocolate Bar', price: 1.5, image: 'https://via.placeholder.com/100' },
            { id: 30, name: 'Popcorn', price: 3.0, image: 'https://via.placeholder.com/100' },
            { id: 31, name: 'Cookies', price: 4.0, image: 'https://via.placeholder.com/100' },
            { id: 32, name: 'Nuts', price: 5.0, image: 'https://via.placeholder.com/100' },
            { id: 33, name: 'Pretzels', price: 2.5, image: 'https://via.placeholder.com/100' },
            { id: 34, name: 'Granola Bars', price: 3.5, image: 'https://via.placeholder.com/100' },
        ],
    };

    // Render the appropriate page based on `currentPage`
    if (currentPage === 'stores') {
        return <StoresPage addToCart={addToCart} goToHome={() => setCurrentPage('home')} goToCart={() => setCurrentPage('cart')} />;
    }

    if (currentPage === 'cart') {
        return <Cart cart={cart} goToHome={() => setCurrentPage('home')} />;
    }

    // if (currentPage === 'profile') {
    //     return <Profile goToHome={() => setCurrentPage('home')} />;
    // }

    // Render the home page
    return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Profile Icon */}
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <button
                    onClick={goToHome}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '30px',
                    }}
                >
                    👤
                </button>
            </div>

            {/* Shopping Cart Icon */}
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <button
                    onClick={goToCart}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '50px',
                    }}
                >
                    🛒
                </button>
            </div>

            <h1>Welcome to Group Delivery!</h1>
            <p>Find your supermarket below</p>

            {/* Location Input */}
            <div style={{ marginTop: '30px' }}>
                <h2>Enter Your Location</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <span role="img" aria-label="location" style={{ fontSize: '24px' }}>📍</span>
                    <input
                        type="text"
                        placeholder="Enter ZIP Code"
                        value={zipCode}
                        onChange={handleZipChange}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                    <button
                        onClick={handleZipSubmit}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>
                </div>
                {/* Display error message */}
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </div>

            {/* Navigate to Stores Page */}
            <button
                onClick={() => setCurrentPage('stores')}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}
            >
                Visit Store
            </button>

            {/* Display Stores */}
            <div style={{ marginTop: '40px' }}>
                <h2>Available Stores</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            style={{
                                width: '200px',
                                padding: '20px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                textAlign: 'center',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img
                                src={store.image}
                                alt={store.name}
                                style={{ width: '100px', height: '100px', borderRadius: '10px' }}
                            />
                            <h3 style={{ margin: '10px 0' }}>{store.name}</h3>
                            <p style={{ color: '#555' }}>{store.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;