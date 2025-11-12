import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import { isEmailValid, isPasswordValid } from "../utils/validation";
import { useAuth } from "../features/auth/AuthContext";

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
      if (success) navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Welcome back</h1>
        <p>Long time no see.</p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="xyz@example.com"
            onChange={(e) => {
              const value = e.target.value;
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
            placeholder="8 character long"
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setPasswordError(isPasswordValid(value));
            }}
            error={passwordError}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
        <Link to="/register">Don’t have an account? Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
