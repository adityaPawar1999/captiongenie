import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { categories } from "../../categories"; // Import color mapping

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const getCategoryColor = (category) => {
  const foundCategory = categories.find((cat) => cat.name === category);
  return foundCategory ? foundCategory.color : "bg-gray-400"; // Default color
};

const PostWithoutImage = ({ post }) => {
  const category = post.categories?.[0] || "Uncategorized";

  return (
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
  );
};

export default PostWithoutImage;
