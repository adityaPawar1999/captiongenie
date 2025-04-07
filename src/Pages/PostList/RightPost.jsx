import React, { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getCategoryColor } from "../../categories"; // Adjust path if needed

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const RightPost = ({ relatedPosts }) => {
  const [visiblePostsCount, setVisiblePostsCount] = useState(4);
  const visiblePosts = relatedPosts.slice(0, visiblePostsCount);

  return (
    <div className="">
      {relatedPosts.length > 0 ? (
        <>
          {visiblePosts.map((post) => (
            <Link key={post._id} to={`/post/${post._id}`} className="block mb-4">
              
              <div className="bg-[var(--bg-light)] text-[var(--text-dark)] shadow rounded overflow-hidden">
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
                    className="text-xs line-clamp-2 text-[var(--text-dark)] pt-2"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
                  />
                </div>
              </div>
            </Link>
          ))}
          {relatedPosts.length > visiblePostsCount && (
            <button 
              onClick={() => setVisiblePostsCount(visiblePostsCount + 4)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              See More
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-500">No related posts found</p>
      )}
    </div>
  );
};

export default RightPost;
