import React, { createContext,useState, useContext, useEffect } from 'react';
const cartContext = createContext();
export const useCart = () => useContext(cartContext);
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const items = window.localStorage.getItem("cartItems");
        return items ? JSON.parse(items) : [];
    });
    useEffect(() => {
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
    function addToCart(item) {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((prevItem) => prevItem.id === item.id);
            if (itemExists) {
                return prevItems.map((prevItem) => prevItem.id === item.id ? {...prevItem,quantity:prevItem.quantity+1} : prevItem);
            } else {
                return [...prevItems, {...item, quantity: 1}];
            }
        });
    }
    function decrementQuantity(item) {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((prevItem) => prevItem.id === item.id);
            if (itemExists) {
                return prevItems.map((prevItem) => prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity - 1 } : prevItem);
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    }
    function removeFromCart(item) { 
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
    return (
        <cartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrementQuantity }}>
            {children}
        </cartContext.Provider>
    )
}