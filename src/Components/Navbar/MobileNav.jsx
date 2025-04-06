import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import AuthNavLinks from "./AuthNavLinks";

const MobileNav = ({ darkMode, setDarkMode, user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setDarkMode(!darkMode)} className="text-white mr-4">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Links with Glass Effect */}
      <ul className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] 
  bg-black/40 backdrop-blur-md border-t border-white/20 
  text-white transition-all duration-300 ease-in z-50 
  overflow-y-auto ${isOpen ? "block" : "hidden"}`}>


        <li>
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-4 px-6 hover:bg-white/20">
            HOME
          </Link>
        </li>
        <li>
          <Link to="/aboutUs" onClick={() => setIsOpen(false)} className="block py-4 px-6 hover:bg-white/20">
            ABOUT
          </Link>
        </li>

        {/* Authentication Links */}
        <AuthNavLinks toggleMenu={() => setIsOpen(false)} user={user} handleLogout={handleLogout} />
      </ul>
    </>
  );
};

export default MobileNav;
