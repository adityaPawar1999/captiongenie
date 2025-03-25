import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Set token in localStorage with secure handling
export const setAuthToken = (token) => {
  if (!token) return;
  try {
    const decoded = jwtDecode(token);
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", expirationTime.toString());
    // Set token in axios default headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.error("Invalid token format:", error);
    removeAuthToken();
  }
};

// Get token with validation
export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  if (!token || !expiry) {
    removeAuthToken();
    return null;
  }

  const currentTime = new Date().getTime();
  if (currentTime >= Number(expiry)) {
    removeAuthToken();
    return null;
  }

  // Set token in axios default headers
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return token;
};

// Remove token
export const removeAuthToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("user");
  // Remove token from axios default headers
  delete axios.defaults.headers.common['Authorization'];
};

// Login API Call
export const loginUser = async (email, password) => {
  const response = await axios.post(
    "http://localhost:5003/api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response.data;
};

// Logout API Call
export const logoutUser = async () => {
  try {
    await axios.post("http://localhost:5003/api/auth/logout", {}, 
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeAuthToken();
  }
};

