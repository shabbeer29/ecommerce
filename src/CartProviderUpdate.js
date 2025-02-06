import React, { createContext,useState, useContext, useEffect , useReducer} from 'react';
// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
const LOAD_CART = "LOAD_CART";

// Cart Reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case LOAD_CART:
            return action.payload;
        case ADD_TO_CART:
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                // If item exists, increase quantity
                return state.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If item doesn't exist, add to cart with quantity 1
                return [...state, { ...action.payload, quantity: 1 }];
            }
        case REMOVE_FROM_CART:
            return state.filter(item => item.id !== action.payload.id);
        case INCREMENT_QUANTITY:
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        case DECREMENT_QUANTITY:
            return state.map(item =>
                item.id === action.payload.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        default:
            return state;
    }
};

// Cart Context
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Cart Provider
export const CartProvider = ({ children }) => {
    const [cartItems, dispatch] = useReducer(cartReducer, []);

    useEffect(() => {
        // Load cart items from localStorage on initial render
        const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        dispatch({ type: "LOAD_CART", payload: savedCartItems });
    }, []);

    useEffect(() => {
        // Save cart items to localStorage whenever the cartItems state changes
        if (cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (item) => {
        dispatch({ type: ADD_TO_CART, payload: item });
    };

    const removeFromCart = (item) => {
        dispatch({ type: REMOVE_FROM_CART, payload: item });
    };

    const incrementQuantity = (item) => {
        dispatch({ type: INCREMENT_QUANTITY, payload: item });
    };

    const decrementQuantity = (item) => {
        dispatch({ type: DECREMENT_QUANTITY, payload: item });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};