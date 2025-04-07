import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitPostAsync } from "./../../Redux/postSlice";
import DOMPurify from 'dompurify';


import ImageUpload from "./ImageUpload";
import LinkManager from "./LinkManager";
import CategorySelector from "./CategorySelector";
import RichTextEditor from "./RichTextEditor";


const AddPost = () => {

  const categoryList = [
    "Technology", "Lifestyle", "Travel", "Food", "Health", 
    "Business", "Education", "Entertainment", "Science", "Sports"
  ];

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const [post, setPost] = useState({
    title: "",
    categories: [],
    description: "",
    images: [],
    links: [{ type: "Website", url: "" }],
    tags: [],
  });
  const [errors, setErrors] = useState({ title: '', description: '', categories: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

 //////////////////////////////////////
 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation checks
  const newErrors = {};
  
  if (!post.title.trim()) {
    newErrors.title = 'Title is required';
  }

  const sanitized = DOMPurify.sanitize(post.description);
  const textContent = new DOMParser().parseFromString(sanitized, 'text/html').body.textContent;
  const wordCount = textContent.trim().split(/\s+/).length;
  if (wordCount < 100) {
    newErrors.description = 'Description must be at least 100 words';
  }

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

  // Append actual image files, not the preview objects
  post.images.forEach((image) => {
    formData.append("images", image.file);
  });

  try {
    const result = await dispatch(submitPostAsync(formData)).unwrap();
    alert("Post submitted successfully!");
    // Reset form
    setPost({
      title: "",
      categories: [],
      description: "",
      images: [],
      links: [{ type: "Website", url: "" }],
      tags: [],
    });
  } catch (error) {
    console.error("Error submitting post:", error);
    alert(error.toString() || "Failed to submit post. Please try again later.");
  }
};
 ////////////////////////////////////
  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--bg-light)] p-5 dark:bg-[var(--bg-dark)]">
      <div className="bg-[var(--bg-light)] shadow-lg rounded-lg p-6 w-full max-w-2xl dark:bg-[var(--bg-dark)]">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label>Title</label>
            <input type="text" name="title" value={post.title} onChange={handleChange} className="w-full p-2 border rounded" required />
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
          </div>

          {/* Categories */}
         
          {/* Description */}
          <RichTextEditor description={post.description} setPost={setPost} className="min-h-[600px] max-h-[800px]"/>
          {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}

          {/* Categories */}
          <CategorySelector selectedCategories={post.categories} setPost={setPost} />
          {errors.categories && <div className="text-red-500 text-sm mt-1">{errors.categories}</div>}

          {/* Tags */}
          <div>
            <label>Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter tag and click add"
                className="flex-1 p-2 border rounded"
                value={post.newTag || ""}
                onChange={(e) => setPost(prev => ({...prev, newTag: e.target.value}))}
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (post.newTag && !post.tags.includes(post.newTag)) {
                    setPost(prev => ({
                      ...prev,
                      tags: [...prev.tags, post.newTag],
                      newTag: ""
                    }));
                  }
                }}
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <ImageUpload images={post.images} setPost={setPost} />

          {/* Links */}
          <LinkManager links={post.links} setPost={setPost} />

          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {loading ? 'Submitting...' : 'Submit Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;


