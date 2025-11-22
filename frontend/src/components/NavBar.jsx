import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full bg-white text-black py-4 px-6 flex justify-between items-center shadow-lg rounded-2xl">
      {/* LEFT: Brand */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Vichaar
      </Link>

      {/* RIGHT: Profile Menu */}
      <div className="flex items-center gap-4">
        <Link
          to="/change-password"
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          Change Password
        </Link>

        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
