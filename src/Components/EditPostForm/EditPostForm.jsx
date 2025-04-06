import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DOMPurify from 'dompurify';

const EditPostForm = ({ post, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
    categories: post.categories || [],
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    
    const sanitized = DOMPurify.sanitize(formData.description);
    const textContent = new DOMParser().parseFromString(sanitized, 'text/html').body.textContent;
    const wordCount = textContent.trim().split(/\s+/).length;
    if (wordCount < 100) newErrors.description = 'Description must be at least 100 words';

    if (formData.categories.length < 1) {
      newErrors.categories = 'At least 1 category required';
    } else if (formData.categories.length > 3) {
      newErrors.categories = 'Maximum 3 categories allowed';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;