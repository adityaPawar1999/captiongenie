import React, { useState, useEffect } from "react";
import { Favorite, FavoriteBorder, ChatBubbleOutline } from "@mui/icons-material";
import axios from "axios";
import { getAuthToken } from "../../Redux/authService";
import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config/api";

const LikesAndComments = ({ postId, post }) => {
  const { user } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_CONFIG.POSTS_URL}/comments/${postId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const hasLiked = post?.likes?.includes(user?._id || user?.id);

  const handleLike = async () => {
    console.log('Like button clicked');
    if (!user) return;
    try {
      const token = getAuthToken();
      if (!token) return;
      
      const response = await axios.post(`${API_CONFIG.POSTS_URL}/like/${postId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      // Update UI based on server response
      if (response.data && response.data.likes) {
        // Create a new post object with updated likes
        const updatedPost = {
          ...post,
          likes: response.data.likes
        };
        // Trigger a re-render by fetching comments
        fetchComments();
      }
    } catch (error) {
      console.error('Error updating like:', error.response?.data || error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await axios.post(`${API_CONFIG.POSTS_URL}/comment/${postId}`, {
        text: commentText
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      // Fetch updated comments from server
      await fetchComments();
      setCommentText("");
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="mt-6">
      <hr/><br/>
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={handleLike}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 rounded-full p-2 hover:bg-red-50"
          disabled={!user}
        >
          {hasLiked ? 
            <Favorite className="text-red-500 transform transition-transform duration-300" /> : 
            <FavoriteBorder className="transform transition-transform duration-300" />}
          <span className="font-medium">{post?.likes?.length || 0}</span>
        </button>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <ChatBubbleOutline className="transform transition-transform duration-300" />
          <span className="font-medium">{comments.length || 0}</span>
        </div>
      </div>

      <div className="mt-6">
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <div className="relative group">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder=""
              className="w-full p-4 border-2 rounded-lg bg-white transition-all duration-300
              border-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500
              placeholder-transparent peer"
              disabled={!user}
            />
            <label className="absolute left-4 -top-3 bg-white px-2 text-sm text-gray-600
              transition-all duration-300 transform pointer-events-none
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
              peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500">
              Write a comment...
            </label>
            <button 
              type="submit" 
              className="absolute right-2 top-2 px-6 py-2 bg-gray-700
              text-white rounded-lg hover:from-blue-600 hover:to-blue-700
              transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md"
              disabled={!user || !commentText.trim()}
            >
              Post
            </button>
          </div>
        </form>
        
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-6 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              Loading comments...
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{comment.user.name}</p>
                    <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-gray-700 ml-11">{comment.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <ChatBubbleOutline className="mx-auto mb-2 text-gray-400" />
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikesAndComments;