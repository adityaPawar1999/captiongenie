
import { useState } from 'react';
import { getCategoryColor } from '../../categories';

const CategorySelector = ({ selectedCategories, setPost }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
    const categories = ["Technology", "Lifestyle", "Travel", "Food", "Health", "Business", "Education", "Entertainment", "Science", "Sports", "Art", "Finance"];
  
    const handleCategoryChange = (e) => {
      const selectedOptions = [...e.target.options]
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
  
      setPost((prev) => ({ ...prev, categories: selectedOptions }));
    };
  
    return (
      <div>
        <label>Categories</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full p-2 border rounded text-left flex justify-between items-center"
          >
            {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'Select categories'}
            <span>▼</span>
          </button>
          {showDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category}
                  className={`flex items-center p-2 ${getCategoryColor(category).hover}-200 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      const newSelection = e.target.checked
                        ? [...selectedCategories, category]
                        : selectedCategories.filter(c => c !== category);

                      if (newSelection.length > 3) {
                        setError('Maximum 3 categories allowed');
                        return;
                      }
                      setError('');
                      setPost(prev => ({ ...prev, categories: newSelection }));
                    }}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          )}
        </div>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    );
  };
  
  export default CategorySelector;