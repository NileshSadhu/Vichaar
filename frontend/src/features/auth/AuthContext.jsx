import { createContext, useContext, useEffect, useState } from "react";
import {
  login,
  logout,
  getCurrentUser,
  registerUser,
} from "../../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
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
        const userData = await getCurrentUser();
        setUser(userData);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      const success = await registerUser({ username, email, password });
      if (success) {
        const userData = await getCurrentUser();
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong during registration.");
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

export const useAuth = () => useContext(AuthContext);
