import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react"; // Importing the ChevronDown icon

const SortingFilter = ({ value, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sort By</h3>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 appearance-none"
        >
          <option value="default" className="text-gray-600">
            Default
          </option>
          <option value="price-asc" className="text-gray-600">
            Price: Low to High
          </option>
          <option value="price-desc" className="text-gray-600">
            Price: High to Low
          </option>
        </select>
        {/* Lucide custom arrow */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

SortingFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SortingFilter;
