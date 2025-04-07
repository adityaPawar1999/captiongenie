import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { deletePost, editPost } from "../../Redux/postSlice";
import EditPostForm from "../../Components/EditPostForm/EditPostForm";
import { getCategoryColor } from "../../categories";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const PostWithImage = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showEditForm, setShowEditForm] = useState(false);

  const isOwner = user && (user.id === post.user?._id || user._id === post.user?._id);

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
      <div className="bg-[var(--bg-primary)] 
                text-[var(--text-primary)] 
                border border-[var(--border-primary)]
                shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform 
                hover:-translate-y-1 hover:scale-[1.02] flex flex-col h-full w-full md:max-w-md mx-auto mb-1 
                rounded">
        {/* Image */}
        <img
          src={`${BACKEND_URL}/images/${post.images[0].replace("uploads/", "")}`}
          alt={post.title}
          className="w-full h-44 md:h-56 object-cover"
        />

        <div className="p-3 flex flex-col flex-grow">
          {/* Category Name */}
          <span className={`${getCategoryColor(post.categories?.[0] || "Uncategorized").text} font-bold`}>
            {post.categories?.[0] || "Uncategorized"}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{post.title}</h3>

          {/* Date & Post Owner */}
          <div className="text-[var(--text-secondary)] text-xs sm:text-sm mb-2 flex justify-between">
            <p>
              <span>{formatDate(post.createdAt)}</span> <span>|</span> <span>By: <Link to={`/profile/${post.user?._id}`} className="hover:underline">{post.user?.name || "Anonymous"}</Link></span>
            </p>
          </div>

          {/* Description (3 lines) */}
          <p
            className="text-[var(--text-primary)] text-xs sm:text-sm line-clamp-3 flex-grow"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.description?.slice(0, 120) + "..."),
            }}
          />
        </div>

      </div>
    </Link>
    </>
  );
};
export default PostWithImage;
