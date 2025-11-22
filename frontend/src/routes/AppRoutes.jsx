import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

// Auth Pages
import LoginPage from "../pages/authPages/LoginPage";
import RegisterPage from "../pages/authPages/RegisterPage";
import ForgotPasswordPage from "../pages/authPages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/authPages/ResetPasswordPage";

// Post Pages
import SinglePostPage from "../pages/postPages/SinglePostPage";
import CreatePostPage from "../pages/postPages/CreatePostPage";
import EditPostPage from "../pages/postPages/EditPostPage";
import ChangePasswordPage from "../pages/authPages/ChangePasswordPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<SinglePostPage />} />

      {/* AUTH ROUTES (PUBLIC) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditPostPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
