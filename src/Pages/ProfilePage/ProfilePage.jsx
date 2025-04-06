import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPosts } from "../../Redux/postSlice";
import PostWithImage from "../PostList/PostWithImage";
import PostWithoutImage from "../PostList/PostWithoutImage";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId: paramUserId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { posts, status, error } = useSelector((state) => state.posts);

  const [userData, setUserData] = useState(user || JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (paramUserId) {
      // If viewing another user's profile
      setUserData({ _id: paramUserId });
    } else if (userData?._id) {
      // Current user's profile
      dispatch(fetchPosts());
    }
  }, [dispatch, userData, paramUserId]);

  useEffect(() => {
    console.log("User Data is bro:", userData);
    if (posts.length > 0) {
      console.log("All posts:", posts);
    }
  }, [posts, userData]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Filter posts based on user ID
  const userId = paramUserId || userData?.id || userData?._id;
  console.log("User ID:", userId);
  const userPosts = posts.filter((post) => post.user?._id === userId);

  const postsWithImages = userPosts.filter((post) => post.images?.length > 0);
  const postsWithoutImages = userPosts.filter((post) => !post.images?.length);

  return (
    <div className="min-h-screen bg-white text-[var(--text-color-1)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="text-lg mb-2">Name: {userData?.name}</p>
          <p className="text-lg mb-2">ID: {userData?.id}</p>
          <p className="text-lg mb-4">Email: {userData?.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
          {/* Optional: Show full user data for debugging */}
          
        </div>

        {/* User's Posts Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-6">{paramUserId ? "User's Posts" : "My Posts"}</h3>

          {status === "loading" && <p className="text-center">Loading posts...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {userPosts.length === 0 ? (
            <p className="text-center text-gray-500">You haven't created any posts yet.</p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Posts with Images (2 columns) */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {postsWithImages.map((post) => (
                  <PostWithImage key={post._id} post={post} />
                ))}
              </div>

              {/* Posts Without Images (1 column) */}
              <div className="space-y-6">
                {postsWithoutImages.map((post) => (
                  <PostWithoutImage key={post._id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
