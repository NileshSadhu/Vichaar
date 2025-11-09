import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import CustomButton from "./CustomButton";

export default function Register() {
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
          Create Account
        </h1>
        <p className="text-gray-600 text-left mb-8 mt-1 text-sm sm:text-base">
          Join the Vichaar community
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5">
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <CustomButton name="Register" />
        </form>

        {/* Already have an account link */}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-all"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}
