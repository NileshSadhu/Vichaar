const Input = ({ label, placeholder, type, name, value, onChange, error }) => {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-1 font-medium">{label}</label>
      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
