import { createContext, useContext, useEffect, useState } from "react";
import {
  login,
  logout,
  fetchCurrentUser,
  registerUser,
} from "../../services/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const success = await login({ email, password });
      if (success) {
        const userData = await fetchCurrentUser();
        setUser(userData);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      const success = await registerUser({ username, email, password });
      if (success) {
        const userData = await fetchCurrentUser();
        setUser(userData);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Registration failed:", err);
      return false;
    }
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleLogout, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};
