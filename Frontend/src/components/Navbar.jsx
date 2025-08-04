// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, [localStorage.getItem("userId")]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Function to apply active styles
  const navStyle = ({ isActive }) =>
    isActive
      ? "font-bold text-zinc-400 underline transition duration-200"
      : "hover:text-zinc-400 transition duration-200";

  return (
    <nav className="bg-[#14213d] text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-wide ">
        💀MyInterns
      </h1>

      {/* Navigation */}
      <div className="space-x-6 text-lg">
        {isLoggedIn ? (
          <>
            <NavLink to="/dashboard" className={navStyle}>
              Dashboard
            </NavLink>
            <button
              onClick={handleLogout}
              className="hover:text-zinc-400 transition duration-200 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signup" className={navStyle}>
              Signup
            </NavLink>
            <NavLink to="/login" className={navStyle}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
