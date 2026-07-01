import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md px-8 py-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-700"
        >
          🌍 CleanAir Sentinel
        </Link>


        {/* Menu */}
        <div className="flex items-center gap-8 font-semibold">


          <Link
            to="/"
            className="text-gray-700 hover:text-green-700 transition"
          >
            Home
          </Link>


          <Link
            to="/report"
            className="text-gray-700 hover:text-green-700 transition"
          >
            📷 Report
          </Link>


          <Link
            to="/map"
            className="text-gray-700 hover:text-green-700 transition"
          >
            🗺️ Map
          </Link>


          <Link
            to="/dashboard"
            className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition shadow"
          >
            📊 Dashboard
          </Link>


        </div>

      </div>

    </nav>
  );
}