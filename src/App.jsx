import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import SigninPage from "./Pages/SigninPage/SinginPage";
import { isTokenValid } from "./Redux/isTokenValid.js";
import AddPost from "./Pages/AppPosts/AddPost";
import SinglePost from "./Pages/PostList/SinglePost";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token || !isTokenValid(token)) return;
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <div className="bg-[var(--bg-light)]">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <br/><br/><br/>
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
  );
};

export default App;
