import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const AuthNavLinks = ({ user, handleLogout }) => {
  return (
    <>
      {user ? (
        <>
          <li><Link to="/addpost" className="block p-3">ADD POST</Link></li>
          <li><Link to="/profile" className="block p-3 uppercase">{user.name}</Link></li>
          <li>
            <button onClick={handleLogout} className="flex items-center p-3">
              LOGOUT <LogOut className="ml-2" size={20} />
            </button>
          </li>
        </>
      ) : (
        <>
          <li><Link to="/login" className="block p-3">LOGIN</Link></li>
          <li><Link to="/signin" className="block p-3">SIGNIN</Link></li>
        </>
      )}
    </>
  );
};

export default AuthNavLinks;
