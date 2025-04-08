import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import { submitPostAsync } from './../../Redux/postSlice';
import { useNavigate } from 'react-router-dom';


const usePostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.posts);

  const [post, setPost] = useState({
    title: "",
    categories: [],
    description: "",
    images: [],
    imageUrls: [""],
    links: [{ type: "Website", url: "" }],
    tags: [],
  });

  const [errors, setErrors] = useState({ 
    title: '', 
    description: '', 
    categories: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!post.title.trim()) newErrors.title = 'Title is required';
    
    const sanitized = DOMPurify.sanitize(post.description);
    const textContent = new DOMParser().parseFromString(sanitized, 'text/html').body.textContent;
    const wordCount = textContent.trim().split(/\s+/).length;
    if (wordCount < 100) newErrors.description = 'Description must be at least 100 words';

    if (post.categories.length < 1) {
      newErrors.categories = 'At least 1 category required';
    } else if (post.categories.length > 3) {
      newErrors.categories = 'Maximum 3 categories allowed';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("categories", JSON.stringify(post.categories));
    formData.append("links", JSON.stringify(post.links));
    formData.append("tags", JSON.stringify(post.tags));
    formData.append("imageUrls", JSON.stringify(post.imageUrls.filter(url => url.trim() !== "")));

    post.images.forEach((image) => {
      formData.append("images", image.file);
    });

    try {
      const result = await dispatch(submitPostAsync(formData)).unwrap();
      setPost({
        title: "",
        categories: [],
        description: "",
        images: [],
        links: [{ type: "Website", url: "" }],
        tags: [],
      });
      navigate('/');
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return { post, setPost, errors, handleSubmit, loading };
};

export default usePostForm;