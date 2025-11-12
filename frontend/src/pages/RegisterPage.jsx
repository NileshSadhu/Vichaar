import { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { isEmailValid, isPasswordValid } from "../utils/validation";
import { useAuth } from "../features/auth/AuthContext";

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
      if (success)
        alert(
          "Verification link sent to your email. Please verify before logging in."
        );
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* card */}
      <div>
        <h1>Register Page</h1>
        <p>Gyan baatne se baad ta hai!</p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={(value) => {
              setUsername(value);
            }}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              const validateEmail = isEmailValid(value);
              setEmailError(validateEmail);
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
              const validatePassword = isPasswordValid(value);
              setPasswordError(validatePassword);
            }}
            error={passwordError}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading" : "Submit"}
          </button>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
