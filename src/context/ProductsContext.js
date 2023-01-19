import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

export const ProductProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getCategories = async () => {
    setState({ ...state, loading: true });
    try {
      const { data } = axios.get("http://192.168.18.3/api/v1/getCategories");
      setState({
        ...state,
        loading: false,
        categories: data,
      });
      console.log(data);
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.error.message,
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return <ProductContext.Provider>{children}</ProductContext.Provider>;
};

export const useProductContext = () => useContext(ProductContext);
