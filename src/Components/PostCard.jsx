import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaEdit, FaTrash, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const PostCard = ({ post, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const isAuthor = user && post.user && user._id === post.user._id;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      setIsLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/delete/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      if (!isSaved) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/posts/save/${post._id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(true);
      } else {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/posts/unsave/${post._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(false);
      }
    } catch (error) {
      console.error('Error saving/unsaving post:', error);
      alert(isSaved ? 'Failed to unsave post' : 'Failed to save post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.images && post.images.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${import.meta.env.VITE_API_URL}/${post.images[0]}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
            onClick={handleCardClick}
          >
            {post.title}
          </h3>
          <div className="flex space-x-2">
            {isAuthor && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                  }}
                  disabled={isLoading}
                  className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  disabled={isLoading}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  <FaTrash size={18} />
                </button>
              </>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={isLoading}
              className={`${isSaved ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-700 disabled:opacity-50`}
            >
              {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-2">{post.description}</p>
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;