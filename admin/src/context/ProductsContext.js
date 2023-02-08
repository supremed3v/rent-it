import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

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
  const { token } = useAuthContext();

  const getProducts = useCallback(async () => {
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
  }, [setProductsState]);

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

  const approveProduct = async (id, isApproved) => {
    setProductsState({ ...productsState, loading: true });
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/product/approve/${id}`,
        { isApproved },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductsState({
        ...productsState,
        loading: false,
        success: data.success,
      });
    } catch (error) {
      setProductsState({
        ...productsState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

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
