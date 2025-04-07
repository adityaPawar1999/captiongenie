import React, { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getCategoryColor } from "../../categories"; // ✅ Import utility from categories.js

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LeftPost = ({ relatedPosts, username }) => {
  const [visiblePostsCount, setVisiblePostsCount] = useState(6);
  const filteredPosts = username
    ? relatedPosts.filter((post) => post.user?.name === username)
    : relatedPosts;
  const visiblePosts = filteredPosts.slice(0, visiblePostsCount);

  return (
    <div className=" ">
      <h3 className="text-xl font-bold mb-4">
        {username ? `${username}'s Posts` : "Your Posts"}
      </h3>

      {filteredPosts.length > 0 ? (
        <>
          {visiblePosts.map((post) => (
            <Link key={post._id} to={`/post/${post._id}`} className="block mb-4">
              <div className="bg-white shadow rounded overflow-hidden">
                {post.images?.length > 0 && (
                  <img
                    src={`${BACKEND_URL}/images/${post.images[0].replace("uploads/", "")}`}
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-3">
                  {/* Show category */}
                  {post.categories?.[0] && (
                    <span className={getCategoryColor(post.categories[0])}>
                      {post.categories[0]}
                    </span>
                  )}
                  <h4 className="font-semibold text-sm mt-1 line-clamp-2">{post.title}</h4>
                  <div
                    className="text-xs text-gray-600 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.description),
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
          {filteredPosts.length > visiblePostsCount && (
            <button 
              onClick={() => setVisiblePostsCount(visiblePostsCount + 4)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              See More
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-500">No posts found for {username || "this user"}.</p>
      )}
    </div>
  );
};

export default LeftPost;
