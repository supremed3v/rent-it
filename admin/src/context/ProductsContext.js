import { createContext, useContext, useState } from "react";
import axios from "axios";

const initialProductsState = {
  products: [],
  loading: false,
  error: null,
  success: false,
  product: null,
  productLoading: false,
};

const ProductsContext = createContext(initialProductsState);

export const ProductsContextProvider = ({ children }) => {
  const [productsState, setProductsState] = useState(initialProductsState);

  const getProducts = async () => {
    setProductsState({ ...productsState, loading: true });
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/products");
      setProductsState({
        ...productsState,
        products: data.products,
        loading: false,
      });
    } catch (error) {
      setProductsState({
        ...productsState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const getProduct = async (id) => {
    setProductsState({ ...productsState, productLoading: true });
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/${id}`
      );
      setProductsState({
        ...productsState,
        product: data.product,
        productLoading: false,
      });
    } catch (error) {
      setProductsState({
        ...productsState,
        productLoading: false,
        error: error.response.data.message,
      });
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        getProducts,
        getProduct,
        ...productsState,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
