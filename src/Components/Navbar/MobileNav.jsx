import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import AuthNavLinks from "./AuthNavLinks";

const MobileNav = ({ darkMode, setDarkMode, user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center text-[var(--text-color-3)]">
        <button onClick={() => setDarkMode(!darkMode)} className="text-black dark:text-white mr-4">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <ul className={`absolute top-13 left-0 w-full bg-gray-200 dark:bg-black transition-all duration-300 ease-in ${isOpen ? "block" : "hidden"}`}>
        <li><Link to="/" className="block p-3">HOME</Link></li>
        <li><Link to="/aboutUs" className="block p-3">ABOUT</Link></li>
        
        {/* Authentication Links */}
        <AuthNavLinks user={user} handleLogout={handleLogout} />
      </ul>
    </>
  );
};

export default MobileNav;
