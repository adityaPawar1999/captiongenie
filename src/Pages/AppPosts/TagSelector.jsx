const existingTags = ["Tech", "Business", "Lifestyle", "Health"];

const TagSelector = ({ tags, setPost }) => {
  const handleTagSelection = (tag) => {
    setPost((prev) => {
      if (!prev.tags.includes(tag)) {
        return { ...prev, tags: [...prev.tags, tag] };
      }
      return prev;
    });
  };

  const addCustomTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setPost((prev) => ({ ...prev, tags: [...prev.tags, e.target.value.trim()] }));
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    setPost((prev) => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  return (
    <div>
      <label>Tags</label>
      <div className="flex gap-2">
        {existingTags.map((tag) => (
          <button key={tag} type="button" onClick={() => handleTagSelection(tag)} className="bg-gray-200 p-1 rounded">{tag}</button>
        ))}
      </div>
      <input type="text" placeholder="Add custom tag" onKeyDown={addCustomTag} className="w-full p-2 border rounded mt-2" />
      <div className="flex gap-2 mt-2">
        {tags.map((tag, index) => (
          <div key={index} className="bg-blue-200 p-1 rounded flex items-center">
            <span>{tag}</span>
            <button type="button" onClick={() => removeTag(index)} className="ml-2 text-red-500">X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
