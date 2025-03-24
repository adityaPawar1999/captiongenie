import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../Redux/postSlice";

const BACKEND_URL = "http://localhost:5010";

const SinglePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

  const post = useSelector((state) => state.posts.post);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!post) return <p className="text-center">Post not found</p>;

  return (
    <div className="container mx-auto p-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {post.images?.map((image, index) => (
            <img
              key={index}
              src={`${BACKEND_URL}/images/${image.replace('uploads/', '')}`}
              alt={`${post.title} - Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        {/* Creator and Date */}
        <div className="mb-6 text-gray-600">
          <p className="font-medium">
            Posted by: {post.user?.name || post.user?.username || "Anonymous"}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Description */}
        <div className="prose max-w-none mb-6">
          <p>{post.description}</p>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <strong>Tags:</strong>{" "}
          {post.tags?.length > 0 ? (
            post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No tags</span>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <strong>Categories:</strong>{" "}
          {post.categories?.join(", ") || "None"}
        </div>

        {/* Links */}
        <div className="mb-6">
          <strong>Links:</strong>{" "}
          {post.links?.length > 0 ? (
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
    </div>
  );
};

export default SinglePost;