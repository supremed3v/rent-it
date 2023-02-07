import { useContext, createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialAuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
  loading: false,
  success: false,
  isAdmin: false,
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);

  const login = async (loginData) => {
    setAuthState({ ...authState, loading: true });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/admin-login",
        loginData
      );
      setAuthState({
        ...authState,
        loading: false,
        isLoggedIn: true,
        user: data.user,
        token: data.token,
        success: true,
        isAdmin: data.user.role === "admin" ? true : false,
      });

      const { token } = data;
      localStorage.setItem("token", token);
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
        success: false,
      });
    }
  };

  const logout = () => {
    setAuthState({ ...authState, isLoggedIn: false, user: null, token: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
