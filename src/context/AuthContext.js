import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { API, placeHeaders } from "./API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
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
  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState(false);

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
        const res = await axios.get(
          `${API}/api/v1/me`,
          placeHeaders(authState.loginToken)
        );
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

  const sellerHeader = {
    headers: {
      Authorization: `Bearer ${authState.loginToken}`,
    },
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

  const clearError = () => {
    setAuthState({
      ...authState,
      error: null,
    });
  };

  const faceVerification = async (data) => {
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const res = await axios.post(`${API}/api/v1/verify-image`, data);
      setAuthState({
        ...authState,
        loading: false,
        success: res.data.message,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const setupSellerBank = async (data) => {
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const res = await axios.post(`${API}/api/v1/create-bank-account`, data, {
        headers: {
          Authorization: `Bearer ${authState.loginToken}`,
        },
      });
      setAuthState({
        ...authState,
        loading: false,
        success: res.data.message,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  useEffect(() => {
    getToken().then((value) =>
      setAuthState({ ...authState, loginToken: value })
    );
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setPushToken(token));
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loadUser,
        logout,
        signUp,
        generateOtp,
        clearError,
        faceVerification,
        notification,
        setNotification,
        pushToken,
        setPushToken,
        sellerHeader,
        setupSellerBank,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
