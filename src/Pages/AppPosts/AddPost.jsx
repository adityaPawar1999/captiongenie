import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitPostAsync } from "./../../Redux/postSlice";
import RichTextEditor from "./RichTextEditor";


import ImageUpload from "./ImageUpload";
import LinkManager from "./LinkManager";
import TagSelector from "./TagSelector";
import CategorySelector from "./CategorySelector";

import { uploadFiles } from "../../services/fileService";

const AddPost = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

 //////////////////////////////////////
 const handleSubmit = async (e) => {
  e.preventDefault();

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
    <div className="flex justify-center items-center min-h-screen bg-white p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label>Title</label>
            <input type="text" name="title" value={post.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>

          {/* Categories */}
          <CategorySelector selectedCategories={post.categories} setPost={setPost} />

          {/* Description */}
          <RichTextEditor content={post.description} setPost={setPost} />

          {/* Image Upload */}
          <ImageUpload images={post.images} setPost={setPost} />

          {/* Links */}
          <LinkManager links={post.links} setPost={setPost} />

          {/* Tags */}
          <TagSelector tags={post.tags} setPost={setPost} />

          {/* Submit */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {loading ? "Submitting..." : "Submit Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;


