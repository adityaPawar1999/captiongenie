import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { getCategoryColor } from "../../categories";
import { deletePost, editPost } from "../../Redux/postSlice";
import EditPostForm from "../../Components/EditPostForm/EditPostForm";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
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
      <div className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] 
                text-[var(--text-dark)] dark:text-[var(--text-light)] 
                border border-[var(--border-light)] dark:border-[var(--border-dark)]
                shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform 
                hover:-translate-y-1 hover:scale-[1.02] flex flex-col w-full md:max-w-md mx-auto mb-1 
                p-4 relative rounded">



    {/* Title */}
    <h3 className="text-lg font-bold mb-1 text-[var(--text-dark)] dark:text-[var(--text-light)]">{post.title}</h3>

    {/* Description */}
    <p
      className="text-xs sm:text-sm line-clamp-2 flex-grow mb-3 text-[var(--text-dark)] dark:text-[var(--text-light)]"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(post.description?.slice(0, 100) + "..."),
      }}
    />

    {/* Date & Author */}
    <div className="text-xs sm:text-sm mt-auto flex justify-between text-[var(--text-secondary)] dark:text-[var(--text-secondary-dark)]">
      <p>
        <span>{formatDate(post.createdAt)}</span>
        <span> | </span>
        <span>By: <Link to={`/profile/${post.user?._id}`} className="hover:underline">{post.user?.name || "Anonymous"}</Link></span>
      </p>
    </div>

    {/* Category Tag */}
    <span
      className={`absolute bottom-2 right-2 px-2 py-1 text-xs font-semibold rounded-sm ${getCategoryColor(category).full}`}
    >
      {category}
    </span>
  </div>
</Link>

    </>
  );
};

export default PostWithoutImage;
