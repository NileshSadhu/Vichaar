import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function SocialBtn({ platform }) {
  const getBtn = () => {
    switch (platform) {
      case "google":
        return {
          icon: <FcGoogle size={20} />,
          label: "Google",
          textColor: "text-black",
        };
      case "facebook":
        return {
          icon: <FaFacebook size={20} />,
          label: "Facebook",
          color: "bg-blue-600",
        };
      case "apple":
        return {
          icon: <FaApple size={20} />,
          label: "Apple",
          color: "bg-neutral-900",
        };
      default:
        return {};
    }
  };

  const { icon, label, color, textColor } = getBtn();

  return (
    <button
      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl 
      ${color || "bg-white/20"} ${textColor || "text-white"}
      shadow-md hover:scale-[1.02] transition-all duration-200 backdrop-blur-lg`}
    >
      {icon}
      {label}
    </button>
  );
}
