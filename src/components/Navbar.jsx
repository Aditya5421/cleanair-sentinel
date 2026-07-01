import { NavLink } from "react-router-dom";

export default function Navbar() {

  const linkStyle = ({ isActive }) =>
    `
    px-4 py-2 rounded-xl font-semibold
    transition-all duration-300
    ${
      isActive
        ? "bg-green-600 text-white"
        : "text-green-700 hover:bg-green-600 hover:text-white"
    }
    `;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md px-5 py-4">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-green-700 whitespace-nowrap text-center md:text-left"
        >
          🌍 CleanAir Sentinel
        </NavLink>


        {/* Menu */}
        <div className="flex flex-wrap justify-center gap-2">

          <NavLink
            to="/"
            className={linkStyle}
          >
            🏠 Home
          </NavLink>


          <NavLink
            to="/report"
            className={linkStyle}
          >
            📷 Report
          </NavLink>


          <NavLink
            to="/map"
            className={linkStyle}
          >
            🗺️ Map
          </NavLink>


          <NavLink
            to="/dashboard"
            className={linkStyle}
          >
            📊 Dashboard
          </NavLink>

        </div>

      </div>

    </nav>
  );
}