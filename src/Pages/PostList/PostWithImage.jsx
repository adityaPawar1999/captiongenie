import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { editPost } from "../../Redux/postSlice";
import EditPostForm from "../../Components/EditPostForm/EditPostForm";

const BACKEND_URL = "http://localhost:5003";

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
      <div className="bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border flex flex-col h-full w-full md:max-w-md mx-auto mb-1">
        {/* Image */}
        <img
          src={`${BACKEND_URL}/images/${post.images[0].replace("uploads/", "")}`}
          alt={post.title}
          className="w-full h-44 md:h-56 object-cover"
        />

        <div className="p-3 flex flex-col flex-grow">
          {/* Category Name */}
          <span className="text-red-600 text-xs font-semibold mb-1">{post.categories?.[0] || "Uncategorized"}</span>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-1">{post.title}</h3>

          {/* Date & Post Owner */}
          <div className="text-gray-600 text-xs sm:text-sm mb-2 flex justify-between">
            <p>
              <span>{formatDate(post.createdAt)}</span> <span>|</span> <span>By: {post.user?.name || "Anonymous"}</span>
            </p>
          </div>

          {/* Description (3 lines) */}
          <p
            className="text-gray-700 text-xs sm:text-sm line-clamp-3 flex-grow"
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
