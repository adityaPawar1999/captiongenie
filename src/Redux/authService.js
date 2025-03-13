import axios from "axios";

// ✅ Set token in localStorage (if not using cookies)
export const setAuthToken = (token) => {
  const expirationTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; // 10 days
  localStorage.setItem("authToken", token);
  localStorage.setItem("tokenExpiry", expirationTime.toString());
};

// ✅ Get token from cookies (Preferred if backend uses cookies)
export const getAuthToken = () => {
  console.log("toekn is")
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    // Fallback: Get from localStorage if backend doesn’t store in cookies
    const storedToken = localStorage.getItem("authToken");
    console.log("toekn is",storedToken)
    const expiry = localStorage.getItem("tokenExpiry");

    if (storedToken && expiry && new Date().getTime() < Number(expiry)) {
      return storedToken;
    }
    return null;
  }
  return token;
};

// ✅ Login API Call
export const loginUser = async (email, password) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    { email, password },
    { withCredentials: true } // ✅ Ensures cookies are sent
  );

  // ✅ If the backend doesn’t use cookies, manually store token
  if (response.data.token) {
    setAuthToken(response.data.token);
  }

  return response.data;
};

// ✅ Logout API Call
export const logoutUser = async () => {
  await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

  // ✅ Clear localStorage on logout
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiry");
};
export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiry");
};

