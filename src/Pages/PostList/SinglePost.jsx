import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../../Redux/postSlice"; 

const BACKEND_URL = "http://localhost:5010";

const SinglePost = () => {
  const { id } = useParams(); // Get the post ID from URL
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!post) return <p className="text-center">Post not found</p>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-4">{post.title}</h2>

      {/* Image */}
      {post.images?.length > 0 && (
        <img
          src={`${BACKEND_URL}/images/${post.images[0].replace("uploads/", "")}`}
          alt={post.title}
          className="w-full h-72 object-cover rounded-md mb-4"
        />
      )}

      {/* Creator & Date */}
      <p className="text-gray-500 text-sm">
        Posted by: {post.user?.name || "Anonymous"} | {new Date(post.createdAt).toLocaleString()}
      </p>

      {/* Description */}
      <p className="mt-4 text-lg">{post.description}</p>

      {/* Tags */}
      <div className="mt-4">
        <strong>Tags:</strong>{" "}
        {post.tags?.length > 0 ? (
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
        <strong>Categories:</strong> {post.categories?.join(", ") || "None"}
      </p>
    </div>
  );
};

export default SinglePost;
