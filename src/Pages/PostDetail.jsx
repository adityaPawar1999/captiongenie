import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaEdit, FaTrash, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchPost();
    if (user) {
      checkIfPostIsSaved();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
      setPost(response.data);
    } catch (err) {
      setError('Failed to fetch post details');
      console.error('Error fetching post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfPostIsSaved = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/saved/posts`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(response.data.some(savedPost => savedPost._id === id));
    } catch (err) {
      console.error('Error checking saved status:', err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (!isSaved) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/posts/save/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(true);
      } else {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/posts/unsave/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(false);
      }
    } catch (err) {
      console.error('Error saving/unsaving post:', err);
      alert(isSaved ? 'Failed to unsave post' : 'Failed to save post');
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  const isAuthor = user && post.user && user._id === post.user._id;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {post.images && post.images.length > 0 && (
          <div className="relative h-96">
            <img
              src={`${import.meta.env.VITE_API_URL}/${post.images[0]}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex space-x-3">
              {isAuthor && (
                <>
                  <button
                    onClick={handleEdit}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={24} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={24} />
                  </button>
                </>
              )}
              <button
                onClick={handleSave}
                className={`${isSaved ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-700`}
              >
                {isSaved ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
              </button>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-6">{post.description}</p>

          {post.categories && post.categories.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {post.links && post.links.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Links</h3>
              <div className="space-y-2">
                {post.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 block"
                  >
                    {link.type}: {link.url}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;