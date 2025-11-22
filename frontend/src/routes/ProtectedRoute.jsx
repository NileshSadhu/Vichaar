import { useAuth } from "../features/auth/useAuth.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
