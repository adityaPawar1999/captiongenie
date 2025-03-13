import { useState } from "react";

const AddPost = () => {
  const [post, setPost] = useState({
    id: "",
    title: "",
    category: "",
    paragraph: "",
    images: [],
    video: "",
    links: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPost({ ...post, images: [...post.images, ...files] });
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...post.links];
    newLinks[index] = value;
    setPost({ ...post, links: newLinks });
  };

  const addNewLinkField = () => {
    setPost({ ...post, links: [...post.links, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post Data:", post);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Add New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Post ID</label>
            <input type="text" name="id" value={post.id} onChange={handleChange}
              className="w-full p-2 border rounded" placeholder="Enter ID" required />
          </div>

          <div>
            <label className="block text-gray-700">Title</label>
            <input type="text" name="title" value={post.title} onChange={handleChange}
              className="w-full p-2 border rounded" placeholder="Enter Title" required />
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <select name="category" value={post.category} onChange={handleChange}
              className="w-full p-2 border rounded">
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Paragraph</label>
            <textarea name="paragraph" value={post.paragraph} onChange={handleChange}
              className="w-full p-2 border rounded" placeholder="Write something..." required></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Upload Images (Multiple)</label>
            <input type="file" multiple onChange={handleImageUpload} accept="image/*"
              className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-gray-700">Video URL</label>
            <input type="text" name="video" value={post.video} onChange={handleChange}
              className="w-full p-2 border rounded" placeholder="Enter Video URL" />
          </div>

          <div>
            <label className="block text-gray-700">Links</label>
            {post.links.map((link, index) => (
              <input key={index} type="text" value={link} onChange={(e) => handleLinkChange(index, e.target.value)}
                className="w-full p-2 border rounded mt-1" placeholder="Enter Link" />
            ))}
            <button type="button" onClick={addNewLinkField}
              className="mt-2 text-blue-600 underline">+ Add Another Link</button>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
