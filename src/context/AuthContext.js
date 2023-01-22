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
  success: null,
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

  const signUp = async (userData) => {
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
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        isAuthenticated: false,
        error: error.response.data.message,
      });
    }
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

  const generateOtp = async (email) => {
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const res = await axios.post(
        `${API}/api/v1/generate-otp`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${authState.loginToken}`,
          },
        }
      );
      setAuthState({
        ...authState,
        loading: false,
        success: res.data.success,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const verifyOtp = async (otp) => {
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const res = await axios.put(`${API}/api/v1/verify-seller`, { otp });
      setAuthState({
        ...authState,
        loading: false,
        success: res.data.success,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const clearError = () => {
    setAuthState({
      ...authState,
      error: null,
    });
  };

  const faceVerification = async (image1Base64, image2Base64) => {
    setAuthState({
      ...authState,
      loading: true,
    });
    const encodedParams = new URLSearchParams();
    encodedParams.append("image1Base64", image1Base64);
    encodedParams.append("image2Base64", image2Base64);

    const options = {
      method: "POST",
      url: "https://face-verification2.p.rapidapi.com/faceverification",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "ad86fd9dd1mshc1a61e42bd929a0p170f9fjsnde0c2f2b7a19",
        "X-RapidAPI-Host": "face-verification2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    axios
      .request(options)
      .then(function (response) {
        setAuthState({
          ...authState,
          loading: false,
          success: response.data.resultMessage,
        });
      })
      .catch(function (error) {
        setAuthState({
          ...authState,
          loading: false,
          error: error.response.data.resultMessage,
        });
      });
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
        verifyOtp,
        generateOtp,
        clearError,
        faceVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
