import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "./redux/authSlice.js";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import SigninPage from "./Pages/SigninPage/SinginPage";
import { isTokenValid } from "./redux/isTokenValid.js";
import AddPost from "./Pages/AppPosts/AddPost";
import SinglePost from "./Pages/PostList/SinglePost";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token || !isTokenValid(token)) return; // Stop execution if token is invalid

    // const fetchUser = async () => {
    //   try {
    //     const res = await fetch("http://localhost:5003/api/auth", {
    //       method: "GET",
    //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    //     });

    //     if (!res.ok) throw new Error("Failed to fetch user data");
    //     const data = await res.json();
    //     dispatch(signup(data));
    //   } catch (err) {
    //     console.error("Error fetching user:", err);
    //   }
    // };

    // fetchUser();
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="bg-[var(--bg-light)]">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutUs" element={<AboutPage />} />
          <Route path="/addpost" element={user ? <AddPost /> : <Navigate to="/login" />} />
          <Route path="/signin" element={user ? <Navigate to="/profile" /> : <SigninPage />} />
          <Route path="/login" element={user ? <Navigate to="/profile" /> : <LoginPage />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
