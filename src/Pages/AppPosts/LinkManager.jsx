const LinkManager = ({ links, setPost }) => {
    const handleLinkChange = (index, key, value) => {
      setPost((prev) => {
        const newLinks = [...prev.links];
        newLinks[index][key] = value;
        return { ...prev, links: newLinks };
      });
    };
  
    const addNewLink = () => {
      setPost((prev) => ({ ...prev, links: [...prev.links, { type: "Website", url: "" }] }));
    };
  
    const removeLink = (index) => {
      setPost((prev) => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
    };
  
    return (
      <div>
        <label>Links</label>
        {links.map((link, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input type="text" value={link.url} onChange={(e) => handleLinkChange(index, "url", e.target.value)} className="flex-1 p-2 border rounded" />
            <button type="button" onClick={() => removeLink(index)} className="bg-red-500 text-white px-3 rounded">X</button>
          </div>
        ))}
        <button type="button" onClick={addNewLink} className="text-blue-600 underline">+ Add Link</button>
      </div>
    );
  };
  
  export default LinkManager;
  