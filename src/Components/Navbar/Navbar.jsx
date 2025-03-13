import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-black text-black dark:text-white px-10 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center py-3">
        <Link to="/" className="text-xl font-bold  ">
          captionGEnie
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setDarkMode(!darkMode)} className="text-black dark:text-white mr-4">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`md:flex md:space-x-6 absolute md:static top-16 left-0 w-screen md:w-auto bg-gray-200 dark:bg-black transition-all duration-300 ease-in ${isOpen ? "block" : "hidden"}`}>
          <li><Link to="/" className="block p-3">Home</Link></li>
          <li><Link to="/aboutUs" className="block p-3">About</Link></li>

          {user ? (
            <>
              <li><Link to="/addpost" className="block p-3">ADD POST</Link></li>
              <li><Link to="/profile" className="block p-3 uppercase">{user.name}</Link></li>
              <li>
                <button onClick={handleLogout} className="flex items-center p-3">
                  Logout <LogOut className="ml-2" size={20} />
                </button>
              </li>
              
            </>
          ) : (
            <>
              <li><Link to="/login" className="block p-3">LOGIN</Link></li>
              <li><Link to="/signin" className="block p-3">SIGNIN</Link></li>
            </>
          )}
          <li className="flex justify-center md:justify-start">
            <button onClick={() => setDarkMode(!darkMode)} className="text-white p-3">
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            </li>
        </ul>

        {/* Dark Mode Toggle Button (For Desktop) */}
        
      </div>
    </nav>
  );
};

export default Navbar;
