import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const AuthNavLinks = ({ user, handleLogout, toggleMenu }) => {
  return (
    <>
      {user ? (
        <>
          <li className=""><Link to="/addpost" onClick={toggleMenu} className="block p-3">ADD POST</Link></li>
          <li className=""><Link to="/profile" onClick={toggleMenu} className="block p-3 uppercase">{user.name}</Link></li>
          <li className="">
            <button onClick={() => { handleLogout(); toggleMenu(); }} className="flex items-center p-3">
              LOGOUT <LogOut className="ml-2" size={20} />
            </button>
          </li>
        </>
      ) : (
        <>
          <li className=""><Link to="/login" onClick={toggleMenu} className="block p-3">LOGIN</Link></li>
          <li className=""><Link to="/signin" onClick={toggleMenu} className="block p-3">SIGNIN</Link></li>
        </>
      )}
    </>
  );
};

export default AuthNavLinks;
