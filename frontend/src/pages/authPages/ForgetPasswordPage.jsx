import { useState } from "react";
import Input from "../../components/Input";
import { isEmailValid } from "../../utils/validation";
import { forgetPassword } from "../../services/authServices.js";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await forgetPassword(email);
      if (res) alert("Please check inbox.");
    } catch (error) {
      console.error("Attempt failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.05)] border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2 tracking-tight">
            Forget Your Password
          </h1>
          <p className="text-gray-500 text-sm">
            Please enter the email address you'd like your password reset
            information sent to
          </p>
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
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
