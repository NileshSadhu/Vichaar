import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { changePassword as changePasswordService } from "../../services/authServices";
import { isPasswordValid } from "../../utils/validation";

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmError("");

    let hasError = false;

    if (!oldPassword) {
      setOldPasswordError("Old password is required.");
      hasError = true;
    }

    if (!newPassword) {
      setNewPasswordError("New password is required.");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmError("Confirm password is required.");
      hasError = true;
    }

    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      hasError = true;
    }

    const pwdError = isPasswordValid(newPassword);
    if (pwdError) {
      setNewPasswordError(pwdError);
      hasError = true;
    }

    if (hasError) return;

    try {
      setIsLoading(true);

      const res = await changePasswordService(oldPassword, newPassword);

      alert(res.message || "Password changed successfully");
      navigate("/");
    } catch (err) {
      setOldPasswordError(
        err?.response?.data?.message || "Error changing password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow border border-gray-200">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Change Password
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={setOldPassword}
            error={oldPasswordError}
          />

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            error={newPasswordError}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={confirmError}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-sm font-medium rounded-xl bg-black text-white"
          >
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
