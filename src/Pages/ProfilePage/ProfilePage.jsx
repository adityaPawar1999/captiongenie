import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPosts } from "../../Redux/postSlice";
import PostWithImage from "../PostList/PostWithImage";
import PostWithoutImage from "../PostList/PostWithoutImage";
import { API_CONFIG } from "../../config/api";
import { getCategoryColor } from "../../categories";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: paramUserId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { posts, status, error } = useSelector((state) => state.posts);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visiblePostsCount, setVisiblePostsCount] = useState(4);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (paramUserId) {
          const response = await fetch(`${API_CONFIG.BASE_URL}/api/users/${paramUserId}`);
          const userData = await response.json();
          if (userData) {
            setProfileUser(userData);
            dispatch(fetchPosts({ userId: paramUserId }));
          }
        } else {
          setProfileUser(user);
          dispatch(fetchPosts({ userId: user._id }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, paramUserId, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-light)] dark:bg-[var(--bg-dark)]">
        <p className="text-[var(--text-dark)] dark:text-[var(--text-light)]">Loading...</p>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-light)] dark:bg-[var(--bg-dark)]">
        <p className="text-[var(--text-dark)] dark:text-[var(--text-light)]">User not found</p>
      </div>
    );
  }

  const userPosts = Array.isArray(posts)
    ? posts.filter((post) => post.user?._id === (paramUserId || user?._id || user?.id))
    : [];

  const postsWithImages = userPosts.filter((post) => post.images?.length > 0);
  const postsWithoutImages = userPosts.filter((post) => !post.images?.length);
  const visiblePosts = [...postsWithImages].reverse().slice(0, visiblePostsCount);

  return (
    <div className="min-h-screen bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-dark)] dark:text-[var(--text-light)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Info */}
        <div className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="text-lg mb-2">Name: {profileUser?.name}</p>
          <p className="text-lg mb-2">ID: {profileUser?._id}</p>
          <p className="text-lg mb-4">Email: {profileUser?.email}</p>
          {!paramUserId && (
            <button
              onClick={handleLogout}
              className="bg-[var(--primary-color)] text-[var(--always-white)] px-4 py-2 rounded hover:bg-[var(--secondary-color)] transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* User Posts */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            {paramUserId ? "User's Posts" : "My Posts"}
          </h3>

          {status === "loading" && <p className="text-center">Loading posts...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {userPosts.length === 0 ? (
            <p className="text-center text-[var(--text-muted)] dark:text-[var(--text-muted-dark)]">
              {paramUserId ? "This user hasn't created any posts yet." : "You haven't created any posts yet."}
            </p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Posts with Images */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {visiblePosts.map((post) => (
                  <PostWithImage key={post._id} post={post} getCategoryColor={getCategoryColor} />
                ))}
                {postsWithImages.length > visiblePostsCount && (
                  <div className="col-span-full flex justify-center mt-4">
                    <button
                      onClick={() => setVisiblePostsCount(visiblePostsCount + 4)}
                      className="bg-[var(--primary-color)] text-[var(--always-white)] px-4 py-2 rounded hover:bg-[var(--secondary-color)]"
                    >
                      See More
                    </button>
                  </div>
                )}
              </div>

              {/* Posts Without Images */}
              <div className="space-y-6">
                {[...postsWithoutImages].reverse().map((post) => (
                  <PostWithoutImage key={post._id} post={post} getCategoryColor={getCategoryColor} />
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
