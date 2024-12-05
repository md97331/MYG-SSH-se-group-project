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

    return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Home Button with Home Icon */}
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <button
                    onClick={goToHome}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '50px',
                    }}
                >
                    🏠
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

            <h1>Store Products</h1>
            {/* Display Categories */}
            {Object.keys(categories).map((category) => (
                <div key={category} style={{ marginBottom: '30px' }}>
                    <h2>{category}</h2>
                    <div
                        style={{
                            display: 'flex',
                            overflowX: 'scroll',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        {categories[category].map((product) => (
                            <div
                                key={product.id}
                                style={{
                                    width: '150px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100px', height: '100px', borderRadius: '5px' }}
                                />
                                <h4 style={{ margin: '10px 0' }}>{product.name}</h4>
                                <p style={{ color: '#555' }}>${product.price.toFixed(2)}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#28a745',
                                        color: '#fff',
                                        fontSize: '14px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    + Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StoresPage;
