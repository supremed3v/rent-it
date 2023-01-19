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
      console.log("token", jsonValue);
      try {
        if (jsonValue) await AsyncStorage.setItem("token", jsonValue);
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

  const loadUser = async () => {
    // const token = AsyncStorage.getItem("token");
    // try {
    //   const res = await fetch(`${API}/api/v1/me`, {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   setAuthState({
    //     ...authState,
    //     loading: false,
    //     user: res.data.user,
    //     isAuthenticated: true,
    //   });
    // } catch (error) {
    //   setAuthState({
    //     ...authState,
    //     loading: false,
    //     isAuthenticated: false,
    //     error: error.response.data.message,
    //   });
    // }
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
