import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialAuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
  loading: false,
  success: false,
  isAdmin: false,
};
const AuthContext = createContext(initialAuthState);

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);
  const navigate = useNavigate();

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
      navigate("/dashboard");
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
        success: false,
      });
      console.log(error);
    }
  };

  const logout = () => {
    setAuthState({ ...authState, isLoggedIn: false, user: null, token: null });
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthState({ ...authState, loading: true });
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/me", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        setAuthState({
          ...authState,
          loading: false,
          isLoggedIn: true,
          user: data.user,
          token: localStorage.token,
          success: true,
          isAdmin: data.user.role === "admin" ? true : false,
        });
      } catch (error) {
        setAuthState({
          ...authState,
          loading: false,
          error: error.response.data.message,
          success: false,
        });
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider value={{ login, logout, loadUser, ...authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
