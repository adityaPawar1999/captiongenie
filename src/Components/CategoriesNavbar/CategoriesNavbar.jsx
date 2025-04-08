import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories, getCategoryColor } from "../../categories";
import { fetchPosts, setSelectedCategory } from "../../Redux/postSlice";

const CategoriesNavbar = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.posts.selectedCategory) || "All";

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(fetchPosts({ category: category === "All" ? "" : category }));
  };

  return (
    <nav className="flex space-x-2 p-4 overflow-x-auto scrollbar-hide">
      {["All", ...categories.map((cat) => cat.name)].map((category) => {
        const isSelected = selectedCategory === category;
        const { base, hover } = getCategoryColor(category);

        return (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 
              ${isSelected ? `${base} text-white` : `bg-gray-200 text-gray-700 ${hover} hover:text-white`}`}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
};

export default CategoriesNavbar;
