import { useContext, createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (item) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return cart.length;
  };

  const addQuantity = (item) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(newCart);
  };

  const removeQuantity = (item) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        getCartTotal,
        getCartCount,
        addQuantity,
        removeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
