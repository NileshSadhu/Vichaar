import SocialBtn from "../Common/SocialBtn";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import CustomButton from "./CustomButton";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-200/40 to-gray-400/20 blur-lg"></div>

      {/* Glass card */}
      <div
        className="relative z-10 w-[90%] max-w-md p-8 sm:p-10 
        rounded-2xl bg-white/10 border border-gray-300/50 
        shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
        backdrop-blur-lg bg-clip-padding"
      >
        <h1 className="text-3xl font-bold text-gray-900 text-left">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-left mb-8 mt-1 text-sm sm:text-base">
          Continue your journey with Vichaar
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5">
          <EmailInput />
          <PasswordInput />
          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-all"
            >
              Forgot your password?
            </a>
          </div>
          <CustomButton name="Contiune" />
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="grow h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">or login with</span>
          <div className="grow h-px bg-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <SocialBtn platform="google" />
          <SocialBtn platform="facebook" />
          <SocialBtn platform="apple" />
        </div>
        <div className="mt-6 text-center text-sm">
          <a
            href="#"
            className="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-all"
          >
            Don't have an account?
          </a>
        </div>
      </div>
    </div>
  );
}
