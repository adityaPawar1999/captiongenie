import React from "react";
import { Link } from "react-router-dom";

const RelatedPostsRight = ({ relatedPosts }) => {
  return (
    <div className="w-1/4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Featured Posts</h3>
      <ul className="space-y-4">
        {relatedPosts.map((post) => (
          <li key={post._id} className="border-b pb-4">
            {post.images?.length > 0 && (
              <img 
                src={`http://localhost:5003/images/${post.images[0].replace("uploads/", "")}`}
                alt={post.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            )}
            <Link 
              to={`/post/${post._id}`} 
              className="hover:text-blue-600 transition-colors block"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedPostsRight;