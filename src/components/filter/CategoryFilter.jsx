import PropTypes from "prop-types";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CategoryFilter = ({ categories, selectedCategories, onChange }) => {
  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onChange(updatedCategories);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Categories</h3>
      <div className="space-y-4">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center space-x-3 text-gray-700"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-lg">{capitalizeFirstLetter(category)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
