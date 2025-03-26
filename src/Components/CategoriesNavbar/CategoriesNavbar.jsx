import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../categories";
import { fetchPosts, setSelectedCategory } from "../../Redux/postSlice";

const CategoriesNavbar = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.posts.selectedCategory) || "All";

  const getCategoryColor = (category) => {
    const foundCategory = categories.find((cat) => cat.name === category);
    return foundCategory ? foundCategory.color : "bg-gray-400"; // Default color
  };

  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category); // ✅ Debug log
    dispatch(setSelectedCategory(category));
    dispatch(fetchPosts(category === "All" ? "" : category)); // ✅ Ensure correct API call
  };

  return (
    <nav className="flex space-x-1 p-4  overflow-x-auto">
      {["All", ...categories.map((cat) => cat.name)].map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors 
            ${selectedCategory === category ? `${getCategoryColor(category)} text-white` : "bg-white text-gray-700 hover:bg-gray-200"}`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default CategoriesNavbar;
