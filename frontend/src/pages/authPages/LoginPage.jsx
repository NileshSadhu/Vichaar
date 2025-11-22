import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input";
import { useState } from "react";
import { isEmailValid, isPasswordValid } from "../../utils/validation.js";
import { useAuth } from "../../features/auth/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await handleLogin(email, password);
      if (success) navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.05)] border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm">Long time no see.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="xyz@example.com"
            onChange={(value) => {
              setEmail(value);
              setEmailError(isEmailValid(value));
            }}
            error={emailError}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="8 characters long"
            onChange={(value) => {
              setPassword(value);
              setPasswordError(isPasswordValid(value));
            }}
            error={passwordError}
          />

          <Link
            to="/forgot-password"
            className="block text-right text-sm text-gray-600 hover:text-black underline underline-offset-4"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-sm font-medium rounded-xl transition-all duration-200
              ${
                isLoading
                  ? "bg-gray-900 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900 active:scale-[0.98]"
              }
            `}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-black underline underline-offset-4 hover:text-gray-700 transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
