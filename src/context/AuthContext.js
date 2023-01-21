import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../context/ProductsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  loginToken: null,
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
      const jsonValue = res.data.token;
      try {
        if (jsonValue) {
          AsyncStorage.setItem("token", jsonValue);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        isAuthenticated: false,
        error: error.response.data.message,
      });
    }
  };

  const signUp = async () => {
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const res = await axios.post(`${API}/api/v1/register`, userData);
      setAuthState({
        ...authState,
        loading: false,
        user: res.data.user,
        isAuthenticated: true,
      });
      const jsonValue = res.data.token;
      try {
        if (jsonValue) {
          AsyncStorage.setItem("token", jsonValue);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {}
  };

  const getToken = async () => {
    try {
      const value = AsyncStorage.getItem("token");
      if (value !== null) {
        return value;
      }
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
    if (authState.loginToken !== null) {
      try {
        const res = await axios.get(`${API}/api/v1/me`, {
          headers: {
            Authorization: `Bearer ${authState.loginToken}`,
          },
        });
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
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setAuthState({
        ...authState,
        isAuthenticated: false,
        user: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    getToken().then((value) =>
      setAuthState({ ...authState, loginToken: value })
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loadUser,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
