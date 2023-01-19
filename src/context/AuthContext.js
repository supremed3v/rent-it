import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../context/ProductsContext";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  const login = async (userCredentials) => {
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const res = await axios.post(`${API}/api/v1/login`, userCredentials);
      setAuthState({
        ...authState,
        loading: false,
        user: res.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        isAuthenticated: false,
        error: error.response.data.message,
      });
    }
  };

  const loadUser = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/me`);
      setAuthState({
        ...authState,
        loading: false,
        user: res.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        isAuthenticated: false,
        error: error.response.data.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
