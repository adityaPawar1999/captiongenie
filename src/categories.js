export const categories = [
  { name: "Technology", color: "bg-blue-500" },
  { name: "Lifestyle", color: "bg-pink-500" },
  { name: "Travel", color: "bg-green-500" },
  { name: "Food", color: "bg-yellow-500" },
  { name: "Health", color: "bg-purple-500" },
  { name: "Business", color: "bg-indigo-500" },
  { name: "Education", color: "bg-orange-500" },
  { name: "Entertainment", color: "bg-red-500" },
  { name: "Science", color: "bg-cyan-500" },
  { name: "Sports", color: "bg-teal-500" },
  { name: "Art", color: "bg-lime-500" },
  { name: "Finance", color: "bg-gray-500" },
  { name: "Uncategorized", color: "bg-gray-400" },
];

export const getCategoryColor = (category) => {
  if (!category) return "bg-gray-400 text-white px-2 py-1 rounded-full uppercase text-[10px] font-semibold";
  const found = categories.find(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  );
  const bgColor = found ? found.color : "bg-gray-400";
  return `${bgColor} text-white px-2 py-1 rounded-full uppercase text-[10px] font-semibold`;
};
