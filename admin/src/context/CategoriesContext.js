import {
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
} from "react";
import axios from "axios";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  success: null,
};

const CategoriesContext = createContext(initialState);

export const CategoriesProviders = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = () => {
    setState({ ...state, loading: true });
    axios
      .get("https://rent-it.up.railway.app/api/v1/categories")
      .then(({ data }) => {
        setState({ ...state, categories: data.categories, loading: false });
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.response.data.message,
          loading: false,
        });
      });
  };

  const addCategory = async (category) => {
    setState({ ...state, loading: true });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/categories",
        category
      );
      setState({ ...state, loading: false, success: data.success });
      fetchCategories();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <CategoriesContext.Provider value={{ ...state, addCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => useContext(CategoriesContext);
