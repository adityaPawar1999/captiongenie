import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getCategoryColor } from "../../categories"; // Adjust path if needed

const BACKEND_URL = "http://localhost:5003";

const RightPost = ({ relatedPosts }) => {
  return (
    <div className="w-1/4 pl-4">
      {relatedPosts.length > 0 ? (
        relatedPosts.map((post) => (
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
                {post.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-1">
                    {post.categories.map((cat, idx) => (
                      <span key={idx} className={getCategoryColor(cat)}>
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
                <h4 className="font-semibold text-sm mt-1">{post.title}</h4>
                <div
                  className="text-xs text-gray-600 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
                />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-500">No related posts found</p>
      )}
    </div>
  );
};

export default RightPost;
