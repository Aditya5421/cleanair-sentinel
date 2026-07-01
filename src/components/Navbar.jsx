import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-8 py-4 flex justify-between items-center relative z-50">

      <Link to="/" className="text-2xl font-bold">
        🌍 CleanAir Sentinel
      </Link>

      <div className="flex gap-6">
        <Link className="cursor-pointer hover:text-green-200" to="/">
          Home
        </Link>

        <Link className="cursor-pointer hover:text-green-200" to="/report">
          Report
        </Link>

        <Link className="cursor-pointer hover:text-green-200" to="/map">
          Map
        </Link>

        <Link className="cursor-pointer hover:text-green-200" to="/dashboard">
          Dashboard
        </Link>
      </div>

    </nav>
  );
}