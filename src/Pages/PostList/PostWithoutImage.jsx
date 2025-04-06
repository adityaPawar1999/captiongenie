import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { categories } from "../../categories"; // Import color mapping
import { deletePost, editPost } from "../../Redux/postSlice";
import EditPostForm from "../../Components/EditPostForm/EditPostForm";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const getCategoryColor = (category) => {
  const foundCategory = categories.find((cat) => cat.name === category);
  return foundCategory ? foundCategory.color : "bg-gray-400"; // Default color
};

const PostWithoutImage = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showEditForm, setShowEditForm] = useState(false);
  const category = post.categories?.[0] || "Uncategorized";

  const isOwner = user && (user.id === post.user?._id || user._id === post.user?._id);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      const result = await dispatch(deletePost(post._id)).unwrap();
      // Optional: Show success message
    } catch (error) {
      console.error('Delete post failed:', error);
      // Optional: Show error message to user
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setShowEditForm(true);
  };

  const handleEditSubmit = async (formData) => {
    await dispatch(editPost({ postId: post._id, postData: formData }));
    setShowEditForm(false);
  };

  return (
    <>
      {showEditForm && (
        <EditPostForm
          post={post}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleEditSubmit}
        />
      )}
      <Link to={`/post/${post._id}`}>
        <div className="bg-white overflow-hidden hover:shadow-lg transition border flex flex-col mb-2 md:max-w-md mx-auto p-4 relative">
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{post.title}</h3>

        {/* Description (2 lines) */}
        <p
          className="text-gray-700 text-xs sm:text-sm line-clamp-2 flex-grow mb-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description?.slice(0, 100) + "..."),
          }}
        />

        {/* Date & Post Owner */}
        <div className="text-gray-600 text-xs sm:text-sm mt-auto flex justify-between">
          <p>
            <span>{formatDate(post.createdAt)}</span>
            <span> | </span>
            <span>By: {post.user?.name || "Anonymous"}</span>
          </p>
        </div>

        {/* Category in Bottom Right Corner */}
        <span
          className={`absolute bottom-2 right-2 px-2 py-1 text-xs text-white font-semibold rounded-sm ${getCategoryColor(category)}`}
        >
          {category}
        </span>
      </div>
    </Link>
    </>
  );
};

export default PostWithoutImage;
