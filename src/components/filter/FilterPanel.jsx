import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const FilterPanel = ({
  categories,
  selectedCategories,
  onCategoryChange,
  sortValue,
  onSortChange,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(true);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(updatedCategories);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      <div className="space-y-5">
        {/* Categories Accordion */}
        <div>
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 hover:text-blue-500"
          >
            Categories
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isCategoryOpen && (
            <div className="mt-2 space-y-2 pl-2">
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
                  <span>{capitalizeFirstLetter(category)}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sorting Accordion */}
        <div>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 hover:text-blue-500"
          >
            Sort By
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isSortOpen && (
            <div className="mt-2 pl-2">
              <select
                value={sortValue}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default FilterPanel;
