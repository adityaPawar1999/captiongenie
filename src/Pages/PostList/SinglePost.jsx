import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePost, deletePost, editPost } from "../../Redux/postSlice"; 
import LeftPost from "./LeftPost";
import MainPost from "./MainPost";
import RightPost from "./RightPost";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const isOwner = user && (user.id === post?.user?._id || user._id === post?.user?._id);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post?.categories?.length) {
      const fetchRelatedPosts = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/posts/related`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categories: post.categories }),
          });
          const data = await response.json();
          setRelatedPosts(data.posts || []);
        } catch (err) {
          console.error("Error fetching related posts:", err);
        }
      };
      fetchRelatedPosts();
    }

    if (post?.user?._id) {
      const fetchUserPosts = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/posts?user=${post.user._id}&exclude=${post._id}`);
          const data = await response.json();
          setUserPosts(data || []);
        } catch (err) {
          console.error("Error fetching user posts:", err);
        }
      };
      fetchUserPosts();
    }
  }, [post?.categories, post?.user?._id, post?._id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost(post._id));
    }
  };

  const handleEditSubmit = async (formData) => {
    await dispatch(editPost({ postId: post._id, postData: formData }));
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!post) return <p className="text-center">Post not found</p>;

  return (
    <div className="container mx-auto p-5">
      {/* Unified Grid Layout for all devices */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Mobile: Stacked (full width) */}
        <div className="md:hidden space-y-6">
          <MainPost 
            post={post} 
            isOwner={isOwner} 
            onDelete={handleDelete}
            onEditSubmit={handleEditSubmit}
          />
          <RightPost relatedPosts={relatedPosts.filter(p => p.images?.length)} />
          <LeftPost relatedPosts={userPosts} username={post.user?.name || ""} />
        </div>

        {/* Tablet & Desktop: Grid Layout */}
        <div className="hidden md:col-span-3 md:block">
          <LeftPost relatedPosts={userPosts} username={post.user?.name || ""} />
        </div>

        <div className="hidden md:col-span-6 md:block">
          <MainPost 
            post={post} 
            isOwner={isOwner} 
            onDelete={handleDelete}
            onEditSubmit={handleEditSubmit}
          />
        </div>

        <div className="hidden md:col-span-3 md:block">
          <RightPost relatedPosts={relatedPosts.filter(p => p.images?.length)} />
        </div>
      </div>
    </div>

  );
};

export default SinglePost;
