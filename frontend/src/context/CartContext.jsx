import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import api from '../config/axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, loading: false };

    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.product._id === action.payload.productId && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          item => item.product._id !== action.payload.productId || item.size !== action.payload.size
        )
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: false
  });
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      loadCartFromStorage();
    }
  }, [token]);

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  };

  const fetchCart = async () => {
    try {
      const response = await api.get('/api/cart');
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

 const addToCart = async (product, quantity = 1, size) => {
  if (!size) {
    toast.error('Please select a size');
    return;
  }

  if (!token) {
    // Include size in local cart
    const newItem = { product, quantity, size };
    const updatedCart = [...state.items, newItem];
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Added to cart!');
    return;
  }

  try {
    const response = await api.post('/api/cart', {
      productId: product._id,
      quantity,
      size // ✅ Include size in backend request
    });
    dispatch({ type: 'SET_CART', payload: response.data });
    toast.success('Added to cart!');
  } catch {
    toast.error('Failed to add to cart');
  }
};

const updateCartItem = async (productId, quantity, size) => {
  if (!token) {
    const updatedCart = state.items.map(item =>
      item.product._id === productId && item.size === size
        ? { ...item, quantity }
        : item
    );
    dispatch({ type: 'UPDATE_ITEM', payload: { productId, quantity, size } });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return;
  }

  try {
    const response = await api.put(`/api/cart/${productId}`, { quantity, size });
    dispatch({ type: 'SET_CART', payload: response.data });
  } catch {
    toast.error('Failed to update cart');
  }
};


const removeFromCart = async (productId, size) => {
  if (!token) {
    const updatedCart = state.items.filter(
      item => item.product._id !== productId || item.size !== size
    );
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Removed from cart');
    return;
  }

  try {
    const response = await api.delete(`/api/cart/${productId}`, { data: { size } });
    dispatch({ type: 'SET_CART', payload: response.data });
    toast.success('Removed from cart');
  } catch {
    toast.error('Failed to remove from cart');
  }
};


const clearCart = async () => {
  if (token) {
    try {
      await api.delete('/api/cart'); // This clears cart on server
    } catch {
      toast.error('Failed to clear cart');
      return;
    }
  }

  dispatch({ type: 'CLEAR_CART' });
  localStorage.removeItem('cart');
  toast.success('Cart cleared!');
};


  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      loading: state.loading,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);