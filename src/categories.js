export const categories = [
  { name: "Technology", color: "bg-blue-500", hover: "hover:bg-blue-600", text: "text-blue-500" },
  { name: "Lifestyle", color: "bg-pink-500", hover: "hover:bg-pink-600", text: "text-pink-500" },
  { name: "Travel", color: "bg-green-500", hover: "hover:bg-green-600", text: "text-green-500" },
  { name: "Food", color: "bg-yellow-500", hover: "hover:bg-yellow-600", text: "text-yellow-500" },
  { name: "Health", color: "bg-purple-500", hover: "hover:bg-purple-600", text: "text-purple-500" },
  { name: "Business", color: "bg-indigo-500", hover: "hover:bg-indigo-600", text: "text-indigo-500" },
  { name: "Education", color: "bg-orange-500", hover: "hover:bg-orange-600", text: "text-orange-500" },
  { name: "Entertainment", color: "bg-red-500", hover: "hover:bg-red-600", text: "text-red-500" },
  { name: "Science", color: "bg-cyan-500", hover: "hover:bg-cyan-600", text: "text-cyan-500" },
  { name: "Sports", color: "bg-teal-500", hover: "hover:bg-teal-600", text: "text-teal-500" },
  { name: "Art", color: "bg-lime-500", hover: "hover:bg-lime-600", text: "text-lime-500" },
  { name: "Finance", color: "bg-gray-500", hover: "hover:bg-gray-600", text: "text-gray-500" },
  { name: "Uncategorized", color: "bg-gray-400", hover: "hover:bg-gray-500", text: "text-gray-400" },
];
export const getCategoryColor = (category) => {
  if (!category) {
    return {
      base: "bg-gray-400",
      hover: "hover:bg-gray-500",
      full: "bg-gray-400 text-white px-2 py-1 rounded-full uppercase text-[10px] font-semibold",
      text: "text-gray-400",
    };
  }

  const found = categories.find(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  );

  const baseColor = found?.color || "bg-gray-400";
  const hoverColor = found?.hover || "hover:bg-gray-500";
  const textColor = found?.text || "text-gray-400";

  return {
    base: baseColor,
    hover: hoverColor,
    full: `${baseColor} text-white px-2 py-1 rounded-full uppercase text-[10px] font-semibold`,
    text: textColor,
  };
};
