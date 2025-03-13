import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../Redux/authService";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Define email state
  const [password, setPassword] = useState(""); // Define password state
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const result = await dispatch(login({ email, password }));
    
      if (login.fulfilled.match(result)) {
        const token = result.payload?.token; // ✅ Ensure token comes from API
        if (token) {
          setAuthToken(token);
    
          // 🔹 Store token in both localStorage & sessionStorage
          localStorage.setItem("token", token); // Persistent login
          sessionStorage.setItem("token", token); // Session-based login
    
          alert("Login successful");
          navigate("/profile");
          window.location.reload();
        } else {
          setError("Token missing from response.");
        }
      } else {
        setError(result.payload?.message || "Invalid email or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  }
    

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-[var(--text-color-1)] ">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"  // Fixed type
              value={email}  // Fixed variable
              onChange={(e) => setEmail(e.target.value)} // Fixed state setter
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
