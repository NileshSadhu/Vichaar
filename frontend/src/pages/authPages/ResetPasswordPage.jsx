import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { resetPassword as resetPasswordService } from "../../services/authServices";
import { isPasswordValid } from "../../utils/validation";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setPasswordError("");
    setConfirmError("");

    // Required fields
    let hasError = false;
    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmError("Confirm Password is required.");
      hasError = true;
    }
    if (hasError) return;

    // Password complexity
    const pwdValidationError = isPasswordValid(password);
    if (pwdValidationError) {
      setPasswordError(pwdValidationError);
      hasError = true;
    }

    // Password match
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;

    // Submit to backend
    setIsLoading(true);
    try {
      const res = await resetPasswordService(token, password);
      if (res) navigate("/login");
    } catch (err) {
      console.error(err);
      setPasswordError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.05)] border border-gray-200">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="New Password"
            type="password"
            value={password}
            placeholder="8 characters long"
            onChange={(value) => {
              setPassword(value);
              setPasswordError(isPasswordValid(value));
            }}
            error={passwordError}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            placeholder="password must match"
            onChange={(value) => setConfirmPassword(value)}
            error={confirmError}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-sm font-medium rounded-xl transition-all duration-200
              ${
                isLoading
                  ? "bg-gray-900 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900 active:scale-[0.98]"
              }`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
