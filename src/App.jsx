import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "./redux/authSlice";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import SigninPage from "./Pages/SigninPage/SinginPage";
import { isTokenValid } from "./Redux/isTokenValid";
import AddPost from "./Pages/AppPosts/AddPost";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && isTokenValid(token)) {
      // Fetch user details and dispatch them to Redux
      const fetchUser = async () => {
        try {
          const res = await fetch("/api/auth", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) dispatch(signup(data));
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="bg-white dark:bg-black dark:text-white min-h-screen">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/addpost" element={user ? <AddPost /> : <Navigate to="/login" />} />  {/* ✅ Fixed */}
        <Route path="/signin" element={user ? <Navigate to="/profile" /> : <SigninPage />} />
        <Route path="/login" element={user ? <Navigate to="/profile" /> : <LoginPage />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
