export default function CustomButton({ name, onClick, type = "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="mt-2 w-full py-3 rounded-xl 
                 bg-gray-900 text-white font-semibold 
                 hover:bg-gray-800 active:bg-gray-700
                 transition-all duration-200 focus:outline-none 
                 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
    >
      {name}
    </button>
  );
}
