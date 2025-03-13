import { jwtDecode } from "jwt-decode"; // ✅ Use named import

export const isTokenValid = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) return false; // No token found

  try {
    const decoded = jwtDecode(token); // Decode JWT
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      return false; // Token expired
    }

    return true; // Token is valid
  } catch (error) {
    return false; // Invalid token format
  }
};
