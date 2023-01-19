import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

const initialState = {
  products: [],
  categories: {},
  categoriesDetails: [],
  loading: false,
  error: null,
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, categories: state.categories }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
