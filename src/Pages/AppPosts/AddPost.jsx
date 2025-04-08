import { useNavigate } from "react-router-dom";
import usePostForm from "./usePostForm";
import DOMPurify from 'dompurify';


import ImageUpload from "./ImageUpload";
import LinkManager from "./LinkManager";
import CategorySelector from "./CategorySelector";
import RichTextEditor from "./RichTextEditor";


const AddPost = () => {
  // Use the custom hook for form handling and submission
  const { post, setPost, errors, handleSubmit, loading } = usePostForm();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  // The handleSubmit function is now provided by the usePostForm hook
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


