import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../Redux/postSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-6">All Posts</h2>

      {posts.length === 0 ? (
        <p className="text-center">No posts available</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
              {/* Image Section */}
              {post.images.length > 0 && (
                <img
                  src={`http://localhost:5010/${post.images[0]}`} // ✅ Ensure correct image path
                  alt="Post"
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}

              {/* Post Title */}
              <h3 className="text-xl font-bold">{post.title}</h3>

              {/* Description */}
              <p className="text-gray-600 mt-2">{post.description.slice(0, 100)}...</p>

              {/* Tags */}
              <div className="mt-3">
                <strong>Tags:</strong>{" "}
                {post.tags.length > 0 ? (
                  post.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2">
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No tags</span>
                )}
              </div>

              {/* Categories */}
              <p className="mt-3 text-sm text-gray-500">
                <strong>Categories:</strong> {post.categories.join(", ") || "None"}
              </p>

              {/* Links */}
              <div className="mt-3">
                <strong>Links:</strong>{" "}
                {post.links.length > 0 ? (
                  post.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mr-2"
                    >
                      {link.type}
                    </a>
                  ))
                ) : (
                  <span className="text-gray-500">No links</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
