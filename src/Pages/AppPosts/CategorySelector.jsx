
const CategorySelector = ({ selectedCategories, setPost }) => {
    const categories = ["Tech", "Business", "Lifestyle", "Health"];
  
    const handleCategoryChange = (e) => {
      const selectedOptions = [...e.target.options]
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
  
      setPost((prev) => ({ ...prev, categories: selectedOptions }));
    };
  
    return (
      <div>
        <label>Categories</label>
        <select multiple onChange={handleCategoryChange} className="w-full p-2 border rounded">
          {categories.map((category) => (
            <option key={category} value={category} selected={selectedCategories.includes(category)}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default CategorySelector;