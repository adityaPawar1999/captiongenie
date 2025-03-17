import axios from "axios";

// Set token in localStorage with secure handling
export const setAuthToken = (token) => {
  if (!token) return;
  const expirationTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; // 10 days
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiry", expirationTime.toString());
};

// Get token with validation
export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  if (token && expiry && new Date().getTime() < Number(expiry)) {
    return token;
  }
  
  // Clear invalid tokens
  removeAuthToken();
  return null;
};

// Login API Call
export const loginUser = async (email, password) => {
  const response = await axios.post(
    "http://localhost:3001/api/auth/login",
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
    await axios.post("http://localhost:3001/api/auth/logout", {}, 
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeAuthToken();
  }
};

// Clean token removal
export const removeAuthToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("user");
};

