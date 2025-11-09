export default function NameInput({ error }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-gray-800 text-sm sm:text-base font-medium mb-1">
        Full Name
      </label>

      <input
        type="text"
        placeholder="John Doe"
        className="w-full px-4 py-3 sm:py-3.5 rounded-xl 
                   bg-white/10 border border-gray-300 
                   text-gray-900 placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-gray-700 
                   transition-all duration-200 backdrop-blur-sm"
      />

      {error?.name && (
        <span className="text-red-500 text-xs sm:text-sm mt-1">
          Name is mandatory
        </span>
      )}
    </div>
  );
}
