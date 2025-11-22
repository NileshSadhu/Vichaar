import { useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { isEmailValid, isPasswordValid } from "../../utils/validation.js";
import { useAuth } from "../../features/auth/useAuth.js";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await handleRegister(username, email, password);
      if (success) {
        alert(
          "Verification link sent to your email. Please verify before logging in."
        );
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2 tracking-tight">
            Create an Account
          </h1>
          <p className="text-gray-500 text-sm">Gyan baatne se baadhta hai!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={(value) => setUsername(value)}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setEmailError(isEmailValid(value));
            }}
            error={emailError}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setPasswordError(isPasswordValid(value));
            }}
            error={passwordError}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-sm font-medium rounded-xl transition-all duration-150
              ${
                isLoading
                  ? "bg-gray-900 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900 active:scale-[0.99]"
              }
            `}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black underline underline-offset-4 hover:text-gray-700 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
