import { useState } from "react";

const AddPost = () => {
  const [post, setPost] = useState({
    title: "",
    category: "",
    paragraph: "",
    images: [],
    video: "",
    links: [{ type: "Website", url: "" }],
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPost({ ...post, images: [...post.images, ...files] });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, video: file });
  };

  const handleLinkChange = (index, key, value) => {
    const newLinks = [...post.links];
    newLinks[index][key] = value;
    setPost({ ...post, links: newLinks });
  };

  const addNewLink = () => {
    setPost({ ...post, links: [...post.links, { type: "Website", url: "" }] });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setPost({ ...post, tags: [...post.tags, e.target.value.trim()] });
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    setPost({ ...post, tags: post.tags.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post Data:", post);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white border-gray-300 p-5 text-[var(--text-color-1)]">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-[var(--text-color-3)] mb-4">Add New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Category in One Line */}
          <div className="flex gap-4 ">
            <div className="flex-1">
              <label className="block ">Title</label>
              <input type="text" name="title" value={post.title} onChange={handleChange}
                className="w-full p-2 border rounded" placeholder="Enter Title" required />
            </div>
            <div className="flex-1">
              <label className="block ">Category</label>
              <select name="category" value={post.category} onChange={handleChange}
                className="w-full p-2 border rounded">
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>

          {/* Paragraph with Formatting Options */}
          <div>
            <label className="block ">Paragraph</label>
            <div className="flex gap-2 mb-2 text-[var(--text-color-3)] ">
              <button type="button" className="px-3 py-1 bg-gray-200 rounded">B</button>
              <button type="button" className="px-3 py-1 bg-gray-200 rounded">• List</button>
              <button type="button" className="px-3 py-1 bg-gray-200 rounded">H1</button>
              <button type="button" className="px-3 py-1 bg-gray-200 rounded">H2</button>
            </div>
            <textarea name="paragraph " value={post.paragraph} onChange={handleChange}
              className="w-full p-2  rounded h-32 border " placeholder="Write something..." required></textarea>
          </div>

          {/* Media Selection (Images/Videos) */}
          <div>
            <label className="block ">Upload Media</label>
            <select className="w-full p-2 border rounded mb-2">
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input type="file" multiple onChange={handleImageUpload} accept="image/*"
              className="w-full p-2 border rounded mb-2" />
            <input type="file" onChange={handleVideoUpload} accept="video/*"
              className="w-full p-2 border rounded" />
          </div>

          {/* Links with Selection */}
          <div>
            <label className="block text-gray-700">Links</label>
            {post.links.map((link, index) => (
              <div key={index} className="flex gap-2 mt-1">
                <select value={link.type} onChange={(e) => handleLinkChange(index, "type", e.target.value)}
                  className="p-2 border rounded">
                  <option value="Website">Website</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Article">Article</option>
                </select>
                <input type="text" value={link.url} onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                  className="flex-1 p-2 border rounded" placeholder="Enter Link" />
              </div>
            ))}
            <button type="button" onClick={addNewLink}
              className="mt-2 text-blue-600 underline">+ Add Another Link</button>
          </div>

          {/* Tags Section */}
          <div>
            <label className="block text-gray-700">Tags</label>
            <input type="text" onKeyDown={handleTagKeyDown} placeholder="Press Enter to add a tag"
              className="w-full p-2 border rounded" />
            <div className="flex flex-wrap mt-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-[var(--text-color-1)] text-white px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center">
                  {tag}
                  <button type="button" onClick={() => removeTag(index)} className="ml-2 text-white">×</button>
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-[var(--text-color-1)] text-white p-2 rounded hover:opacity-90 transition">
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
