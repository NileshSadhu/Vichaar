export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <h1 className="font-serif text-6xl font-bold tracking-tight mb-6 text-gray-900">
          vichaar
        </h1>

        <nav className="flex justify-center items-center space-x-10 text-base font-medium text-gray-700">
          <a href="/" className="hover:text-black transition">
            About
          </a>
          <a href="/" className="hover:text-black transition">
            Blog
          </a>
          <a href="/" className="hover:text-black transition">
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  );
}
