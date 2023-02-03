import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

const initialState = {
  products: [],
  categories: {},
  categoriesDetails: [],
  loading: false,
  error: null,
  rentedProducts: [],
};

export const API = "http://192.168.18.3:5000";

export const ProductProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getCategories = async () => {
    try {
      setState({ ...state, loading: true });
      const { data } = await axios.get(`${API}/api/v1/categories`);
      setState({
        ...state,
        loading: false,
        categories: data.categoryNames,
        categoriesDetails: data.categories,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.data.message,
      });
      console.log(error);
    }
  };

  const sellerProducts = async (token) => {
    setState({ ...state, loading: true });
    try {
      const { data } = await axios.get(
        `${API}/api/v1/products/seller-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setState({
          ...state,
          loading: false,
          rentedProducts: data.products,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{ ...state, categories: state.categories, sellerProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
