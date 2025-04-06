import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./../../Redux/authSlice";
import { Sun, Moon } from "lucide-react";
import AuthNavLinks from "./AuthNavLinks";
import MobileNav from "./MobileNav";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-[var(--always-black)] text-white px-10 shadow-md fixed top-0 left-0 right-0 z-50 p-5">
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/" className="text-xl font-bold">captionGEnie</Link>

        {/* Mobile Navigation Component */}
        <MobileNav darkMode={darkMode} setDarkMode={setDarkMode} user={user} handleLogout={handleLogout} />

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex md:space-x-6">
          <li><Link to="/" className="block p-3">HOME</Link></li>
          <li><Link to="/aboutUs" className="block p-3">About</Link></li>

          {/* Authentication Links */}
          <AuthNavLinks user={user} handleLogout={handleLogout} />

          {/* Dark Mode Toggle (Always White Button) */}
          <li className="hidden md:block sm:hidden pt-3">
            <button onClick={() => setDarkMode(!darkMode)} className="text-white">
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
