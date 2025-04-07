import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../Redux/postSlice";
import CategoriesNavbar from "../../Components/CategoriesNavbar/CategoriesNavbar";
import PostWithImage from "./PostWithImage";
import PostWithoutImage from "./PostWithoutImage";
import { getCategoryColor } from "./../../categories"; // ✅ Import utility

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, status, error, selectedCategory } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(selectedCategory));
  }, [dispatch, selectedCategory]);

  const [visiblePostsCount, setVisiblePostsCount] = useState(8);
  const postsWithImages = posts.filter((post) => post.images?.length > 0);
  const postsWithoutImages = posts.filter((post) => !post.images?.length);
  const visiblePosts = [...postsWithImages].reverse().slice(0, visiblePostsCount);

  if (status === "loading") return <p className="text-center">Loading...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <CategoriesNavbar />
      <h2 className="text-3xl font-bold text-center mb-6">
        {selectedCategory === "All" ? "All Posts" : `${selectedCategory} Posts`}
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Posts With Images (2 columns) */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-2">
            {visiblePosts.map((post) => (
              <PostWithImage key={post._id} post={post} getCategoryColor={getCategoryColor} />
            ))}
            {postsWithImages.length > visiblePostsCount && (
              <div className="col-span-full flex justify-center mt-4">
                <button 
                  onClick={() => setVisiblePostsCount(visiblePostsCount + 6)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  See More
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Posts Without Images (1 column) */}
          <div className="space-y-6">
          {[...postsWithoutImages].reverse().map((post) => (
              <PostWithoutImage key={post._id} post={post} getCategoryColor={getCategoryColor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
