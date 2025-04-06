import React, { useState } from "react";
import { Favorite, FavoriteBorder, ChatBubbleOutline } from "@mui/icons-material";
import axios from "axios";
import { getAuthToken } from "../../Redux/authService";
import { useSelector } from "react-redux";

const LikesAndComments = ({ postId, post }) => {
  const { user } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const hasLiked = post?.likes?.includes(user?._id || user?.id);

  const handleLike = async () => {
    console.log('Like button clicked');
    if (!user) return;
    try {
      const token = getAuthToken();
      if (!token) return;
      
      const response = await axios.post(`http://localhost:5003/api/posts/like/${postId}`, {}, {
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
        // Pass the updated post to parent component via callback
        // This assumes the parent component will handle the state update
        // For now, we'll force re-render
        setShowComments(prev => !prev);
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

      await axios.post(`http://localhost:5003/api/posts/comment/${postId}`, {
        text: commentText
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      // Update UI optimistically
      post.comments = [...(post.comments || []), {
        text: commentText,
        user: user._id || user.id,
        name: user.name
      }];
      
      setCommentText("");
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleLike}
          className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
          disabled={!user}
        >
          {hasLiked ? 
            <Favorite className="text-red-500" /> : 
            <FavoriteBorder />}
          <span>{post?.likes?.length || 0}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
        >
          <ChatBubbleOutline />
          <span>{post?.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded"
              disabled={!user}
            />
            <button 
              type="submit" 
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={!user}
            >
              Post
            </button>
          </form>
          
          <div className="space-y-2">
            {post?.comments?.map((comment, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                <p className="font-medium">{comment.name}</p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikesAndComments;