import React, { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import EditPostForm from "../../Components/EditPostForm/EditPostForm";
import LikesAndComments from "../../Components/LikesAndComments/LikesAndComments";
import { categories, getCategoryColor } from "../../categories";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MainPost = ({ post, isOwner, onDelete, onEditSubmit }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setShowEditForm(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(e);
  };

  return (
    <div className="bg-[var(--bg-light)] text-[var(--text-dark)]">
      {showEditForm && (
        <EditPostForm
          post={post}
          onClose={() => setShowEditForm(false)}
          onSubmit={onEditSubmit}
        />
      )}

      {post.images?.length > 0 && (
        <img
          src={`${BACKEND_URL}/images/${post.images[0].replace("uploads/", "")}`}
          alt={post.title}
          className="w-full h-72 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-4xl md:text-6xl font-bold mb-4">{post.title}</h2>

      {post.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {post.categories.map((cat, idx) => (
            <span key={idx} className={getCategoryColor(cat)}>
              {cat}
            </span>
          ))}
        </div>
      )}

      <p className="text-gray-500 text-sm">
        Posted by: <Link to={`/profile/${post.user?._id}`} className="hover:underline">{post.user?.name || post.user?.username || "Anonymous"}</Link> |{" "}
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <div
        className="mt-4 prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.description),
        }}
      />

      <div className="mt-4">
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

      {isOwner && (
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
      
      <LikesAndComments postId={post._id} post={post} />
    </div>
  );
};

export default MainPost;
