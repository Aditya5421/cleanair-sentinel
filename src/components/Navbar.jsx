import { Link } from "react-router-dom";

export default function Navbar() {

  const linkStyle =
    "px-4 py-2 rounded-xl font-semibold text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md px-5 py-4">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-700 whitespace-nowrap text-center md:text-left"
        >
          🌍 CleanAir Sentinel
        </Link>


        {/* Menu */}
        <div className="flex flex-wrap justify-center gap-2">

          <Link
            to="/"
            className={linkStyle}
          >
            🏠 Home
          </Link>


          <Link
            to="/report"
            className={linkStyle}
          >
            📷 Report
          </Link>


          <Link
            to="/map"
            className={linkStyle}
          >
            🗺️ Map
          </Link>


          <Link
            to="/dashboard"
            className={linkStyle}
          >
            📊 Dashboard
          </Link>

        </div>

      </div>

    </nav>
  );
}